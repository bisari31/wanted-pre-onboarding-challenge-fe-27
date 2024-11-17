import { useSearchParams } from 'react-router-dom';

type FilterType = 'sort' | 'priorityFilter' | 'order' | 'countOnly' | 'keyword';

export default function useTodoFilterSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const priorityFilter = searchParams.get('priorityFilter');
  const order = searchParams.get('order');
  const countOnly = searchParams.get('countOnly');
  const keyword = searchParams.get('keyword');

  const todoFilterSearchParams = {
    sort,
    priorityFilter,
    order,
    countOnly,
    keyword,
  };

  const setTodoFilterSearchParams = (filterType: FilterType, value: string) => {
    if (todoFilterSearchParams[filterType] === value) {
      searchParams.delete(filterType);
    } else {
      searchParams.set(filterType, value);
    }

    setSearchParams(searchParams);
  };

  return { todoFilterSearchParams, setTodoFilterSearchParams };
}
