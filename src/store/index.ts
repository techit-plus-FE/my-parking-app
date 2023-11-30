// // zustand store 생성
// // combine할 slice도 정의

import { create } from 'zustand'
import { createAuthSlice } from './AuthSlice'
import { AuthSlice } from '../types/Auth'

export const useBoundStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))