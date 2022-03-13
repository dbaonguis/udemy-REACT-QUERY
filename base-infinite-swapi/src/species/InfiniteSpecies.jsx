import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const InfiniteSpecies = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery('sw-species', ({ pageParam = initialUrl }) => {
    return fetchUrl(pageParam);
  }, {
    getNextPageParam: (lastPage, pages) => lastPage.next || undefined,
  });

  if (isError) return <div>Error! {error}</div>;

  if (isLoading) return <div className="loading">Loading...</div>;

  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((specie) => {
            const { name, language, average_lifespan } = specie;
            return <Species name={name} language={language} averageLifespan={average_lifespan} />;
          });
        })}
      </InfiniteScroll>
    </>
  );
}

export { InfiniteSpecies } ;
