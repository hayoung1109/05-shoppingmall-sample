
import SectionTitle from '../components/SectionTitle'
import { useProductStore } from '../store/useProductStore'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PaymentModal from '../components/PaymentModal';

export default function Payment() {
    const { totalPrice, coupons, selectedCoupon, onSelectedCoupon, onFinalPrice, finalPrice, cartItems, onAddOrder } = useProductStore();

    //페이지를 코드로 이동시키는 함수
    const navigate = useNavigate();

    //useLocation() 현재 페이지의 url + state정보를 가져올때 사용하는 훅
    const location = useLocation();
    const selectedItems = location.state?.selectedItems || cartItems;
    const selectedTotal = location.state?.selectedTotal || totalPrice;
    console.log(selectedItems, selectedTotal)


    //모달 팝업을 제어할 변수 만들기
    const [showPay, setShowPay] = useState(false);

    //결제하기를 클릭하면 paymentmodal팝업을 보여줄 메서드
    const handlePayment = () => {
        setShowPay(true);
    }
    //결제가 취소
    const handleClosePopup = () => {
        setShowPay(false);
    }
    //결제가 완료
    const handleConfirm = (e) => {
        alert("결제가 완료되었습니다. 주문 내역을 확인하세요");
        //주문한 내용을 orderList에 저장하기
        onAddOrder({
            items: selectedItems,
            total: finalPrice
        })
        //내 정보 페이지로 이동
        navigate("/userinfo")
    }
    useEffect(() => {
        onFinalPrice(selectedTotal)
    }, [selectedTotal, selectedCoupon])

    return (

        < div className="sub-page-wrap" >
            <div className="inner">
                <SectionTitle title="결제하기" />
                <div className="payment-list-wrap cart-wrap">
                    <ul className='cart-list'>
                        {selectedItems.map((item) => (
                            <li >
                                <div className="cart-goods-info">
                                    <img src={item.image} alt="" />
                                </div>
                                <div>
                                    <p>{item.title}</p>
                                    <p>{item.price}</p>
                                </div>
                                <div className="cart-right">
                                    <p>{item.count}</p>
                                    <p>{item.count * item.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="coupon-wrap">
                    <div>총 결제금액: {selectedTotal}</div>
                    <div>쿠폰:
                        {coupons.map((c) => (
                            <label>
                                <input type="radio" name='coupon' onChange={() => onSelectedCoupon(c)} checked={selectedCoupon?.id === c.id} />
                                {c.text}
                            </label>
                        ))}
                        <label>
                            <input type="radio" name='coupon' onChange={() => onSelectedCoupon(null)} />
                            쿠폰적용안함
                        </label>
                    </div>
                    <div>최종결제금액:{finalPrice}</div>
                    <p><button onClick={handlePayment}>결제하기</button></p>
                </div>
            </div>


            {/* PaymentModal Popup띄우기 */}
            {showPay ? <PaymentModal onClose={handleClosePopup} onConfirm={handleConfirm} /> : ""}
        </div >


    )
}

