import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const StoreDetails = () => {
  const params = useParams();
  const { storeId } = params;
  const [storeDetails, setStoreDetails] = useState([]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      const url = `https://store-locator-api.allsaints.com/shops/${storeId}`;
      const storesData = await fetch(url);
      const response = await storesData.json();
      setStoreDetails(response);
    };
    fetchStoreDetails();
  }, [storeId]);
  const { opening_hours: openingHours } = storeDetails;
  if (storeDetails.length === 0) {
    return <div className="loadingOverlay" />;
  }
  return (
    storeDetails && (
      <div className="storeDetail">
        <div className="storeDetail_info">
          <h1>{storeDetails.name}</h1>
          <p>{storeDetails.address_line1}</p>
          <p>{storeDetails.address_line2}</p>
          <p>{storeDetails.address_line3}</p>
          <p>{storeDetails.phone_number}</p>
        </div>
        <div className="storeDetail_openingHours">
          <h1>Opening Hours</h1>
          {openingHours &&
            Object.entries(openingHours).map(([key, value], index) => {
              return (
                <div key={key} className="storeDetail_openingHours-times">
                  <p className="days">{key}</p>
                  {value.map((item, i) => {
                    const { open, close } = item;
                    return (
                      <span
                        key={i}
                        className="time"
                      >{`${open} - ${close}`}</span>
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
