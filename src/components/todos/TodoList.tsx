import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTodos } from '@/queries/todo';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Sort, priorityMap, sortMap } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Priority } from '@/lib/schemas';
import useTodoFilterSearchParams from '@/hooks/useTodoFilterSearchParams';

export default function TodoList() {
  const { data } = useTodos();
  const { todoFilterSearchParams, setTodoFilterSearchParams } =
    useTodoFilterSearchParams();

  return (
    <div className="w-3/5">
      <h2 className="py-3 text-lg font-bold">할 일 목록</h2>
      <div className="flex items-center gap-2 p-1 text-sm">
        <div className="flex items-center gap-1">
          {Object.keys(sortMap).map((sort) => (
            <button
              key={sort}
              type="button"
              className={cn(
                sort === todoFilterSearchParams.sort && 'font-bold',
              )}
              onClick={() => setTodoFilterSearchParams('sort', sort)}
            >
              {sortMap[sort as Sort]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-1 text-sm">
        <div className="flex items-center gap-1">
          {Object.keys(priorityMap).map((priority) => (
            <button
              key={priority}
              type="button"
              className={cn(
                priority === todoFilterSearchParams.priorityFilter &&
                  'font-bold',
              )}
              onClick={() =>
                setTodoFilterSearchParams('priorityFilter', priority)
              }
            >
              {priorityMap[priority as Priority].name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-1 text-sm">
        {(todoFilterSearchParams.sort === 'createdAt' ||
          todoFilterSearchParams.sort === 'updatedAt') && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={cn(
                'desc' === todoFilterSearchParams.order && 'font-bold',
              )}
              onClick={() => setTodoFilterSearchParams('order', 'desc')}
            >
              최신순
            </button>
            <button
              className={cn(
                'asc' === todoFilterSearchParams.order && 'font-bold',
              )}
              onClick={() => setTodoFilterSearchParams('order', 'asc')}
            >
              오래된순
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-1 text-sm">
        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(todoFilterSearchParams.countOnly && 'font-bold')}
            onClick={() => setTodoFilterSearchParams('countOnly', 'true')}
          >
            갯수만가져오기
          </button>
        </div>
      </div>
      <Input
        onChange={(e) => setTodoFilterSearchParams('keyword', e.target.value)}
        placeholder="검색어"
      />
      {typeof data === 'number' ? (
        <div>{data}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="">우선순위</TableHead>
              <TableHead className="">할 일</TableHead>
              <TableHead className="">생성일</TableHead>
              <TableHead className="">수정일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className={`flex items-center gap-2 font-medium`}>
                  <div
                    className={`${priorityMap[todo.priority].bgColor} h-2 w-2 rounded-full`}
                  ></div>
                  {priorityMap[todo.priority].name}
                </TableCell>
                <TableCell>
                  <Link to={todo.id}>{todo.title}</Link>
                </TableCell>
                <TableCell>
                  {dayjs(todo.createdAt).format('YYYY-MM-DD')}
                </TableCell>
                <TableCell className="text-right">
                  {dayjs(todo.updatedAt).format('YYYY-MM-DD')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
