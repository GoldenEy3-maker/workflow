import Link from "next/link"
import {
  MdFavoriteBorder,
  MdListAlt,
  MdOutlineHistory,
  MdOutlineHome,
  MdOutlineLogout,
  MdOutlineWorkOutline,
  MdPersonOutline,
} from "react-icons/md"
import Skeleton from "react-loading-skeleton"
import UserProfile from "~/components/UserProfile"
import { env } from "~/env.mjs"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import SignOutModal, { useSignOutModal } from "~/modals/SignOut"
import { useAuthStore } from "~/store/auth"
import { PagePaths } from "~/utils/enums"
import Button from "../Button"
import Logo from "../Logo"
import styles from "./styles.module.scss"

const Sidebar: React.FC = () => {
  const authStore = useAuthStore()
  const signOutModal = useSignOutModal()

  const rippleEffectEvent = useRippleEffect()

  return (
    <>
      <SignOutModal />
      <aside className={styles.sidebar}>
        {authStore.user ? (
          <>
            <Logo />
            <nav className={styles.nav}>
              <div className={styles.navItem}>
                <Link
                  href={PagePaths.Home}
                  title="Главная"
                  onPointerDown={rippleEffectEvent}
                >
                  <MdOutlineHome />
                  <span>Главная</span>
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link
                  href={PagePaths.Orders}
                  title="Заказы"
                  onPointerDown={rippleEffectEvent}
                >
                  <MdOutlineWorkOutline />
                  <span>Заказы</span>
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link href="#" title="Резюме" onPointerDown={rippleEffectEvent}>
                  <MdListAlt />
                  <span>Резюме</span>
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link
                  href={PagePaths.Favorites}
                  title="Избранное"
                  onPointerDown={rippleEffectEvent}
                >
                  <MdFavoriteBorder />
                  <span>Избранное</span>
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link
                  href="#"
                  title="История"
                  onPointerDown={rippleEffectEvent}
                >
                  <MdOutlineHistory />
                  <span>История</span>
                </Link>
              </div>
              <div className={styles.navItem}>
                <Link
                  href={PagePaths.Profile}
                  title="Профиль"
                  onPointerDown={rippleEffectEvent}
                >
                  <MdPersonOutline />
                  <span>Профиль</span>
                </Link>
              </div>
            </nav>
            <div className={styles.profile}>
              <div className={styles.profileWrapper}>
                <UserProfile
                  name={authStore.user.firstName}
                  image={
                    authStore.user.avatar
                      ? env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
                        authStore.user.avatar
                      : undefined
                  }
                  className={styles.userProfile}
                />
              </div>
              <Button isIcon onClick={signOutModal.open}>
                <MdOutlineLogout fontSize="1.5em" />
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
