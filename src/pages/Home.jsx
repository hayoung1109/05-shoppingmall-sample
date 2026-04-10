
import SectionTitle from '../components/SectionTitle'
import MainSlider from '../components/MainSlider'
import { useProductStore } from '../store/useProductStore'
import { useEffect } from 'react';
import SectionSwiper from '../components/SectionSwiper';

export default function Home() {
    const { onFetchItems } = useProductStore();
    //컴포넌트가 화면에 랜더링될때 처음 한번 실행
    useEffect(() => {
        onFetchItems();
    }, [])
    return (
        <div className="container">
            {/* 메인슬라이드 */}
            <MainSlider />
            <main>
                <section className='inner'>
                    <SectionTitle title="SPRING PROMOTION" subTitle="지금 필요한 봄 상품 할인 찬스" />
                    <SectionSwiper category="all" count={4} />
                </section>
                <section className='inner'>
                    <div className="women-list">
                        <div className="women-left">
                            <div><img src="./images/women-big.jpg" alt="" /></div>
                        </div>
                        <div className='women-right'>
                            <SectionTitle title="전소미 PICK 신상 자켓" subTitle="네 가지 컬레웨이로 만나보세요" />
                            <SectionSwiper category="women" count={2} />
                        </div>
                    </div>
                </section>
                <section>
                    <SectionTitle title="봄을 닮은 가벼운 실루엣" subTitle="WOMEN SPRING JACKET" />
                    <SectionSwiper category="electronics" count={5} />
                </section>
            </main>

        </div>
    )
}
