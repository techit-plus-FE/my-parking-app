// // zustand store 생성
// // combine할 slice도 정의

import { create } from 'zustand'
import { createAuthSlice } from './AuthSlice'
import { AuthSlice } from '../types/Auth'
import { MyPageSlice} from '../types/MyPage'
import {createMyPageSlice} from './MyPageSlice'

export const useBoundStore = create<AuthSlice & MyPageSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createMyPageSlice(...a),
}))