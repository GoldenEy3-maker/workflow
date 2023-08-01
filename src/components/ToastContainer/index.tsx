import toast, { ToastBar, Toaster } from "react-hot-toast"
import { MdClose } from "react-icons/md"
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
                  <MdClose fontSize="1.2em" />
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
