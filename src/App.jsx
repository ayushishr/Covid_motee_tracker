// import { useState } from 'react'
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { useState } from "react";
import "./App.css";
import MapChart from "./components/MapChart";
import "../node_modules/leaflet/dist/leaflet.css";

function App() {
  const [country, setCountry] = useState("global");
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([40, 34]);

  async function handleCountryChange(e) {
    setCountry(e.target.value);
    let url;
    if (e.target.value === "global") {
      setCenter([40, 34]);
      setZoom(2);
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(6);
        });
    }
  }

  return (
    <>
      {/* <h1>Hello</h1> */}
      <div className="app__flex">
        <MapChart center={center} zoom={zoom} />
      </div>
    </>
  );
}

export default App;
