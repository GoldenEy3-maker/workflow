import Image from "next/image"
import { MdCheck, MdClose, MdOutlineEdit } from "react-icons/md"
import type { FilePreviewState } from "~/hooks/fileReader.hook"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"

type ImageUploaderProps = {
  previews: FilePreviewState[] | undefined
  onSubmit: () => void
  reset: () => void
  currentImage?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onSubmit">

const ImageUploader: React.FC<ImageUploaderProps> = ({
  className,
  previews,
  onSubmit,
  reset,
  currentImage,
  ...props
}) => {
  return (
    <div className={cls([className, styles.uploader])}>
      <input type="file" {...props} />
      <label htmlFor={props.id}>
        <div className={styles.preview}>
          <Image
            src={
              previews
                ? previews[0]?.base64
                : currentImage ?? "/images/avatar-placeholder.png"
            }
            alt="Фото профиля"
            fill
            sizes="100vw"
          />
        </div>
        <Button
          variant="filled"
          clrType="danger"
          isIcon
          className={styles.cancel}
          onClick={reset}
          disabled={props.disabled}
          aria-hidden={!previews}
        >
          <MdClose fontSize="1.5em" />
        </Button>
        <Button
          className={styles.submit}
          type="submit"
          variant="filled"
          isIcon
          disabled={props.disabled}
          aria-readonly={!previews}
          onClick={onSubmit}
        >
          {previews ? (
            <MdCheck fontSize="1.5em" />
          ) : (
            <MdOutlineEdit fontSize="1.5em" />
          )}
        </Button>
      </label>
    </div>
  )
}

export default ImageUploader
