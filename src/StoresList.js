import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const StoresList = () => {
  const params = useParams();
  const { country, city } = params;
  const [stores, setStores] = useState([]);
  const fetchStores = async () => {
    let url = `https://store-locator-api.allsaints.com/shops`;
    url =
      city !== undefined ? `${url}?city=${city}` : `${url}?country=${country}`;
    const fetchCountryStores = await fetch(url);
    const response = await fetchCountryStores.json();
    setStores(response);
  };
  useEffect(() => {
    fetchStores();
  }, [country, city]);
  if (stores.length === 0) {
    return null;
  }
  return (
    <div className="storeContainer">
      {stores &&
        stores.map((store, i) => {
          const { opening_hours_today: openingHours } = store;
          return (
            <div className="store" key={i}>
              <Link to={`/shop/store-detail-${store.uuid}`}>
                <h1>{store.name}</h1>
                <p>City: {store.city}</p>
                <p>Opening Hours:</p>
                {openingHours.map((hours, index) => {
                  const { open, close } = hours;
                  return (
                    <div className="timings" key={index}>
                      <p>Open: {open}</p>
                      <p>Close: {close}</p>
                    </div>
                  );
                })}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default StoresList;
