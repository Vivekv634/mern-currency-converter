import { useEffect, useState } from "react";
import "./App.css";
import currencies from "./country";
import Select from "react-select";
import axios from "axios";

const API_KEY = '82ed90b1610d9b921739e28e'
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`;

function App() {
  const [inputValue, setInputValue] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState(0);

  useEffect(() => {
    getExchangeRates();
  }, [])

  useEffect(() => {
    getExchangeRates();
  }, [inputValue, baseCurrency, targetCurrency]);

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  function handleTargetCurrency(e) {
    setTargetCurrency(e.value);
  }

  function handleBaseCurrency(e) {
    setBaseCurrency(e.value);
  }

  function handleChange() {
    const temp = targetCurrency;
    setTargetCurrency(baseCurrency);
    setBaseCurrency(temp);
  }

  async function getExchangeRates() {
    const response = await axios.get(`${BASE_URL}/${baseCurrency}/${targetCurrency}/${inputValue}`);
    const result = response.data.conversion_result;
    setExchangeRates(result);
  }
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="input-form">
        <label>Enter Amount:</label>
        <input type="number" value={inputValue} onChange={handleInput} />
        <label>Base Currency:</label>
        <Select className="selection"
          options={currencies}
          onChange={handleBaseCurrency}
          value={currencies.find(curr => curr.value === baseCurrency)} />
        <div onClick={handleChange} className="exchange">⇵</div>
        <label>Target Currency:</label>
        <Select className="selection"
          options={currencies}
          onChange={handleTargetCurrency}
          value={currencies.find(curr => curr.value === targetCurrency)} />
        <div className="result">{inputValue} {baseCurrency} = {exchangeRates} {targetCurrency}</div>
      </div>
    </div>
  );
}

export default App;
