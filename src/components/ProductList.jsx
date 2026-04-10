
import { useProductStore } from '../store/useProductStore'
import { useEffect } from 'react';
import ProductItem from './ProductItem';
import { Link, useParams } from 'react-router-dom';
import "./scss/ProductList.scss"
import SectionTitle from './SectionTitle';

export default function ProductList({ category }) {
    const { items, onFetchItems } = useProductStore();
    //주소줄에 파라메커 값을 받아서 사용하기
    const params = useParams();
    //파라메터를 통해서 받아온 category값을 넣거나 매개변수로 받아온 category값을 넣거나
    const paraCate = params.category || category;
    const subCategory = params.subCategory;

    console.log("카테고리", paraCate, subCategory)

    //컴포넌트가 렌더링될 때 itmes에 데이터가 있는지 없는지 확인하고 없으면 데이터 불러오기
    //items값이 바뀔 때 onFetchItems실행
    //빈 배열이면 처음 한 번만 실행하겠다는 의미
    //배열이 없으면 렌더링마다 실행
    //useEffect안에 넣지않으면 렌더링 때마다 계속 실행되는 무한 호출 위험
    //useEffect안에 넣으면 조건에 맞을 때만 실행가능 
    useEffect(() => {
        if (items.length === 0) {
            onFetchItems();
        }
    }, [items])

    //카테고리별 필터링
    // if (!items.length)
    //     return (
    //         <div>로딩중...</div>
    //     )
    // let cateItems = onItemsCategory(category);
    let cateItems = items.filter((item) => {
        // //1.메인메뉴 카테고리 필터
        // if (paraCate && paraCate !== "all" && item.category !== paraCate) {
        //     return flase;
        // }
        // //2.subcategory가 있을경우 필터
        // if (subCategory && item.subcategory !== subCategory) {
        //     return false
        // }
        //return
        // subCategory가 있으면 category + subcategory 둘 다 일치해야 함
        if (subCategory) {
            return item.category === paraCate && item.subcategory === subCategory
        }
        // subCategory 없고 paraCate가 all이거나 없으면 전체 보여주기
        if (!paraCate || paraCate === "all") {
            return true
        }
        // subCategory 없고 paraCate만 있으면 category만 필터
        return item.category === paraCate

    }
    )



    console.log(cateItems);
    return (
        <div className='inner sub-page-wrap'>
            <SectionTitle title={subCategory} />
            <ul className="sub-goods-list">
                {cateItems.map((item, id) => (
                    <li key={id}>
                        <Link to={`/product/${item.id}`}><ProductItem sendItem={item} /></Link>

                    </li>
                ))}
            </ul>
        </div>
    )
}
