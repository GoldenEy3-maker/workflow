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
import { useModal } from "~/hooks/modal.hook"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import SignOutModal from "~/modals/SignOut"
import { useSignOutModalStore } from "~/store/#modals/signOut"
import { useAuthStore } from "~/store/auth"
import { PagePaths } from "~/utils/enums"
import Button from "../Button"
import Logo from "../Logo"

const Sidebar: React.FC = () => {
  const authStore = useAuthStore()
  const signOutModalStore = useSignOutModalStore()

  const rippleEffectEvent = useRippleEffect()
  const [openModal] = useModal()

  return (
    <>
      <SignOutModal />
      <aside className="sticky left-0 top-0 flex h-[100svh] flex-initial basis-[18rem] flex-col gap-safe-area overflow-y-auto overflow-x-hidden p-safe-area">
        {authStore.user ? (
          <>
            <Logo />
            <nav className="grid gap-1">
              <div>
                <Link
                  href={PagePaths.Home}
                  title="Главная"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdOutlineHome fontSize="1.75rem" />
                  <span>Главная</span>
                </Link>
              </div>
              <div>
                <Link
                  href={PagePaths.Orders}
                  title="Заказы"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdOutlineWorkOutline fontSize="1.75rem" />
                  <span>Заказы</span>
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  title="Резюме"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdListAlt fontSize="1.75rem" />
                  <span>Резюме</span>
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  title="Избранное"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdFavoriteBorder fontSize="1.7rem" />
                  <span>Избранное</span>
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  title="История"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdOutlineHistory fontSize="1.7rem" />
                  <span>История</span>
                </Link>
              </div>
              <div>
                <Link
                  href={PagePaths.Profile}
                  title="Профиль"
                  onPointerDown={rippleEffectEvent}
                  className="relative flex items-center gap-2 overflow-hidden rounded-medium-shape px-6 py-[0.7rem] text-body-extra text-on-surface outline-none duration-200 hover:bg-primary-container-high hover:text-primary focus:bg-primary-container focus:text-primary"
                >
                  <MdPersonOutline fontSize="1.7rem" />
                  <span>Профиль</span>
                </Link>
              </div>
            </nav>
            <div className="mt-auto flex items-center gap-4">
              <UserProfile
                name={authStore.user.firstName}
                image={
                  authStore.user.avatar
                    ? env.NEXT_PUBLIC_SUPABASE_STORAGE_AVATARS_URL +
                      authStore.user.avatar
                    : undefined
                }
                className="flex-1 text-body-extra"
              />
              <Button
                isIcon
                onClick={() => openModal(() => signOutModalStore.open())}
              >
                <MdOutlineLogout fontSize="1.5em" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <Skeleton width="15em" height="3em" />
            <Skeleton count={4} width="10em" height="1.5em" className="grid" />
          </>
        )}
      </aside>
    </>
  )
}

export default Sidebar
