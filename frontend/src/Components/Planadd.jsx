import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Planadd.css';

export const Planadd = () => {
  const [symbol, setsymbol] = useState([]);
  const [newsymbol, setnewsymbol] = useState([]);
  const [query, setquery] = useState();
  const [select, setselect] = useState(false);
  const [inputCountentry, setInputCountentry] = useState(1);
  const [inputValuesentry, setInputValuesentry] = useState(['']);
  const [inputCountexit, setInputCountexit] = useState(1);
  const [inputValuesexit, setInputValuesexit] = useState(['']);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('https://api.twelvedata.com/stocks');
      setsymbol(res.data.data);
      if (query.length !== 0) {
        const regex = new RegExp(query, 'i');
        const filtered = res.data.data.filter((symbol) =>
          regex.test(symbol.name)
        );
        setnewsymbol(filtered);
      } else {
        setnewsymbol(res.data.data);
      }
    };
    fetch();
  }, []);
  const handleAddInputentry = () => {
    setInputCountentry(inputCountentry + 1);
    setInputValuesentry([...inputValuesentry, '']);
  };
  const handleAddInputexit = () => {
    setInputCountexit(inputCountexit + 1);
    setInputValuesexit([...inputValuesexit, '']);
  };

  const handleInputChangeentry = (event, index) => {
    const newInputValuesentry = [...inputValuesentry];
    newInputValuesentry[index] = event.target.value;
    setInputValuesentry(newInputValuesentry);
  };
  const handleInputChangeexit = (event, index) => {
    const newInputValuesexit = [...inputValuesexit];
    newInputValuesexit[index] = event.target.value;
    setInputValuesexit(newInputValuesexit);
  };

  const renderInputsentry = () => {
    const inputs = [];
    for (let i = 0; i < inputCountentry; i++) {
      inputs.push(
        <label key={i}>
          {i + 1}:
          <input
            type="text"
            value={inputValuesentry[i]}
            onChange={(event) => handleInputChangeentry(event, i)}
            required
          />
        </label>
      );
    }
    return inputs;
  };
  const renderInputsexit = () => {
    const inputs = [];
    for (let i = 0; i < inputCountexit; i++) {
      inputs.push(
        <label key={i}>
          {i + 1}:
          <input
            type="text"
            value={inputValuesexit[i]}
            onChange={(event) => handleInputChangeexit(event, i)}
            required
          />
        </label>
      );
    }
    return inputs;
  };

  return (
    <>
      <form>
        <label>Direction</label>
        <select>
          <option>Long</option>
          <option>Short</option>
        </select>
        <label>Symbol</label>

        <input
          placeholder="search symbol here"
          onChange={(e) => {
            if (e.target.value.length !== 0) {
              const regex = new RegExp(e.target.value, 'i');
              const filtered = symbol.filter((symbol) =>
                regex.test(symbol.name)
              );
              setnewsymbol(filtered);
            }
            setselect(true);
            setquery(e.target.value);
          }}
        />
        <div
          className={
            select === true
              ? 'planadd_form_symbol_option_map_div'
              : 'planadd_form_syambole_option_map_div_none'
          }
        >
          {newsymbol.slice(0, 20).map((y, k1) => (
            <option key={k1}>
              {y.name}({y.symbol})
            </option>
          ))}
        </div>
        <label>Entry</label>
        <form>
          {renderInputsentry()}
          <button onClick={handleAddInputentry}>Add input field</button>
        </form>
        <label>SL</label>
        <form>
          {renderInputsexit()}
          <button onClick={handleAddInputexit}>Add input field</button>
        </form>
        <button>Submit</button>
      </form>
    </>
  );
};
