import { type NextApiHandler } from "next"
import { prisma } from "~/server/db"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"
import { CookieKeys } from "~/utils/enums"

const handler: NextApiHandler = async (req, res) => {
  try {
    const refresh_token = req.cookies[CookieKeys.RefreshToken]

    if (!refresh_token) throw ApiError.Unauthorized()

    const refreshTokenPayload = tokenService.verifyRefreshToken(refresh_token)

    if (!refreshTokenPayload) throw ApiError.Unauthorized()

    const user = await prisma.user.findUnique({
      where: {
        id: refreshTokenPayload.id,
      },
    })

    if (!user) throw ApiError.Unauthorized()

    if (user.tokenVersion !== refreshTokenPayload.tokenVersion)
      throw ApiError.Unauthorized()

    const { accessToken, refreshToken } = tokenService.generateTokens(user)

    tokenService.sendRefreshToken(refreshToken, req, res)

    return res.json({ accessToken })
  } catch (e: unknown) {
    if (e instanceof ApiError)
      return res.status(401).json({ message: e.message })

    return res.status(400).json({ message: "Неожиданная ошибка!" })
  }
}

export default handler
