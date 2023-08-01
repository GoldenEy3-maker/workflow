import isUrl from "is-url"
import { Editor, Element, Range, Transforms, type Descendant } from "slate"
import {
  AlignValues,
  ElementTypes,
  ListTypes,
  type CustomEditor,
  type CustomElement,
  type CustomText,
  type EditorFormatting,
} from "../components/Slate/types"

export default new (class SlateEditorService {
  isMarkActive(editor: CustomEditor, format: keyof Omit<CustomText, "text">) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  isBlockActive(
    editor: CustomEditor,
    format: EditorFormatting,
    blockType: keyof Omit<CustomElement, "children"> = "type"
  ) {
    if (!editor.selection) return false

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, editor.selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType] === format,
      })
    )

    return !!match
  }

  toggleBlock(editor: CustomEditor, format: EditorFormatting) {
    const isFormatAlignValues = Object.values(AlignValues).includes(
      format as AlignValues
    )

    const isActive = this.isBlockActive(
      editor,
      format,
      isFormatAlignValues ? "align" : "type"
    )

    const isList = Object.values(ListTypes).includes(format as ListTypes)

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        Object.values(ListTypes).includes(n.type) &&
        !isFormatAlignValues,
      split: true,
    })

    Transforms.setNodes(
      editor,
      isFormatAlignValues
        ? { align: isActive ? undefined : (format as AlignValues) }
        : {
            type: isActive
              ? ElementTypes.Paragraph
              : isList
              ? ElementTypes.ListItem
              : (format as ListTypes),
          }
    )

    if (!isActive && isList) {
      const block: CustomElement = { type: format as ListTypes, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }

  toggleMark(editor: CustomEditor, format: keyof Omit<CustomText, "text">) {
    this.isMarkActive(editor, format)
      ? Editor.removeMark(editor, format)
      : Editor.addMark(editor, format, true)
  }

  changeAlign(editor: CustomEditor, align: AlignValues) {
    Transforms.setNodes(
      editor,
      { align: align },
      { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
  }

  unwrapLink(editor: CustomEditor) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === ElementTypes.Link,
    })
  }

  isLinkActive(editor: CustomEditor) {
    const [link] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
    })

    return !!link
  }

  insertLink(editor: CustomEditor, url: string) {
    if (editor.selection) this.wrapLink(editor, url)
  }

  wrapLink(editor: CustomEditor, url: string) {
    if (this.isLinkActive(editor)) this.unwrapLink(editor)

    const { selection } = editor

    const isCollapsed = selection && Range.isCollapsed(selection)

    const link: CustomElement = {
      type: ElementTypes.Link,
      url,
      children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: "end" })
    }
  }

  withInlines(editor: CustomEditor) {
    const { isInline, insertText, insertData } = editor

    editor.isInline = (element) =>
      [ElementTypes.Link].includes(element.type) || isInline(element)

    editor.insertText = (text) => {
      if (text && isUrl(text)) {
        this.wrapLink(editor, text)
      } else {
        insertText(text)
      }
    }

    editor.insertData = (data) => {
      const text = data.getData("text/plain")

      if (text && isUrl(text)) {
        this.wrapLink(editor, text)
      } else {
        insertData(data)
      }
    }

    return editor
  }
})()
