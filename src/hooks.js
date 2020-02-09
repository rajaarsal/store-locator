import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Context = React.createContext();
const Provider = props => {
  const [selectCountryList, setSelectCountryList] = useState([]);
  const [selectCitiesList, setSelectCitiesList] = useState([]);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [selectDefaultVal, setSelectDefaultVal] = useState({
    selectCountry: "selectCountry",
    selectCity: ""
  });
  const history = useHistory();
  const url = "https://store-locator-api.allsaints.com/locations";
  const getCountriesData = async () => {
    const fetchCountriesList = await fetch(url);
    const response = await fetchCountriesList.json();
    setSelectCountryList(response);
  };

  const onChangeHandler = async e => {
    const { name, value } = e.target;
    setSelectDefaultVal({ ...selectDefaultVal, [name]: value });
    setIsCountrySelected(true);
    if (name === "selectCountry") {
      setSelectDefaultVal({
        ...selectDefaultVal,
        selectCity: "",
        selectCountry: value
      });
      const fetchCitiesList = await fetch(`${url}/${value}`);
      const response = await fetchCitiesList.json();
      setSelectCitiesList(response);
    }
  };
  const findStoreClickHandler = async () => {
    const { selectCountry, selectCity } = selectDefaultVal;
    if (selectCity !== "") {
      history.push(`shop/${selectCountry}/${selectCity}`);
    } else {
      history.push(`shop/${selectCountry}`);
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  const combineReucer = {
    selectCountryList,
    selectCitiesList,
    isCountrySelected,
    selectDefaultVal,
    onChangeHandler,
    findStoreClickHandler
  };
  return (
    <>
      <Context.Provider value={combineReucer}>
        {props.children}
      </Context.Provider>
    </>
  );
};

export { Provider, Context };
