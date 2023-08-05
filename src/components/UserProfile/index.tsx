import Image from "next/image"
import Link from "next/link"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type UserProfileProps = {
  image?: string
  name: string
  className?: string
}
const UserProfile: React.FC<UserProfileProps> = (props) => {
  return (
    <Link
      href={PagePaths.Profile}
      className={cls([props.className, styles.userProfile])}
    >
      <div className={styles.img}>
        <Image
          src={props.image ?? "/images/avatar-placeholder.png"}
          alt="Фото профиля"
          fill
          sizes="100vw"
        />
      </div>
      <span>{props.name}</span>
    </Link>
  )
}
export default UserProfile
