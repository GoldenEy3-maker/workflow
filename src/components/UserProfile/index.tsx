import Image from "next/image"
import { cls } from "~/utils/helpers"

type UserProfileProps = {
  image?: string
  name: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const UserProfile: React.FC<UserProfileProps> = ({
  image,
  name,
  className,
  ...props
}) => {
  return (
    <div
      className={cls([className, "flex items-center gap-4 overflow-hidden"])}
      {...props}
    >
      <div className="relative h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full bg-placeholder">
        <Image
          src={image ?? "/images/avatar-placeholder.png"}
          alt="Фото профиля"
          fill
          sizes="100vw"
          objectFit="cover"
        />
      </div>
      <span className="truncate">{name}</span>
    </div>
  )
}
export default UserProfile
