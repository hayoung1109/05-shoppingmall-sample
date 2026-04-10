
import { useProductStore } from '../store/useProductStore'

export default function WishList() {
    const { wishList, onRemoveWish } = useProductStore();
    return (
        <div className='cart-wrap'>
            <ul className='wish-list cart-list'>
                {wishList.map((wish, id) => (
                    <li key={id}>
                        <div className="cart-goods-info">
                            <img src={wish.image} alt="" />
                        </div>
                        <div className="text-box">
                            <h3>{wish.title}</h3>
                            <p>{wish.price}</p>
                        </div>
                        <p><button onClick={() => onRemoveWish(wish.id)} > 삭제</button></p>
                    </li>
                ))}
            </ul>

        </div >
    )
}
