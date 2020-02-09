import React, { useContext } from "react";
import { Context } from "./hooks";

const Home = () => {
  const data = useContext(Context);
  const {
    selectCountryList,
    isCountrySelected,
    selectDefaultVal,
    selectCitiesList,
    onChangeHandler,
    findStoreClickHandler
  } = data;
  const { selectCountry, selectCity } = selectDefaultVal;
  const { cities } = selectCitiesList;
  return (
    <>
      <h1>Find your nearest store</h1>
      <select
        value={selectCountry}
        onChange={onChangeHandler}
        name="selectCountry"
      >
        <option value="selectCountry" disabled>
          Select Country
        </option>
        {selectCountryList &&
          selectCountryList.map((country, i) => (
            <option value={country.slug} key={i}>
              {country.country}
            </option>
          ))}
      </select>
      <select
        value={selectCity}
        onChange={onChangeHandler}
        disabled={!isCountrySelected}
        name="selectCity"
      >
        <option value="">Select City</option>
        {cities &&
          cities.map((city, i) => (
            <option value={city.slug} key={i}>
              {city.name}
            </option>
          ))}
      </select>
      <button
        onClick={findStoreClickHandler}
        disabled={!isCountrySelected}
        className="findStoreBtn"
      >
        Find Store
      </button>
    </>
  );
};

export default Home;
