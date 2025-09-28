import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CoinCard from "./components/CoinCard";
import FilterInput from "./components/FilterInput";
import LimitSelector from "./components/LimitSelector";
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

  // useEffect(()=>{
  //   console.log(coins);

  // },[coins])

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div>
      <h1>🚀 CryptoDash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterCahnge={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length >0 ? filteredCoins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          )) : <p>No Matching Coins Found...</p> }
        </main>
      )}
    </div>
  );
}

export default App;
