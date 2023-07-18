import Link from "next/link"
import Skeleton from "react-loading-skeleton"
import UserProfile from "~/components/UserProfile"
import { env } from "~/env.mjs"
import { useModal } from "~/hooks/modal.hook"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import SignOutModal from "~/modals/SignOut"
import { useSignOutModalStore } from "~/modals/SignOut/store"
import { useAuthStore } from "~/store/auth"
import { PagePaths } from "~/utils/enums"
import Button from "../Button"
import Logo from "../Logo"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const user = useAuthStore((state) => state.user)

  const rippleEffectEvent = useRippleEffect()
  const [openModal] = useModal()

  return (
    <>
      <SignOutModal />
      <aside className={styles.sidebar}>
        {user ? (
          <>
            <Logo />
            <nav className={styles.nav}>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <Link
                    href={PagePaths.Home}
                    title="Главная"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                      </svg>
                    </span>
                    <span>Главная</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href={PagePaths.Orders}
                    title="Заказы"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
                      </svg>
                    </span>
                    <span>Заказы</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="#"
                    title="Резюме"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="M320-280q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 320h240v-80H440v80Zm0-160h240v-80H440v80Zm0-160h240v-80H440v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                      </svg>
                    </span>
                    <span>Резюме</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="#"
                    title="Избранное"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                      </svg>
                    </span>
                    <span>Избранное</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="#"
                    title="История"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z" />
                      </svg>
                    </span>
                    <span>История</span>
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href={PagePaths.Profile}
                    title="Профиль"
                    onPointerDown={rippleEffectEvent}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 -960 960 960"
                        width="1em"
                      >
                        <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.921 44.694q31.301 14.126 50.19 40.966Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                      </svg>
                    </span>
                    <span>Профиль</span>
                  </Link>
                </li>
                {/* <hr /> */}
              </ul>
            </nav>
            <div className={styles.profile}>
              <div className={styles.profileWrapper}>
                <UserProfile
                  name={user.firstName}
                  image={
                    user.avatar
                      ? env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
                        user.avatar
                      : undefined
                  }
                  className={styles.userProfile}
                />
              </div>
              <Button
                isIcon
                onClick={() =>
                  openModal(() =>
                    useSignOutModalStore.setState({ state: true })
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.75em"
                  viewBox="0 -960 960 960"
                  width="1.75em"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </Button>
            </div>
          </>
        ) : (
          <>
            <Skeleton width="15em" height="3em" />
            <Skeleton
              count={4}
              width="10em"
              height="1.5em"
              style={{ display: "grid" }}
            />
          </>
        )}
      </aside>
    </>
  )
}

export default Sidebar
