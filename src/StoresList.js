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
    const storesData = await fetch(url);
    const response = await storesData.json();
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
              <div className="storeNumber">{i + 1}</div>
              <div clasName="storeInfo">
                <h1>{store.name}</h1>
                <p>City: {store.city}</p>
                <p>
                  Opening Hours:
                  {openingHours.map((hours, index) => {
                    const { open, close } = hours;
                    return <span key={index}>{` ${open} - ${close}`}</span>;
                  })}
                </p>
                <Link
                  to={`/shop/store-detail-${store.uuid}`}
                  className="moreInfo"
                >
                  More Info
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default StoresList;
