import { request } from '@/utils/request'

export const getTeacherList = (data) => request('teacherList',data)