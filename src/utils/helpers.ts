import type { Role } from "@prisma/client"

export const cls = (
  cls: (string | undefined)[],
  conditionCls?: Record<string, boolean>
) => {
  const cloneCls = cls.filter((c) => c !== undefined)

  if (conditionCls) {
    Object.keys(conditionCls).map((key) => {
      if (conditionCls[key]) {
        cloneCls.push(key)
      }
    })
  }

  return cloneCls.join(" ")
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const formatRole = (role: Role) => {
  switch (role) {
    case "ADMIN":
      return "Админ"
    case "EMPLOYER":
      return "Работодатель"
    case "PERFORMER":
      return "Исполнитель"
    case "MODER":
      return "Модератор"
  }
}

export const getProdUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
}

export const getDevUrl = () => {
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  return getProdUrl() ?? getDevUrl()
}

