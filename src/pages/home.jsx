import React from "react";
import CoinCard from "../components/CoinCard";
import FilterInput from "../components/FilterInput";
import LimitSelector from "../components/LimitSelector";
import SortSelector from "../components/SortSelector";

function HomePage({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) {
  const filteredCoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.marktet_cap - a.marktet_cap;
          break;
        case "market_cap_asc":
          return a.marktet_cap - b.marktet_cap;
          break;
        case "price_desc":
          return b.current_price - a.current_price;
          break;
        case "price_asc":
          return a.current_price - b.current_price;
          break;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
          break;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
          break;
      }
    });

  return (
    <div>
      <h1>🚀 CryptoDash</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterCahnge={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No Matching Coins Found...</p>
          )}
        </main>
      )}
    </div>
  );
}

export default HomePage;
