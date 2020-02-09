import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StoreDetails = () => {
  const params = useParams();
  const { storeId } = params;
  const [storeDetails, setStoreDetails] = useState([]);
  const fetchStoreDetails = async () => {
    const url = `https://store-locator-api.allsaints.com/shops/${storeId}`;
    const fetchCountryStores = await fetch(url);
    const response = await fetchCountryStores.json();
    setStoreDetails(response);
  };

  useEffect(() => {
    fetchStoreDetails();
  }, [storeId]);
  const { opening_hours: openingHours } = storeDetails;
  if (storeDetails.length === 0) {
    return null;
  }
  return (
    storeDetails && (
      <div className="storeDetail">
        <h1>{storeDetails.name}</h1>
        <h4>Address</h4>
        <p>{storeDetails.address_line1}</p>
        <p>{storeDetails.address_line2}</p>
        <p>{storeDetails.address_line3}</p>
        <h4>Contact Number</h4>
        <p>{storeDetails.phone_number}</p>
        <h4>Opening Hours:</h4>
        <div className="openingHours">
          {openingHours &&
            Object.entries(openingHours).map(([key, value], index) => {
              return (
                <div key={key}>
                  <p className="days">{key}</p>
                  {value.map((item, i) => {
                    const { open, close } = item;
                    return (
                      <p key={i}>
                        Open: {open}
                        <br />
                        Close: {close}
                      </p>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    )
  );
};

export default StoreDetails;
