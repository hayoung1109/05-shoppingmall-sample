// Import the functions you need from the SDKs you need


//GoogleAuthProvider 구글 로그인 기능 제공
import { GoogleAuthProvider } from "firebase/auth";
//getAuth 인증시스템 생성
import { getAuth } from "firebase/auth";

//firebase 앱을 초기화 하는 함수
import { initializeApp } from "firebase/app";

//데이터베이스 ->json 형태로 저장
import { getFirestore } from "firebase/firestore";
//파일저장소 - 이미지,영상, 파일업로드
import { getStorage } from "firebase/storage";
//사용자 분석 - 몆명 접속했는지,어디를 클릭했는지
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//CRA APP일때는  process.env
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase

//firebase 연결시작
const app = initializeApp(firebaseConfig);
//로그인 기능 생성 - 다른 파일에서도 쓰기 위해 export
export const auth = getAuth(app);
//구글 로그인기능 생성
export const googleProvider = new GoogleAuthProvider();
//데이터 베이스 연결 - 상품저장, 주문데이터 저장
export const db = getFirestore(app);

export const storage = getStorage(app);
//사용자 행동분석 시작
const analytics = getAnalytics(app);