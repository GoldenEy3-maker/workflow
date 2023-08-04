import dayjs from "dayjs"
import "dayjs/locale/ru"
import relativeTime from "dayjs/plugin/relativeTime"
import { type AppProps } from "next/app"
import { Inter } from "next/font/google"
import "react-loading-skeleton/dist/skeleton.css"
import { SkeletonThemeProvider } from "~/components/SkeletonTheme"
import ToastContainer from "~/components/ToastContainer"
import "~/styles/global.scss"
import { api } from "~/utils/api"
import { cls } from "~/utils/helpers"
import { type NextPageWithLayout } from "~/utils/types"

dayjs.locale("ru")
dayjs.extend(relativeTime)

const inter = Inter({ subsets: ["cyrillic", "latin"] })

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SkeletonThemeProvider>
      <div className={cls([inter.className, "flex"])}>
        {getLayout(<Component {...pageProps} />)}
      </div>
      <ToastContainer />
    </SkeletonThemeProvider>
  )
}

export default api.withTRPC(MyApp)
