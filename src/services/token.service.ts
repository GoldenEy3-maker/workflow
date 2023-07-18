import { type Role } from "@prisma/client"
import { setCookie } from "cookies-next"
import jwt from "jsonwebtoken"
import { type NextApiRequest, type NextApiResponse } from "next"
import { env } from "~/env.mjs"
import { CookieKeys } from "~/utils/enums"

export type AccessTokenPayload = {
  email: string
}

export type RefreshTokenPayload = {
  id: string
  tokenVersion: number
}

export type ActivateTokenPayload = {
  email: string
  password: string
  birthDate: string
  role: Role
  lastName: string
  firstName: string
  middleName?: string
}

export default new (class TokenService {
  generateTokens(payload: AccessTokenPayload & RefreshTokenPayload) {
    const accessToken = jwt.sign(
      { email: payload.email },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    )
    const refreshToken = jwt.sign(
      { id: payload.id, tokenVersion: payload.tokenVersion },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    )

    return { accessToken, refreshToken }
  }

  generateActivateToken(payload: ActivateTokenPayload) {
    const activateToken = jwt.sign(payload, env.ACTIVATE_TOKEN_SECRET, {
      expiresIn: "24h",
    })

    return activateToken
  }

  verifyAccessToken(token: string): AccessTokenPayload | null {
    let decodedValue = null

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded
    })

    return decodedValue
  }

  verifyRefreshToken(token: string): RefreshTokenPayload | null {
    let decodedValue = null

    jwt.verify(token, env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded
    })

    return decodedValue
  }

  verifyActivateToken(token: string): ActivateTokenPayload | null {
    let decodedValue = null

    jwt.verify(token, env.ACTIVATE_TOKEN_SECRET, (err, decoded) => {
      if (err) return

      decodedValue = decoded
    })

    return decodedValue
  }

  sendRefreshToken(payload: string, req: NextApiRequest, res: NextApiResponse) {
    setCookie(CookieKeys.RefreshToken, payload, {
      req,
      res,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  }
})()
