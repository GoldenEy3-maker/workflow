import { type Descendant } from "slate"
import { type CustomElement } from "~/components/Slate/types"

export default new (class ValidationSevice {
  validateEmail(value: string) {
    return new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "g").test(value)
  }

  validateTelPattern(value: string) {
    return new RegExp(/^\+7\s\([\d]{3}\)\s[\d]{3}-[\d]{2}-[\d]{2}$/, "g").test(
      value
    )
  }

  validateDatePattern(value: string) {
    return new RegExp(
      /^(0[1-9]|1\d|2\d|3[01]).(0[1-9]|1[0-2]).(19[3-9]\d|20\d{2})$/,
      "g"
    ).test(value)
  }

  validatePassword(value: string) {
    let isMinLength = false
    let isUpperCase = false

    if (value.length >= 6) isMinLength = true
    if (new RegExp(/[A-ZА-ЯЁ]/, "g").test(value)) isUpperCase = true

    return { isMinLength, isUpperCase }
  }

  validateOnlyCyrillic(value: string) {
    return new RegExp(/^[А-ЯЁа-яё\s]+$/, "g").test(value)
  }

  validateFullName(value: string) {
    return new RegExp(
      /(^[А-ЯЁа-яё]{2,16})\s([А-ЯЁа-яё]{2,16})?\s?([А-ЯЁа-яё]{2,16})/,
      "g"
    ).test(value)
  }

  validateEmptySlateEditor(descendants: Descendant[]): boolean {
    return descendants.every((elem) => {
      for (const [key, value] of Object.entries(elem)) {
        if (key === "text") return (value as string).length === 0
      }

      return this.validateEmptySlateEditor((elem as CustomElement).children)
    })
  }
})()
