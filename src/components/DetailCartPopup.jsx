
import { Link } from 'react-router-dom'

export default function DetailCartPopup({ onClose }) {
    return (
        <div className='popup-wrap'>
            <div className="popup">
                <h2>장바구니에 추가되었습니다</h2>
                <div>
                    {/* 클릭했을때 실행 onClick={onClose}
                                    onClick={()=>(onClose())}도 같은의미
                                    onClick={onClose()} 클릭시 메서드가 실행되는게 아니라 렌더링시 바로 실행
                                    메서드이름뒤()괄호는 바로 실행하라는 뜻
                                    따라서 값을 넘길때는 onClick={()=>(onClose(id))} 이렇게 적어야 함
                                    */}
                    <button onClick={() => (onClose())}>쇼핑 계속하기</button>
                    <Link to="/cart">카트보기</Link>
                </div>
            </div>
        </div>
    )
}
