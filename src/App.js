import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Username } from "./home/username/username";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/github-api">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Username />} path="/:username" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
