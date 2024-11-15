import { Priority } from '@/lib/schemas';

type PriorityKor = '낮음' | '보통' | '긴급';
export type Sort = 'createdAt' | 'updatedAt' | 'priority';

export const priorityMap: Record<
  Priority,
  { bgColor: string; name: PriorityKor }
> = {
  low: { name: '낮음', bgColor: 'bg-green-500' },
  normal: { name: '보통', bgColor: 'bg-blue-500' },
  urgent: { name: '긴급', bgColor: 'bg-red-500' },
};

export const sortMap: Record<Sort, string> = {
  priority: '우선순위',
  createdAt: '생성일',
  updatedAt: '수정일',
};
