import { SkeletonTheme } from "react-loading-skeleton"

export const SkeletonThemeProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  return (
    <SkeletonTheme
      baseColor="hsl(var(--outline-variant-hsl))"
      highlightColor="hsl(var(--placeholder-hsl))"
      borderRadius="var(--large-shape)"
    >
      {props.children}
    </SkeletonTheme>
  )
}
