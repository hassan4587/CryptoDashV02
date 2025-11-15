import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
const API_URL = import.meta.env.VITE_COIN_API_URL;
const CoinDetailsPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new error("Failed to fetch the data");
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);
  return <div>Coin{id}</div>;
};

export default CoinDetailsPage;
