import toast, { ToastBar, Toaster } from "react-hot-toast"
import Button from "../Button"
import styles from "./styles.module.scss"

const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      gutter={16}
      toastOptions={{
        style: {
          background: "hsl(var(--surface-container-hsl))",
          color: "hsl(var(--on-surface-hsl))",
          paddingInline: "1em",
          borderRadius: "var(--medium-shape)",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              <div className={styles.message}>{message}</div>
              {t.type !== "loading" && (
                <Button
                  clrType={
                    t.type === "error"
                      ? "danger"
                      : t.type === "success"
                      ? "success"
                      : undefined
                  }
                  isIcon
                  onClick={() => toast.dismiss(t.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1.2em"
                    viewBox="0 -960 960 960"
                    width="1.2em"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </Button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}
export default ToastContainer
