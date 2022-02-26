import { useState } from "react";
import { useQuery } from 'react-query';

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}` // starts at 1, not 0
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { isLoading, isFetching, isError, data, error,  } = useQuery(['posts', currentPage], () => fetchPosts(currentPage), {
    staleTime: 0,
    cacheTime: 1000 * 60,
  });
    
  if (isLoading) return <h3>Loading...</h3>;
  if (isFetching) return <h3>Fetching...</h3>;
  if (isError) return (
    <>
      <h3>oops, something went wrong!</h3>
      <p>{error.toString()}</p>
    </>
  );
 
  if (!data) return <div />;

  debugger;

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              setSelectedPost(post)}
            }
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button 
          disabled={currentPage <= 1} 
          onClick={() => {
            setCurrentPage((prevPageNum) => prevPageNum - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button 
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prevPageNum) => prevPageNum + 1);
          }
        }>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
