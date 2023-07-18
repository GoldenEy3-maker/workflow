import type { CheckboxValue } from "./Checkbox"

export const changeFilterStateHandler = (state: {
  checked: boolean
  value: CheckboxValue
}) => {
  const newState = state

  if (state.value === undefined || state.value === "on") newState.checked = true

  if (state.value === "off") newState.checked = false

  switch (state.value) {
    case "off":
      newState.value = undefined
      break
    case "on":
      newState.value = "off"
      break
    default:
      newState.value = "on"
      break
  }

  return newState
}
