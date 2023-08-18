import { MdClose } from "react-icons/md"
import Button from "../Button"

type CloseProps = {
  handler: () => void
} & React.HTMLAttributes<HTMLButtonElement>

export const Close: React.FC<CloseProps> = ({ handler, ...props }) => {
  return (
    <Button {...props} isIcon onClick={handler}>
      <MdClose fontSize="1.5em" />
    </Button>
  )
}
