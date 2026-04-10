
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';

export default function ProductListPage() {
    // URL에서 category, subCategory 가져오기
    // 예: /men/티셔츠 => category="men", subCategory="티셔츠"
    const { category, subCategory } = useParams();
    const { items } = useProductStore();

    // 카테고리 + 서브카테고리로 상품 필터링
    const filteredItems = items.filter(item =>
        item.category === category &&
        item.subcategory === subCategory
    );
    return (
        <div className='sub-page-wrap'>
            <div className="inner">
                <ul>
                    {filteredItems.map(item => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.title}</p>
                            <p>{item.price}원</p>
                        </li>
                    ))}
                </ul>
                <div></div>
            </div>
        </div>
    )
}
