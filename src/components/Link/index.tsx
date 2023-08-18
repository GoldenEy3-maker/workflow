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
    { href, locale, shallow, scroll, replace, children, variant, ...props },
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
          {...props}
          className={cls([props.className, styles.link], {
            [styles.elevated ?? ""]: variant === "elevated",
            [styles.filled ?? ""]: variant === "filled",
          })}
          onPointerDown={(event) => {
            rippleEffectEvent(event)

            if (props.onPointerDown) props.onPointerDown(event)
          }}
          ref={ref}
        >
          {children}
        </a>
      </NextLink>
    )
  }
)

Link.displayName = "Link"

export default Link
