import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import superjson from "superjson"
import { type AppRouter } from "~/server/api/root"
import { useAuthStore } from "~/store/auth"
import { getDevUrl, getProdUrl } from "./helpers"

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  return getProdUrl() ?? getDevUrl()
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async fetch(url, options) {
            const response = await fetch(url, {
              ...options,
              credentials: "include",
            })

            if (response.status === 401) {
              const refreshResponse = await fetch(
                `${getProdUrl() ?? getDevUrl()}/api/refresh_token`,
                {
                  method: "POST",
                  credentials: "include",
                }
              )

              if (!refreshResponse.ok) {
                return response
              }

              const refreshData = (await refreshResponse.json()) as {
                accessToken: string
              }

              useAuthStore.setState({ token: refreshData.accessToken })

              return await fetch(url, {
                ...options,
                credentials: "include",
                headers: {
                  ...options?.headers,
                  authorization: `Bearer ${refreshData.accessToken}`,
                },
              })
            }

            return response
          },
          headers() {
            const token = useAuthStore.getState().token

            if (token)
              return {
                authorization: `Bearer ${token}`,
              }

            return {}
          },
        }),
      ],
      transformer: superjson,
    }
  },
  ssr: false,
})

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
