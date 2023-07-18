import Image from "next/image"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type UserProfileProps = {
  image?: string
  name: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const UserProfile: React.FC<UserProfileProps> = ({
  image,
  name,
  className,
  ...props
}) => {
  return (
    <div className={cls([className, styles.userProfile])} {...props}>
      <div className={styles.img}>
        <Image
          src={image ?? "/images/avatar-placeholder.png"}
          alt="Фото профиля"
          fill
          sizes="50px"
        />
      </div>
      <span>{name}</span>
    </div>
  )
}
export default UserProfile
