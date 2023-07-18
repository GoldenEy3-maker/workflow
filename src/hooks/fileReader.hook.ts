import { useCallback, useState } from "react"

export type FilePreviewState = {
  base64: string
  name: string
}

export function useFileReader() {
  const [previews, setPreviews] = useState<FilePreviewState[]>()
  const [isLoading, setIsLoading] = useState(false)

  function handleFileChosen(file: File) {
    return new Promise<FilePreviewState>((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadstart = () => setIsLoading(true)

      reader.onloadend = () => {
        resolve({
          base64: reader.result as string,
          name: file.name
        })
        setIsLoading(false)
      }
      reader.onerror = (e) => {
        reject(e)
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    })
  }

  const readFiles = useCallback(async (files: FileList) => {
    const result = await Promise.all(
      Array.from(files).map(async (file) => await handleFileChosen(file))
    )

    setPreviews(result)
  }, [])

  const reset = useCallback(() => {
    setPreviews(undefined)
  }, [])

  return { previews, isLoading, readFiles, reset }
}
