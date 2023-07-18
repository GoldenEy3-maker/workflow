import { type AppProps } from "next/app"
import "react-loading-skeleton/dist/skeleton.css"
import { SkeletonThemeProvider } from "~/components/SkeletonTheme"
import ToastContainer from "~/components/ToastContainer"
import "~/styles/global.scss"
import { api } from "~/utils/api"
import { type NextPageWithLayout } from "~/utils/types"

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SkeletonThemeProvider>
      <div className="wrapper">{getLayout(<Component {...pageProps} />)}</div>
      <ToastContainer />
    </SkeletonThemeProvider>
  )
}

export default api.withTRPC(MyApp)
