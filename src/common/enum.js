import Enum from '@/utils/Enum'

//时薪高低
export const moneySortList = new Enum(
  { alias: 'ALL', text: '全部', value: 1 },
  { alias: 'HTL', text: '时薪由高到低', value: 2 },
  { alias: 'LTH', text: '时薪由低到高', value: 3 },
)

//性别 
export const sexList = new Enum(
  { alias: 'BX', text: '不限', value: 1 },
  { alias: 'MAN', text: '男', value: 2 },
  { alias: 'FAMAN', text: '女', value: 3 }
)

//年级
export const gradeList = new Enum(
  { alias: '1', text: '学前', value: 1 },
  { alias: '2', text: '小学', value: 2 },
  { alias: '3', text: '初中', value: 3 },
  { alias: '4', text: '高中', value: 4 },
  { alias: '5', text: '大学', value: 5 },
  { alias: '6', text: '成人', value: 6 }
)

//科目
export const subjectList = new Enum(
  { alias: '1', text: '语文', value: 1 },
  { alias: '2', text: '数学', value: 2 },
  { alias: '3', text: '英语', value: 3 },
  { alias: '4', text: '物理', value: 4 },
  { alias: '5', text: '化学', value: 5 },
  { alias: '6', text: '生物', value: 6 },
  { alias: '7', text: '地理', value: 7 },
  { alias: '8', text: '奥数', value: 8 },
  { alias: '9', text: '文综', value: 9 },
  { alias: '10', text: '钢琴', value: 10 },
)