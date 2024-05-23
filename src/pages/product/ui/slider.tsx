import { Image } from '@commercetools/platform-sdk';
import { EffectFlip, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

import 'swiper/css';
import './_slider.scss';

export const ProductImage = ({ images }: { images: Image[] }) => (
  <div className="product-slider">
    <Swiper
      effect="flip"
      slidesPerView={1}
      navigation
      modules={[EffectFlip, Navigation, Pagination]}
      pagination={{ clickable: true }}
    >
      {images.map((image) => (
        <SwiperSlide key={image.url}>
          <img className="product-slider-img" alt="board game" src={image.url} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
