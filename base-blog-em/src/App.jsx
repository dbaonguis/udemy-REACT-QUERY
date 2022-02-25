import { React, useState } from 'react';
import { Posts } from "./Posts";
import "./App.css";

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  const [isVisible, setVisible] = useState(true);

  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        {isVisible && <Posts />}
      </div>
      <button onClick={() => {
        setVisible((prev) => !prev);
      }}>Hide and test 'inactive'</button>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
