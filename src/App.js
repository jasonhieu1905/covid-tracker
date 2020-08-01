import React, { useState, useEffect } from "react";
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          setCountries(countries);
        });
    };
    getCountries();
  }, []);

  const onCountryChange = event => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div class="app__left">
        <div class="app__header">
          <h1>Covid 19 tracker</h1>
          <FormControl className="app__header">
            <Select
              onChange={onCountryChange}
              variant="outlined"
              value={country}
            >
              <MenuItem value={country}>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div class="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={234}></InfoBox>
          <InfoBox title="Recovered" cases={123} total={234}></InfoBox>
          <InfoBox title="Deaths" cases={123} total={234}></InfoBox>
        </div>
      </div>

      <Card class="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
        </CardContent>
      </Card>
      {/* Table */}
      {/* Graph */}
      {/* Maps */}
    </div>
  );
}

export default App;
