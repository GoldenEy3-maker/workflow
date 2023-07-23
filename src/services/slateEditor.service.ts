import { Editor, Element, Transforms } from "slate"
import { type ValueOf } from "~/utils/types"
import {
  AlignValues,
  ListTypes,
  type CustomEditor,
  type CustomElement,
  type CustomText,
} from "../components/Slate/types"

export default new (class SlateEditorService {
  isMarkActive(editor: CustomEditor, format: keyof Omit<CustomText, "text">) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  }

  isBlockActive(
    editor: CustomEditor,
    format: ValueOf<CustomElement>,
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

  toggleBlock(editor: CustomEditor, format: ValueOf<CustomElement>) {
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
              ? "paragraph"
              : isList
              ? "list-item"
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
})()
