import { MdKeyboardArrowDown, MdSort } from "react-icons/md"
import Button from "../Button"
import { useSortContext } from "./context"

export const Trigger: React.FC<React.PropsWithChildren> = (props) => {
  const ctx = useSortContext()

  return (
    <Button type="button" variant="elevated" onClick={ctx.toggle}>
      <MdSort fontSize="1.5rem" />
      {props.children}
      <MdKeyboardArrowDown fontSize="1.5em" />
    </Button>
  )
}
