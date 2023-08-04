import { FaFigma, FaReact } from "react-icons/fa"
import { TbBrandAngular, TbBrandNextjs, TbBrandVue } from "react-icons/tb"
import * as Section from "~/components/Section"

const PopularTopics: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Популярные темы</Section.Title>
      </Section.Header>
      <Section.Content>
        <ul className="grid gap-6">
          <li className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <FaReact fontSize="2rem" />
              <p>React</p>
            </div>
            <span className="text-primary">90%</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <TbBrandNextjs fontSize="2rem" />
              <p>Next</p>
            </div>
            <span className="text-primary">90%</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <TbBrandAngular fontSize="2rem" />
              <p>Angular</p>
            </div>
            <span className="text-primary">50%</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <TbBrandVue fontSize="2rem" />
              <p>Vue</p>
            </div>
            <span className="text-primary">50%</span>
          </li>
          <li className="flex items-center gap-4">
            <div className="flex flex-1 items-center gap-4">
              <FaFigma fontSize="2rem" />
              <p>Дизайн</p>
            </div>
            <span className="text-primary">50%</span>
          </li>
        </ul>
      </Section.Content>
    </Section.Root>
  )
}
export default PopularTopics
