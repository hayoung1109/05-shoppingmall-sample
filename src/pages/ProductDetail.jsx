
import { useParams } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore';
import { useState } from 'react';
import { useEffect } from 'react';

import DetailCartPopup from '../components/DetailCartPopup';
import DetailWishPopup from '../components/DetailWishPopup';



import "./scss/ProductDetail.scss"
import "../components/scss/Popup.scss"
//사이즈를 저장할 배열
const size = ["S", "M", "L"];

//수량체크나 사이즈도 따로 컴포넌트로 만들어서해도 okay
export default function ProductDetail() {
    //주소줄에 있는 파라메터 값을 받아서 사용하기 useParams 
    //main.jsx 에서 path="/product/:id"확인 
    const { id } = useParams();
    console.log("아이디", id);

    ////상태변수 상품목록가져온후 id값이 일치하는 상품을 찾아줌
    const { items, onAddCart, onAddWishList } = useProductStore();
    //id값과 일치하는 상품을 저장할 변수 - id값은 계속해서 변하기 때문에 상태변수로 
    const [product, setProduct] = useState("");
    //사이즈를 체크할 변수
    const [selectSize, setSize] = useState("");
    //수량을 체크할 변수
    const [count, setCount] = useState(0);
    //팝업을 체크할 변수
    const [showCart, setShowCart] = useState(false);
    const [showWish, setShowWish] = useState(false);

    //장바구니 메서드
    const handleAddToCart = () => {
        console.log("찜 클릭");
        setShowCart(true);
        //사이즈가 선택이 안되면 장바구니에 담기지 않게
        if (!selectSize) {
            alert("사이즈를 선택해주세요")
            return;
        }
        else if (!count) {
            alert("수량을 선택해주세요")
            return; s
        }
        const productCart = {
            ...product,
            size: selectSize,
            count: count
        }
        onAddCart(productCart);
    }
    //찜 메서드
    const handleAddToWish = () => {
        console.log("찜 클릭");
        //찜하기 리스트 배열에 찜한 내용추가하고
        onAddWishList(product);
        //찜 완료되었습니다 팝업 오픈
        setShowWish(true);
    }
    //팝업 닫는 메서드
    const handelClosePopup = () => {
        setShowCart(false);
        setShowWish(false);
    }
    //id값이 일치하는 제품 찾기
    //파라메터로 넘어오는 값은 문자이기 때문에 숫자로 바꿔서 비교
    useEffect(() => {
        if (!id || items.length === 0) return;
        const findItems = items.find((item) => item.id === Number(id))

        setProduct(findItems)
    }, [id, items])
    //새로고침해도 안사라지게 
    // useEffect(() => {
    //     if (items.length === 0) {
    //         onFetchItems();
    //     }
    // }, [items])
    // if (!product) return <div>상품 없음 또는 로딩중...</div>;
    return (
        <div className="sub-page-wrap">
            <div className="inner">
                <div className="product-wrap">
                    <div className="product-img">
                        <img src={product.image} alt="" />
                        <div>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="product-text">
                        <p className="cate-title">{product.category}</p>
                        <h3 className="product-title">{product.title}</h3>
                        <p className='product-price'>가격:{product.price}</p>
                        <div className="product-size">
                            <strong>사이즈</strong>
                            <ul>
                                {size.map((size, id) => (
                                    <li key={id}><button className={selectSize === size ? "active" : ""}
                                        onClick={() => (setSize(size))}>{size}</button></li>
                                ))}
                            </ul>
                        </div>
                        <div className="product-count">
                            <strong>수량</strong>
                            <div className="product-count-box">
                                <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
                                <span>{count}</span>
                                <button onClick={() => setCount((c) => c + 1)}>+</button>
                            </div>
                            <div className="cart-btn">
                                <button onClick={handleAddToWish}>찜하기</button>
                                <button onClick={handleAddToCart}>장바구니</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 장바구니 팝업 */}
            {showCart ? <DetailCartPopup onClose={handelClosePopup} /> : ""}
            {/* 찜 팝업 */}
            {showWish ? <DetailWishPopup onClose={handelClosePopup} /> : ""}
        </div>
    )
}
