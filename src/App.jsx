import React, { useState, useEffect } from "react";
import "./App.css"; // optional CSS file for styling

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const locationOptions = ["", "Hyderabad", "Bengaluru", "Kolkata", "Mumbai", "Noida", "Pune"];
  const industryOptions = ["", "Consumer Goods","Conglomerate","Insurance","Banking","IT Services"];

  // Function to fetch companies based on filters
  const fetchCompanies = () => {
    let filters = {};
    if (searchText) filters.name = searchText;
    if (location) filters.location = location;
    if (industry) filters.industry = industry;
    console.log("Filters:", filters);

    setLoading(true);

    fetch(`https://companies-api-development-9aie.onrender.com/api/company?${new URLSearchParams(filters)}`)
      .then((res) => res.json())
      .then((data) => {
        
        setCompanies(data.companies || data); // handle backend format
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  };

  // Fetch companies initially on mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Companies API</h1>

      {/* Search & Filter Inputs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        />
        {/* Location Dropdown */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        >
          {locationOptions.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc === "" ? "Filter by location..." : loc}
            </option>
          ))}
        </select>

        {/* Industry Dropdown */}
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{ flex: "1", padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db" }}
        >
          {industryOptions.map((ind, idx) => (
            <option key={idx} value={ind}>
              {ind === "" ? "Filter by industry..." : ind}
            </option>
          ))}
        </select>
        <button
          onClick={fetchCompanies}
          style={{ padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#1E40AF", color: "#fff", cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading companies...</p>}

      {/* Companies Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {companies.map((c, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{c.name}</h3>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div>
                <p><strong>Location:</strong> {c.location}</p>
                <p><strong>Revenue:</strong> {c.revenue}</p>
                <p><strong>Industry:</strong> {c.industry}</p>
              </div>
              {c.logo && <img src={c.logo} alt={`${c.name} logo`} width="80" />}
            </div>
            <p style={{ marginBottom: "5px" }}>{c.description}</p>
            <p style={{ color: "#6B7280" }}>
              Established in {c.foundedYear}, serving over {c.employeeCount} employees
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
