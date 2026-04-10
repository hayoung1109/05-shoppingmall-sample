
import Subpage from '../components/Subpage'

export default function Man() {
    //카테고리는 외부에서 불러온 데이터에 있는 카테고리를 그대로 사용
    //jewelery , electronics, women's clothing
    return (
        <div className="sub-page-wrap">
            <Subpage title="남자" category="men"
                bannerImg="./images/man-sub-banner.jpg" />
        </div>
    )
}
