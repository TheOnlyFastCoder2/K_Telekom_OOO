import useCheckbox from "@/app/components/ui/useCheckBox";
import { useRef } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export interface IPost {
  title: string;
  subtitle: string;
  speed: string;
  description: string;
  package: {
      checked: boolean;
      capability: string;
      type: string;
  };
  price: number;
  period: string;
  note: string;
  currency: string;
}

export default function TariffList ({list}:{list?:IPost[]}) {
  const refContainer = useRef<HTMLDivElement>(null);

  return (
    <section ref={refContainer} className="TariffList">
      <h3 className="TariffList__title">Тарифные планы</h3>
      <Swiper
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          grabCursor={true}
          centeredSlides={true}
          navigation
          effect="coverflow"
          pagination={{ clickable: true }}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 100,
            modifier: 0.5,
            slideShadows: false,
          }}
          modules={[Navigation, Pagination, EffectCoverflow]}
          breakpoints={{
            0: {slidesPerView: 1, spaceBetween:10},
            768: {slidesPerView: 2, spaceBetween:20},
            1024: {slidesPerView: 3, spaceBetween:30},
        }}
      >
        {list?.map((props, index) => {
            return (
              <SwiperSlide key={index}>
                <Tariff {...props}/>
              </SwiperSlide>
            )
        })}
    </Swiper>
    </section>
  ) 
}



const Tariff = ({ title, subtitle, speed, description, period, price, note, currency, package:{checked, capability, type} }:IPost) => {
  const { Checkbox } = useCheckbox({onlyRead: true, checked});
  return (
    <div className="Tariff">
      <div className="Tariff__details">
        <h4 className="Tariff__name">{title}</h4>

        <div className="Tariff__internet-speed">
          <h6 className="Tariff__speed-title">{subtitle}</h6>
          <h3 className="Tariff__speed-value">{speed}</h3>
          <p className="Tariff__description">{description}</p>
        </div>
        
        <Checkbox
          label={<>{capability}{currency}<br/>{type}</>}
          className="Tariff__checkbox"/>

        <div className="Tariff__price">
          <h1 className="Tariff__price-value">{price}{currency}</h1>
          <h6 className="Tariff__price-period">{period}</h6>
        </div>

        <p className="Tariff__note">
          <small>{note}</small>
        </p>
      </div>
      <button className="bt __solid">Выбрать тариф</button>
    </div>
  );
};

