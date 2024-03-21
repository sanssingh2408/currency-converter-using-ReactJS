import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const[Amount, setAmount]=useState(0);
  const[Rates, setRates]=useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const[FromRates, setFromRates]=useState("USD");
  const[ToRates, setToRates]=useState("USD");
  const [output, setOutput] = useState();
  useEffect(()=>{
    apicall();
  },[]);

  function getamount(e)
  {
    setAmount(e.target.value);
  }

  async function apicall()
  {
    const apiurl=`https://v6.exchangerate-api.com/v6/ed9be21bf92f41ae265ffaaf/latest/USD`;
    fetch(apiurl) //1
  .then((response) => response.json()) //2
  .then((data) => {
    if(data.result=="success")
    {
      setRates(data.conversion_rates);
      setRatesFetched(true)
    }
  });
  }
  function fromCurrency(event)
  {
    setFromRates(event.target.value);
  }
  function toCurrency(event)
  {
    setToRates(event.target.value);
  }
  const calculateOutput = async () => {
    const result=document.getElementById("result");
    // fetch the selected from currency rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/ed9be21bf92f41ae265ffaaf/latest/${FromRates}`
    ).then((response) => response.json());
    const fetchedRates = response.conversion_rates;
    const CurrencyRate = fetchedRates[ToRates];
    const output = Amount * CurrencyRate;
    setOutput(output);
    result.style.display="block";
    console.log(output);
  };
  return (
    <>
    <div className='bg'>
    <div className='container'>
      <img src="src/assets/logo.png" alt="logo" />
    <div className='converter'>
      <h1 className='title'>Currency Converter Form</h1>
      <label>Amount</label>
    <input type="number"  onChange={getamount}/>
    <label>From Currency</label>
    <select name="fromCurrency" id="fromCurrency" onChange={fromCurrency}>
    {ratesFetched ? (
          Object.keys(Rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>USD</option>
        )}
    </select>
    <label>To Currency</label>
    <select name="toCurrency" id="toCurrency" onChange={toCurrency}>
    {ratesFetched ? (
          Object.keys(Rates).map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))
        ) : (
          <option defaultValue>INR</option>
        )}
    </select>
    <button onClick={calculateOutput}>Done</button>
    <p id='result'>Output: {output}</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default App
