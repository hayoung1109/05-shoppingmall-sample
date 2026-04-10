
import { Link, useNavigate } from 'react-router-dom'
import "./scss/login.scss"
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
export default function Login() {
    //1.상태변수
    const [email, setEmamil] = useState("");
    const [password, setPassword] = useState("");


    const { onLogin, onGoogleLogin } = useAuthStore();
    // const onLogin = useAuthStore((s) => (s.onLogin));

    //로그인하면 첫화면(홈)으로 이동하기
    const navigate = useNavigate();

    //2.메서드
    //기본 로그인
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //로그인 성공 후에만 첫화면으로 이동
            await onLogin(email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
        }

    }
    //구글 로그인
    const handleGoogleLogin = () => {

        console.log("구글 로그인")
        onGoogleLogin();
    }
    //카카오 로그인
    const handleKaKaoLogin = () => {
        console.log("카카오 로그인")
    }


    //3.화면에 보여질 내용
    return (
        <div className="sub-page-wrap">
            <div className="inner">
                <div className="login-wrap">
                    <div className="section-title-box">
                        <h2 className='section-title'>로그인</h2>
                        <p className="section-sub-title">로그인하시면 쿠폰이 발급됩니다</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='아이디를 입력하세요' value={email}
                            onChange={(e) => (setEmamil(e.target.value))} />
                        <input type="password" placeholder='비밀번호 6자리 이상 입력하세요' value={password}
                            onChange={(e) => (setPassword(e.target.value))} />
                        <button type='submit'>로그인</button>
                        <button type='button' onClick={handleGoogleLogin}>구글 로그인</button>
                        <button type='button' className='kakao-button' onClick={handleKaKaoLogin}>카카오 로그인</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
