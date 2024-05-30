import { useRef, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { Modal } from 'antd';
import { Swiper as SwiperType } from 'swiper';
import { EffectFlip, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

import 'swiper/css';
import './_slider.scss';
import './_modal.scss';

export const ProductImage = ({ images }: { images: Image[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef<SwiperType | null>(null);

  const setCurrentSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  };

  const showModal = () => {
    setCurrentSlide();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateIndex = (swiperInstance: SwiperType) => {
    if (swiperInstance) {
      setActiveIndex(swiperInstance.activeIndex);
    }
  };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const renderSlides = (imageClass: string) =>
    images.map((image, index) => (
      <SwiperSlide key={image.url}>
        <img className={imageClass} alt={`${index + 1} board game`} src={image.url} />
      </SwiperSlide>
    ));

  return (
    <div className="product-slider">
      <Swiper
        effect="flip"
        slidesPerView={1}
        navigation
        modules={[EffectFlip, Navigation, Pagination]}
        pagination={{ clickable: true }}
        onClick={showModal}
        onRealIndexChange={updateIndex}
      >
        {renderSlides('product-slider-img')}
      </Swiper>
      <Modal className="modal-product" open={isModalOpen} footer={null} onCancel={handleCancel} width="100%">
        <Swiper
          onSwiper={handleSwiper}
          effect="flip"
          slidesPerView={1}
          navigation
          modules={[Keyboard, Navigation, Pagination]}
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          initialSlide={activeIndex}
        >
          {renderSlides('modal-product-img')}
        </Swiper>
      </Modal>
    </div>
  );
};
