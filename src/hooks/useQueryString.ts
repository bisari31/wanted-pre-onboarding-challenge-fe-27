import { useSearchParams } from 'react-router-dom';

export default function useQueryString() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const priority = searchParams.get('priorityFilter');
  const order = searchParams.get('order');
  const countOnly = searchParams.get('countOnly');

  const setQuery = () => {};

  const query = { sort, priority, order, countOnly };

  return { query };
}
