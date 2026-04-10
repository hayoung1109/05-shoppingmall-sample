import { Route, Routes } from "react-router-dom"
//sass
import "./App.scss"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import All from "./pages/All"
import Man from "./pages/Man"
import Woman from "./pages/Woman"
import Jewerly from "./pages/Jewerly"
import Electronics from "./pages/Electronics"
import Login from "./pages/Login"
import Member from "./pages/Member"
import Cart from "./pages/Cart"
import Payment from "./pages/Payment"
import UserInfo from "./pages/UserInfo"
import ProductDetail from "./pages/ProductDetail"
import { useProductStore } from "./store/useProductStore"
import { useEffect } from "react"
import WishList from "./components/WishList"
import ProductListPage from "./pages/ProductListPage"
import ProductList from "./components/ProductList"
import PaymentModal from "./components/PaymentModal"


function App() {
  // 새로고침해도 안사라지게
  const onFetchItems = useProductStore((s) => (s.onFetchItems));
  const items = useProductStore((s) => (s.items));

  useEffect(() => {
    onFetchItems()
  }, [items])
  if (!items.length) return <div>로딩중.....</div>

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 상세페이지 */}
        {/* img경로가 ./이면 깨지는 이유
         ./ -> 현재 위치 기준으로 길찾기
             / ->  절대경로
             "./는 현재 위치 기준이라 깊어지면 깨지고, /는 항상 고정이라 안 깨진다" */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/:category/:subCategory" element={<ProductList />} />

        <Route path="/all" element={<All />} />
        <Route path="/men" element={<Man />} />
        <Route path="/women" element={<Woman />} />
        <Route path="/jewelery" element={<Jewerly />} />
        <Route path="/electronics" element={<Electronics />} />

        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<Member />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/userinfo" element={<UserInfo />} />

        <Route path="/wishlist" element={<WishList />} />

      </Routes>
      <Footer />
    </>
  )
}

export default App
