import { Priority } from '@/lib/schemas';

interface Todo {
  title: string;
  content: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;
}
