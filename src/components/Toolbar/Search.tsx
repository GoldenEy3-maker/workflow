import { MdSearch } from "react-icons/md"
import Input from "../Input"

type SearchProps = {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const Search: React.FC<SearchProps> = (props) => {
  return <Input label="Поиск" leadingIcon={<MdSearch />} {...props} />
}
