import { Editor } from "slate"
import { type CustomEditor } from "../components/Slate/types"

export default new (class SlateEditorService {
  isBoldMark(editor: CustomEditor) {
    const marks = Editor.marks(editor)
    return marks ? marks.bold === true : false
  }

  isItalicMark(editor: CustomEditor) {
    const marks = Editor.marks(editor)
    return marks ? marks.italic === true : false
  }

  isUnderlineMark(editor: CustomEditor) {
    const marks = Editor.marks(editor)
    return marks ? marks.underline === true : false
  }

  toggleBoldMark(editor: CustomEditor) {
    this.isBoldMark(editor)
      ? Editor.removeMark(editor, "bold")
      : Editor.addMark(editor, "bold", true)
  }

  toggleItalicMark(editor: CustomEditor) {
    this.isItalicMark(editor)
      ? Editor.removeMark(editor, "italic")
      : Editor.addMark(editor, "italic", true)
  }

  toggleUnderlineMark(editor: CustomEditor) {
    this.isUnderlineMark(editor)
      ? Editor.removeMark(editor, "underline")
      : Editor.addMark(editor, "underline", true)
  }
})()
