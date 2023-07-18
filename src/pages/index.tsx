import Chart from "~/components/#pages/home/Chart"
import PopularTopics from "~/components/#pages/home/PopularTopics"
import Stats from "~/components/#pages/home/Stats"
import TopEmployers from "~/components/#pages/home/TopEmployers"
import TopPerformers from "~/components/#pages/home/TopPerformers"
import * as Section from "~/components/Section"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "~/utils/types"
import styles from "./styles.module.scss"

const Home: NextPageWithLayout = () => {
  return (
    <main className={styles.home}>
      <Stats />
      <Section.Group>
        <Chart />
        <PopularTopics />
      </Section.Group>
      <Section.Group>
        <TopPerformers />
        <TopEmployers />
      </Section.Group>
    </main>
  )
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home
