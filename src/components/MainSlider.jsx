
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import "swiper/css";
import "swiper/css/pagination";

export default function MainSlider() {
    const slides = [
        { src: "./images/main_slider_01.jpg", alt: "slider1" },
        { src: "./images/main_slider_02.jpg", alt: "slider2" },
        { src: "./images/main_slider_03.jpg", alt: "slider3" },
        { src: "./images/main_slider_04.jpg", alt: "slider4" },
        { src: "./images/main_slider_05.jpg", alt: "slider5" },
    ]
    return (
        <>
            <Swiper className='mySwiper'
                modules={[Autoplay, Pagination]}
                pagination
                autoplay={{
                    delay: 2500,
                }}
                loop={true}>
                {slides.map((img, id) => (
                    <SwiperSlide key={id}><img src={img.src} alt={img.alt} /></SwiperSlide>
                ))}


            </Swiper>
        </>
    )
}
