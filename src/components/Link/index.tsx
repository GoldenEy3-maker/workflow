import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { forwardRef, useRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type LinkProps = Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "href"
> &
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
          className={cls([className, styles.link])}
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
