import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiItalic,
  RiLink,
  RiLinkUnlink,
  RiListOrdered2,
  RiListUnordered,
  RiUnderline,
} from "react-icons/ri"
import { createEditor, type Descendant } from "slate"
import {
  Editable,
  Slate,
  withReact,
  type RenderElementProps,
  type RenderLeafProps,
} from "slate-react"
import slateEditorService from "~/services/slateEditor.service"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"
import { AlignValues, ElementTypes } from "./types"

const DefaultElement = (props: RenderElementProps) => {
  return (
    <p
      style={{
        textAlign: props.element.align ?? "left",
      }}
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
    <ol style={{ paddingLeft: "1.2em" }} {...props.attributes}>
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

const LinkElement = (props: RenderElementProps) => {
  return (
    <Link href={props.element.url ?? "#"} target="_blank" {...props.attributes}>
      {props.children}
    </Link>
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

type SlateEditorProps = {
  label?: string
  onChange?: (value: string) => void
  initialValue?: string | Descendant[]
  validError?: string
  value?: string
  name?: string
  onBlur?: React.FocusEventHandler
  readonly?: boolean
  reduced?: boolean
}

const SlateEditor: React.FC<SlateEditorProps> = (props) => {
  const editor = useMemo(
    () => slateEditorService.withInlines(withReact(createEditor())),
    []
  )

  const initialValue = useMemo<Descendant[]>(() => {
    if (props.initialValue)
      return typeof props.initialValue === "string"
        ? (JSON.parse(props.initialValue) as Descendant[])
        : props.initialValue

    return [{ type: "paragraph", children: [{ text: "" }] }]
  }, [props.initialValue])

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case ElementTypes.NumberedList:
        return <NumberedListElement {...props} />
      case ElementTypes.BulletedList:
        return <BulletedListElement {...props} />
      case ElementTypes.ListItem:
        return <ListItemElement {...props} />
      case ElementTypes.Link:
        return <LinkElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />
  }, [])

  return (
    <div
      className={cls([styles.slateEditor], {
        [styles._notValid ?? ""]: !!props.validError,
        [styles._readonly ?? ""]: !!props.readonly,
        [styles._reduced ?? ""]: !!props.reduced,
      })}
    >
      <Slate
        key={crypto.randomUUID()}
        editor={editor}
        onChange={(value) => {
          if (!props.onChange) return

          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          )

          if (isAstChange) props.onChange(JSON.stringify(value))
        }}
        initialValue={initialValue}
      >
        {!props.readonly ? (
          <div className={styles.toolbar}>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() => slateEditorService.toggleMark(editor, "bold")}
              >
                <RiBold />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() => slateEditorService.toggleMark(editor, "italic")}
              >
                <RiItalic />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() =>
                  slateEditorService.toggleMark(editor, "underline")
                }
              >
                <RiUnderline />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
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
                clrType={!!props.validError ? "danger" : undefined}
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
                clrType={!!props.validError ? "danger" : undefined}
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
                clrType={!!props.validError ? "danger" : undefined}
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
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() =>
                  // TODO: fix bug with untoggling list as fist element in editable area
                  slateEditorService.toggleBlock(
                    editor,
                    ElementTypes.NumberedList
                  )
                }
              >
                <RiListOrdered2 />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() =>
                  slateEditorService.toggleBlock(
                    editor,
                    ElementTypes.BulletedList
                  )
                }
              >
                <RiListUnordered />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() => {
                  const url = window.prompt("Paste URL here:")

                  if (!url) return

                  slateEditorService.insertLink(editor, url)
                }}
              >
                <RiLink />
              </Button>
            </div>
            <div className={styles.toolbarItem}>
              <Button
                type="button"
                isIcon
                clrType={!!props.validError ? "danger" : undefined}
                onClick={() => {
                  slateEditorService.unwrapLink(editor)
                }}
              >
                <RiLinkUnlink />
              </Button>
            </div>
          </div>
        ) : null}
        <div className={styles.wrapper}>
          <p className={styles.label}>{props.label}</p>
          <Editable
            value={props.value}
            name={props.name}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className={styles.editable}
            onBlur={props.onBlur}
            readOnly={props.readonly}
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
        {props.validError ? (
          <p className={styles.validError}>{props.validError}</p>
        ) : null}
      </Slate>
    </div>
  )
}

export default SlateEditor
