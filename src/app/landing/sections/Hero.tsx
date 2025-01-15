import { For } from "@/app/utils/jsx-control-statements"
import pic from '@/assets/imgs/Hero.png';

export interface IPropsHero {

  title?: string,
  list?: Array<string>,
  image?: {
    url: string,
    alt_text: string,
  },
}

export default function Hero ({image, list, title}: IPropsHero) {
  return (
    <section className="Hero">
      <div className="Hero__left">
        <h2 className="Hero__title">{title}</h2>
        <ul className="Hero__list">
          <For items={list}>
            {(item, index) => {
              return <li key={index} className="Hero__item">{item}</li>
            }}
          </For>
        </ul>
        <button className="Hero__button bt __solid">
          Подробнее
        </button>
      </div>
      <div className="Hero__right">
        <img className="Hero__image" src={image?.url} alt={image?.alt_text} />
      </div>
    </section>
  )
};