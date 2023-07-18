import type { FilePreviewState } from "~/hooks/fileReader.hook"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"

type ImageUploaderProps = {
  previews: FilePreviewState[] | undefined
  onSubmit: () => void
  reset: () => void
  currentImage?: string
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "onSubmit"
>

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
          <img
            src={
              previews
                ? previews[0]?.base64
                : currentImage ?? "/images/avatar-placeholder.png"
            }
            alt="Фото профиля"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 -960 960 960"
            width="1.5em"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 -960 960 960"
              width="1.5em"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 -960 960 960"
              width="1.5em"
            >
              <path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z" />
            </svg>
          )}
        </Button>
      </label>
    </div>
  )
}

export default ImageUploader
