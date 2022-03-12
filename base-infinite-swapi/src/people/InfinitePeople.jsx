import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";


const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const InfinitePeople = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery('sw-people', ({ pageParam = initialUrl }) => {
    return fetchUrl(pageParam);
  }, {
    getNextPageParam: (lastPage) => lastPage.next || undefined, // return 'undefined' if this function is falsey, so that the 'hasNextPage' will return undefined
  });

  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}

export { InfinitePeople };
