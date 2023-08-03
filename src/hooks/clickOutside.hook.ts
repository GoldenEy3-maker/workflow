import { useCallback, useEffect } from "react"

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  extraCondition?: boolean
) => {
  const handler = useCallback(
    (event: MouseEvent) => {
      if (
        !ref.current?.contains(event.target as HTMLElement) &&
        extraCondition
      ) {
        callback()
      }
    },
    [ref, callback, extraCondition]
  )

  useEffect(() => {
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [handler])
}
