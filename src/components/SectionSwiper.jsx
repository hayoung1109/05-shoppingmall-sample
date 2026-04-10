
import { Autoplay, Navigation, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import "swiper/css";
import "swiper/css/pagination";
import { useProductStore } from '../store/useProductStore';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

export default function SectionSwiper({ category, count, direction, delay }) {
    const { onItemsCategory } = useProductStore();



    //items이 다 불려지기 전에 카테고리가 실행됨
    //그래서 홈화면에서 새로고침하면 스와이퍼에 이미지가 없움
    // if (!items.length) return <div>로딩중...</div>

    const cateItems = onItemsCategory(category);
    console.log(cateItems);
    return (
        <div className='home-goods-list'>
            <Swiper
                modules={[Navigation, Scrollbar, Autoplay]}
                spaceBetween={40}
                slidesPerView={count}
                loop={true}
                autoplay={{
                    delay: delay ? delay : 3000
                }}
                direction={direction ? direction : "horizontal"}
            >
                {cateItems.map((cate) => (
                    <SwiperSlide>
                        <Link to={`/product/${cate.id}`}>
                            <ProductItem sendItem={cate} />
                        </Link>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div >
    )
}
