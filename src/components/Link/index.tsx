import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { forwardRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type LinkProps = {
  variant?: "elevated" | "filled"
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<NextLinkProps, "as" | "passHref" | "children">

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      locale,
      shallow,
      scroll,
      replace,
      className,
      children,
      onPointerDown,
      variant,
      ...props
    },
    ref
  ) => {
    const rippleEffectEvent = useRippleEffect()

    return (
      <NextLink
        href={href}
        replace={replace}
        shallow={shallow}
        scroll={scroll}
        locale={locale}
        passHref
        legacyBehavior
      >
        <a
          className={cls([className, styles.link], {
            [styles.elevated ?? ""]: variant === "elevated",
            [styles.filled ?? ""]: variant === "filled",
          })}
          onPointerDown={(event) => {
            rippleEffectEvent(event)

            if (onPointerDown) onPointerDown(event)
          }}
          ref={ref}
          {...props}
        >
          {children}
        </a>
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export default Link
