import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="overflow-x-hidden bg-surface font-sans leading-[1.35] text-on-surface antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
