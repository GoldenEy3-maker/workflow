import { type inferRouterOutputs } from "@trpc/server"
import { createTRPCRouter } from "~/server/api/trpc"
import { levelRouter } from "./routers/level"
import { orderRouter } from "./routers/order"
import { resumeRouter } from "./routers/resume"
import { skillRouter } from "./routers/skills"
import { specialityRouter } from "./routers/speciality"
import { userRouter } from "./routers/user"

export const appRouter = createTRPCRouter({
  user: userRouter,
  speciality: specialityRouter,
  level: levelRouter,
  skill: skillRouter,
  resume: resumeRouter,
  order: orderRouter,
})

export type AppRouter = typeof appRouter
export type RouterOutput = inferRouterOutputs<AppRouter>
