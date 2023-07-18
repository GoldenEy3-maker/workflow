import { useRouter } from "next/router"
import { useEffect } from "react"

export const useModal = () => {
  const router = useRouter()

  const setScrollbarWidth = () => {
    document.body.style.setProperty(
      "--scrollbar-width",
      `${window.innerWidth - document.body.offsetWidth}px`
    )
  }

  const openModal = (callback: () => void) => {
    document.body.dataset.lock = "true"

    callback()
  }

  const closeModal = (callback: () => void) => {
    callback()

    setTimeout(() => {
      document.body.removeAttribute("data-lock")
    }, 200)
  }

  useEffect(() => {
    setScrollbarWidth()

    window.addEventListener("resize", setScrollbarWidth)

    return () => window.removeEventListener("resize", setScrollbarWidth)
  }, [router.pathname])

  return [openModal, closeModal]
}
