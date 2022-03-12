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
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {
      data?.pages?.map((pageData) => {
        return pageData?.results?.map((person, idx) => {
          const { name, hair_color, eye_color } = person;
          return <Person key={idx} name={name} hairColor={hair_color} eyeColor={eye_color} />
        });
      })
    }
  </InfiniteScroll>;
}

export { InfinitePeople };
