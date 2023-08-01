import { MdClose } from "react-icons/md"
import Button from "../Button"

type CloseProps = {
  handler: () => void
}

export const Close: React.FC<CloseProps> = (props) => {
  return (
    <Button isIcon onClick={props.handler}>
      <MdClose fontSize="1.5em" />
    </Button>
  )
}
