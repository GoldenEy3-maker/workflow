import { type ValueOf } from "./types"

export const PagePaths = {
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Profile: "/profile",
  CreateResume: "/profile/resume/create",
  EditResume: "/profile/resume/edit",
  Orders: "/orders",
  OrderCreate: "/profile/order/create",
  OrderEdit: "/profile/order/edit",
  Favorites: "/favorites",
  ActivateUser: "/activate",
} as const

export const InputMaskPatterns = {
  Tel: "+7 (999) 999-99-99",
  Date: "99.99.9999",
  Price: "99 999 ₽",
} as const

export const QueryKeys = {
  SignUp: {
    Tab: "tab",
  },
  ActivateUser: {
    Token: "token",
  },
} as const

export const CookieKeys = {
  RefreshToken: "jid",
} as const

export const ModalName = {
  ArchiveOrder: "archive-modal",
  SignOut: "sign-out",
  DeleteResume: "delete-resume",
  ConfirmSignUp: "confirm-sign-up",
} as const

export type PagePaths = ValueOf<typeof PagePaths>
export type InputMaskPatters = ValueOf<typeof InputMaskPatterns>
export type CookieKeys = ValueOf<typeof CookieKeys>
export type ModalName = ValueOf<typeof ModalName>
