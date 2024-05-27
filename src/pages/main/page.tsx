import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/autoplay';

import img1 from './ui/images/bg1.jpg';
import img2 from './ui/images/bg2.jpg';
import img3 from './ui/images/bg3.jpg';

import './ui/_main.scss';
import 'swiper/css';

export function Main() {
  const images = [
    { src: img1, order: 1 },
    { src: img2, order: 2 },
    { src: img3, order: 3 },
  ];

  return (
    <div className="main">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {images.map((image, index) => (
          <SwiperSlide className="main-swiper" key={image.order}>
            <img className="main-swiper-img" src={image.src} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
