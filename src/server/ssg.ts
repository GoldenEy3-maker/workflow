import { createServerSideHelpers } from "@trpc/react-query/server"
import SuperJSON from "superjson"
import { appRouter } from "./api/root"
import { createTRPCContext } from "./api/trpc"

export const createSSG = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createTRPCContext({}),
    transformer: SuperJSON,
  })
}
