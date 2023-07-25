import { type BaseEditor, type Descendant } from "slate"
import { type ReactEditor } from "slate-react"
import { type ValueOf } from "~/utils/types"

export const AlignValues = {
  Center: "center",
  Left: "left",
  Right: "right",
  Justify: "justify",
} as const

export type AlignValues = ValueOf<typeof AlignValues>

export const ListTypes = {
  NumberedList: "numbered-list",
  BulletedList: "bulleted-list",
} as const

export type ListTypes = ValueOf<typeof ListTypes>

export const ElementTypes = {
  Paragraph: "paragraph",
  NumberedList: "numbered-list",
  BulletedList: "bulleted-list",
  ListItem: "list-item",
  Link: "link",
} as const

export type ElementTypes = ValueOf<typeof ElementTypes>

export type CustomEditor = BaseEditor & ReactEditor

export type CustomElement = {
  type: ElementTypes
  align?: AlignValues
  url?: string
  children: Descendant[]
}

export type EditorFormatting = ElementTypes | AlignValues

export type CustomText = {
  text: string
  bold?: true
  italic?: true
  underline?: true
}

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
