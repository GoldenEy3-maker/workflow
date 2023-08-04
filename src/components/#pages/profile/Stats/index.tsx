import ProgressBar from "./ProgressBar"

const Stats: React.FC = () => {
  return (
    <div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-4">
        <li className="flex justify-between gap-4 rounded-medium-shape bg-surface-container p-6">
          <div className="flex flex-col gap-[0.3rem]">
            <h4 className="text-title-l font-medium">Активность</h4>
            <p className="flex-1 text-body-s text-on-surface-variant">
              Активность на ресурсе
            </p>
          </div>
          <div>
            <ProgressBar value={60} />
          </div>
        </li>
        <li className="flex justify-between gap-4 rounded-medium-shape bg-surface-container p-6">
          <div className="flex flex-col gap-[0.3rem]">
            <h4 className="text-title-l font-medium">Выполненные</h4>
            <p className="flex-1 text-body-s text-on-surface-variant">
              Количество выполненных заказов
            </p>
            <span className="text-headline-m">21</span>
          </div>
          <div>
            <ProgressBar value={84} success />
          </div>
        </li>
        <li className="flex justify-between gap-4 rounded-medium-shape bg-surface-container p-6">
          <div className="flex flex-col gap-[0.3rem]">
            <h4 className="text-title-l font-medium">Отмененные</h4>
            <p className="flex-1 text-body-s text-on-surface-variant">
              Количество отменненых заказов
            </p>
            <span className="text-headline-m">1</span>
          </div>
          <div>
            <ProgressBar value={4} danger />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Stats
