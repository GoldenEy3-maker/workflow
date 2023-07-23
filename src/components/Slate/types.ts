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
  BulletedList: "bulleted-list"
} as const

export type ListTypes = ValueOf<typeof ListTypes>

export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: "paragraph"
  align?: AlignValues
  children: Descendant[]
}

export type NumberedListElement = {
  type: "numbered-list"
  align?: AlignValues
  children: Descendant[]
}

export type BulletedListElemenet = {
  type: "bulleted-list"
  align?: AlignValues
  children: Descendant[]
}

export type ListItemElement = {
  type: "list-item"
  align?: AlignValues
  children: Descendant[]
}

export type CustomElement = ParagraphElement | NumberedListElement | ListItemElement | BulletedListElemenet

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
