import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/home.jsx";
import AboutPage from "./pages/about.jsx";
import NotFoundPage from "./pages/notfound.jsx";
import CoinDetails from "./pages/coinDetails.jsx"
import { Routes, Route } from "react-router";
const API_URL = import.meta.env.VITE_API_URL;

const options = {
  method: "GET",
  headers: { "x-cg-demo-api-key": "CG-ii2ZkFSh8hCi4kfxMeBSH2th" },
  body: undefined,
};

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCons = async () => {
      try {
        const res = await fetch(
          `${API_URL}vs_currency=usd&per_page=${limit}`,
          options
        );
        if (!res.ok) throw new Error("Failed to Fetch Data");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCons();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
