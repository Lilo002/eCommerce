import { useNavigate } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/autoplay';
import 'swiper/css/navigation';

import { ROUTES } from '../../shared/constants';

import img1 from './ui/images/bg1.webp';
import img2 from './ui/images/bg2.webp';
import img3 from './ui/images/bg3.webp';

import './ui/_main.scss';
import 'swiper/css';

export function Main() {
  const navigate = useNavigate();
  const images = [
    { src: img1, order: 1 },
    { src: img2, order: 2 },
    { src: img3, order: 3 },
  ];

  const onPromoClick = (promo: string) => {
    navigate(ROUTES.BASKET, {
      state: {
        promo,
      },
    });
  };

  return (
    <div className="main">
      <Swiper navigation modules={[Navigation]}>
        {images.map((image, index) => (
          <SwiperSlide className="main-swiper" key={image.order}>
            <img className="main-swiper-img" src={image.src} alt={`Slide ${index}`} />
            {index === 0 && (
              <button type="button" className="promo-circle" onClick={() => onPromoClick('SUMMER')}>
                <span className="promo-text">Summer sale</span>
                <span className="promo-text">Promocode</span>
                <span className="promo-description">SUMMER</span>
                <span className="promo-description">-15%</span>
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
