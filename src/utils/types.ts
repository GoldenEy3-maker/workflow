import { type NextPage } from "next"

export type ValueOf<T> = T[keyof T]

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
