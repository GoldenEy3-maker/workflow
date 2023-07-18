import Button from "../Button"

type CloseProps = {
  handler: () => void
}

export const Close: React.FC<CloseProps> = (props) => {
  return (
    <Button isIcon onClick={props.handler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </Button>
  )
}
