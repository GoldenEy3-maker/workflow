import { useCallback, useState } from "react"
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai"
import { Editor, Element, Transforms, createEditor } from "slate"
import {
  Editable,
  Slate,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react"
import slateEditorService from "~/services/slateEditor.service"
import Button from "../Button"
import styles from "./styles.module.scss"

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      style={{
        fontWeight: props.text.bold ? "bold" : "normal",
        fontStyle: props.text.italic ? "italic" : "normal",
        textDecoration: props.text.underline ? "underline" : "none",
      }}
      {...props.attributes}
    >
      {props.children}
    </span>
  )
}

const SlateEditor: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])

  return (
    <div className={styles.slateEditor}>
      <Slate
        editor={editor}
        initialValue={[
          {
            children: [{ text: "" }],
            type: "paragraph",
          },
        ]}
      >
        <div className={styles.toolbar}>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() => slateEditorService.toggleBoldMark(editor)}
            >
              <AiOutlineBold />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() => slateEditorService.toggleItalicMark(editor)}
            >
              <AiOutlineItalic />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() => slateEditorService.toggleUnderlineMark(editor)}
            >
              <AiOutlineUnderline />
            </Button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <p className={styles.label}>Расскажите о себе</p>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className={styles.editable}
            onKeyDown={(event) => {
              if (!event.ctrlKey) return

              switch (event.code) {
                // case "`":
                //   event.preventDefault()

                //   const [match] = Editor.nodes(editor, {
                //     match: (n) => Element.isElement(n) && n.type === "code",
                //   })

                //   Transforms.setNodes(
                //     editor,
                //     { type: match ? "paragraph" : "code" },
                //     {
                //       match: (n) =>
                //         Element.isElement(n) && Editor.isBlock(editor, n),
                //     }
                //   )

                //   break

                case "KeyB":
                  event.preventDefault()
                  slateEditorService.toggleBoldMark(editor)
                  break
                case "KeyI":
                  event.preventDefault()
                  slateEditorService.toggleItalicMark(editor)
                  break
                case "KeyU":
                  event.preventDefault()
                  slateEditorService.toggleUnderlineMark(editor)
                  break
              }
            }}
          />
        </div>
      </Slate>
    </div>
  )
}

export default SlateEditor
