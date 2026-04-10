import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db, googleProvider } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRef } from "react";

export const useAuthStore = create((set, get) => ({
    //1.상태변수
    //로그인,회원가입
    user: null,

    //2.메서드
    //회원가입
    onMember: async ({ uName, nickName, email, password, phone, profile }) => {
        try {
            //이메일 회원가입
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredential);
            const user = userCredential.user;
            //firestore에 저장하기
            //1단계 - 저장 위치 지정
            //doc(db, "컬렉션", 문서)
            const userRef = doc(db, "users", user.uid)
            //2단계 - 저장할 사용자 정보 만들기
            const userInfo = {
                uid: user.uid,
                name: uName,
                nickName,
                email,
                phone,
                profile
            }
            //3단계 - firestore에 데이터 저장 - db에 저장
            //우리가 가지고 있는 저장소가 아니라서..?
            await setDoc(userRef, userInfo);

            //4단계 - zustand에 상태저장
            set({ user: userInfo })
            alert("회원가입성공")
        } catch (error) {
            alert(error.message)
        }
    },
    //이메일 로그인
    onLogin: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인", userCredential);
            set({ user: userCredential.user })
        } catch (error) {
            alert(error.message)
        }
    },
    //구글 로그인
    onGoogleLogin: async () => {
        try {
            console.log("구글메서드 호출")
            //구글 로그인 팝업을 띄워서 사용자로부터 로그인, 그결과를 저장하기 
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result);
            const user = result.user;
            //데이터 베이스에 저장하기
            const userRef = doc(db, "user", user.uid);
            //회원인지 아닌지 체크하기 - 이미있는 정보인지 아닌지 체크하기
            const userDoc = await getDoc(userRef);
            //데이터가 있으면 회원가입이 안됨,이미 회원가입이 된 상태
            if (!userDoc.exists()) {
                const userInfo = {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    nickName: "",
                    phone: user.phoneNumber,
                    profile: ""
                }
                await setDoc(userRef, userInfo);
                set({ user: userInfo })
            } else {
                set({ user: userDoc.data() })
            }
        }
        catch (err) {
            alert(err.message);
        }

    },
    //카카오 로그인
    onKaKaoLogin: () => { },
    //로그아웃
    onLogout: async () => {
        await signOut(auth);
        set({ user: null });
    }
}))