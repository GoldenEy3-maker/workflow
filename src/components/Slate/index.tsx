import { useCallback, useState } from "react"
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from "react-icons/ai"
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
} from "react-icons/ri"
import { createEditor } from "slate"
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
import { AlignValues } from "./types"

const DefaultElement = (props: RenderElementProps) => {
  return (
    <p
      style={{ textAlign: props.element.align ?? "left" }}
      {...props.attributes}
    >
      {props.children}
    </p>
  )
}

const ListItemElement = (props: RenderElementProps) => {
  return (
    <li
      style={{
        textAlign: props.element.align ?? "left",
      }}
      {...props.attributes}
    >
      {props.children}
    </li>
  )
}

const NumberedListElement = (props: RenderElementProps) => {
  return (
    <ol style={{paddingLeft: "1.2em"}} {...props.attributes}>
      {props.children}
    </ol>
  )
}

const BulletedListElement = (props: RenderElementProps) => {
  return (
    <ul style={{ paddingLeft: "1.2em" }} {...props.attributes}>
      {props.children}
    </ul>
  )
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
      case "numbered-list":
        return <NumberedListElement {...props} />
      case "bulleted-list":
        return <BulletedListElement {...props} />
      case "list-item":
        return <ListItemElement {...props} />
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
              onClick={() => slateEditorService.toggleMark(editor, "bold")}
            >
              <AiOutlineBold />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() => slateEditorService.toggleMark(editor, "italic")}
            >
              <AiOutlineItalic />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() => slateEditorService.toggleMark(editor, "underline")}
            >
              <AiOutlineUnderline />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                slateEditorService.changeAlign(editor, AlignValues.Left)
              }
            >
              <RiAlignLeft />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                slateEditorService.changeAlign(editor, AlignValues.Right)
              }
            >
              <RiAlignRight />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                slateEditorService.changeAlign(editor, AlignValues.Center)
              }
            >
              <RiAlignCenter />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                slateEditorService.changeAlign(editor, AlignValues.Justify)
              }
            >
              <RiAlignJustify />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                // TODO: fix bug with untoggling list as fist element in editable area
                slateEditorService.toggleBlock(editor, "numbered-list")
              }
            >
              <AiOutlineOrderedList />
            </Button>
          </div>
          <div className={styles.toolbarItem}>
            <Button
              type="button"
              isIcon
              onClick={() =>
                slateEditorService.toggleBlock(editor, "bulleted-list")
              }
            >
              <AiOutlineUnorderedList />
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
                  slateEditorService.toggleMark(editor, "bold")
                  break
                case "KeyI":
                  event.preventDefault()
                  slateEditorService.toggleMark(editor, "italic")
                  break
                case "KeyU":
                  event.preventDefault()
                  slateEditorService.toggleMark(editor, "underline")
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
