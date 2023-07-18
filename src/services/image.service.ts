import ApiError from "~/server/exeptions"
import { supabase } from "~/server/supabase"

type UploadAvatarProps = {
  base64: string
  fileName: string
  userId: string
}

export default new (class ImageService {
  async uploadAvatar(props: UploadAvatarProps) {
    try {
      const buffer = Buffer.from(
        props.base64.replace(/^(data:image\/\w{3,4};base64,)/, ""),
        "base64"
      )

      const fileExt = props.fileName.split(".").at(-1)

      if (!fileExt) throw ApiError.BadRequest("Некорректное название файла!")

      const name = props.fileName.slice(0, props.fileName.lastIndexOf("."))
      const hashedFileName =
        Date.now().toString() + "_" + name.replace(/\s/g, "-") + "." + fileExt

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(props.userId + "/" + hashedFileName, buffer)

      if (error) throw ApiError.BadRequest(error.message)

      return data
    } catch (e: unknown) {
      if (e instanceof ApiError) throw new ApiError(e.code, e.message)

      throw ApiError.BadRequest("Неожиданная ошибка!")
    }
  }

  async deleteAvatar(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([path])

      if (error) throw ApiError.BadRequest(error.message)

      return data
    } catch (e: unknown) {
      if (e instanceof ApiError) throw new ApiError(e.code, e.message)

      throw ApiError.BadRequest("Неожиданная ошибка!")
    }
  }
})()
