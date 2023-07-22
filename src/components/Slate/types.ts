import { type BaseEditor } from "slate"
import { type ReactEditor } from "slate-react"

export type CustomEditor = BaseEditor & ReactEditor

export type ParagraphElement = {
  type: "paragraph"
  children: CustomText[]
}


export type CustomElement = ParagraphElement 

export type FormattedText = { text: string; bold?: true, italic?: true, underline?: true }

export type CustomText = FormattedText

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
