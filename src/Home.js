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
      <h1>Store Locator</h1>
      <h4>Select Country</h4>
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
      <br />
      <h4>Select City</h4>
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
      <br />
      <br />
      <button onClick={findStoreClickHandler} disabled={!isCountrySelected}>
        Find Store
      </button>
    </>
  );
};

export default Home;
