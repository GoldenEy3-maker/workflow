import { useRouter } from "next/router"
import { useEffect } from "react"
import Link from "~/components/Link"
import LoadingSpin from "~/components/Loading/Spin"
import AuthLayout from "~/layouts/Auth"
import { api } from "~/utils/api"
import { PagePaths, QueryKeys } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import { type NextPageWithLayout } from "~/utils/types"
import styles from "./styles.module.scss"

const useQueryToGetToken = (callback: (token: string | null) => void) => {
  const router = useRouter()

  useEffect(() => {
    let token: string | string[] | undefined | null =
      router.query[QueryKeys.ActivateUser.Token]

    if (!token || Array.isArray(token)) token = null

    callback(token)
  }, [router.query])
}

const ActivateUser: NextPageWithLayout = () => {
  const userActivateMut = api.user.activate.useMutation({
    onError(error) {
      console.log("🚀 ~ file: index.tsx:33 ~ onError ~ error:", error)
    },
  })

  useQueryToGetToken((token) => userActivateMut.mutate(token))

  return (
    <div className={styles.box}>
      {userActivateMut.isLoading ? (
        <LoadingSpin />
      ) : (
        <>
          <div
            className={cls([styles.icon], {
              [styles._danger]: userActivateMut.isError,
            })}
          >
            {userActivateMut.isError ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 -960 960 960"
                width="4em"
              >
                <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm30-193.333 120-120.001 120 120.001L646.667-360 526.666-480l120.001-120L600-646.667 480-526.666 360-646.667 313.333-600l120.001 120-120.001 120L360-313.333Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="4em"
                viewBox="0 -960 960 960"
                width="4em"
              >
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
              </svg>
            )}
          </div>
          <h1 className={styles.title}>Активация аккаунта</h1>
          <div className={styles.text}>
            <p>
              {userActivateMut.isError
                ? userActivateMut.error.message
                : "Ваш аккаунт успешно активирован!"}
            </p>
          </div>
          <div className={styles.actions}>
            {userActivateMut.isError ? (
              <Link href={PagePaths.SignUp} title="Зарегистрироваться">
                Зарегистрироваться
              </Link>
            ) : (
              <Link href={PagePaths.SignIn} title="Войти">
                Войти
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  )
}

ActivateUser.getLayout = (page) => {
  return <AuthLayout title="Активация аккаунта">{page}</AuthLayout>
}

export default ActivateUser
