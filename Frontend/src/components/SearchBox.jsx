import { useState } from "react";
import "./SearchBox.css";

function SearchBox({ onGenerate }) {
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("India");
  const [reportType, setReportType] = useState("Market Research");

  const handleSubmit = () => {
    onGenerate({
      industry,
      country,
      reportType,
    });
  };

  return (
    <div className="search-container">
      <h2>🔍 Market Intelligence Search</h2>

      <div className="form-group">
        <label>Industry</label>

        <input
          type="text"
          placeholder="Example: Electric Vehicles"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Country</label>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>India</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Germany</option>
          <option>Japan</option>
        </select>
      </div>

      <div className="form-group">
        <label>Report Type</label>

        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option>Market Research</option>
          <option>Competitor Analysis</option>
          <option>SWOT Analysis</option>
          <option>Industry Trends</option>
        </select>
      </div>

      <button
        className="generate-btn"
        onClick={handleSubmit}
      >
        ⚡ Generate AI Report
      </button>
    </div>
  );
}

export default SearchBox;