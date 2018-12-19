import Enum from '@/utils/Enum'

//时薪高低
export const moneySortList = new Enum(
  { alias: 'ALL', text: '全部', value: 1 },
  { alias: 'HTL', text: '时薪由高到低', value: 2 },
  { alias: 'LTH', text: '时薪由低到高', value: 3 },
)