import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTodos } from '@/queries/todo';
import { Link, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Sort, priorityMap, sortMap } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Priority } from '@/lib/schemas';
import useQueryString from '@/hooks/useQueryString';

export default function TodoList() {
  const { data } = useTodos();
  const [searchParams, setSearchParams] = useSearchParams();
  const { query } = useQueryString();
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      searchParams.delete('keyword');
    } else {
      searchParams.set('keyword', e.target.value);
    }
    setSearchParams(searchParams);
  };

  const handleChangeSort = (value: string) => {
    if (query.sort === value) {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }
    setSearchParams(searchParams);
  };

  const handleChangePriority = (value: string) => {
    if (query.priority === value) {
      searchParams.delete('priorityFilter');
    } else {
      searchParams.set('priorityFilter', value);
    }
    setSearchParams(searchParams);
  };
  const handleChangeOrder = (value: string) => {
    if (query.order === value) {
      searchParams.delete('order');
    } else {
      searchParams.set('order', value);
    }
    setSearchParams(searchParams);
  };
  const handleChangeCountOnly = () => {
    if (query.countOnly) {
      searchParams.delete('countOnly');
    } else {
      searchParams.set('countOnly', 'true');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="w-3/5">
      <h2 className="py-3 text-lg font-bold">할 일 목록</h2>
      <div className="flex items-center gap-2 p-1 text-sm">
        <div className="flex items-center gap-1">
          {Object.keys(sortMap).map((sort) => (
            <button
              key={sort}
              type="button"
              className={cn(sort === query.sort && 'font-bold')}
              onClick={() => handleChangeSort(sort)}
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
              className={cn(priority === query.priority && 'font-bold')}
              onClick={() => handleChangePriority(priority)}
            >
              {priorityMap[priority as Priority].name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-1 text-sm">
        {(query.sort === 'createdAt' || query.sort === 'updatedAt') && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className={cn('desc' === query.order && 'font-bold')}
              onClick={() => handleChangeOrder('desc')}
            >
              최신순
            </button>
            <button
              className={cn('asc' === query.order && 'font-bold')}
              onClick={() => handleChangeOrder('asc')}
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
            className={cn(query.countOnly && 'font-bold')}
            onClick={handleChangeCountOnly}
          >
            갯수만가져오기
          </button>
        </div>
      </div>
      <Input onChange={handleChangeKeyword} placeholder="검색어" />
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
