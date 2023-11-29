// // zustand store 생성
// // combine할 slice도 정의

import { create } from 'zustand'
import { createAuthSlice } from './authSlice'
// interface AuthSlice {
//   signUp: (UserInput: UserInputType) => void;
//   // logIn: 
//   // 인증
//   // 인가
// }
export const useBoundStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))