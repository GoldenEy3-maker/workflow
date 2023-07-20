import { createTRPCRouter } from "~/server/api/trpc"
import { levelRouter } from "./routers/level"
import { specialityRouter } from "./routers/speciality"
import { userRouter } from "./routers/user"

export const appRouter = createTRPCRouter({
  user: userRouter,
  speciality: specialityRouter,
  level: levelRouter
})

export type AppRouter = typeof appRouter
