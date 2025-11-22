import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";


function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [price_trend, setPt] = useState([]);
  const [demandTrend, setDemand] = useState([]);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);


  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/analyze/?area=" + query);
      const result = await response.json();

      if (result.error) {
        // Reset UI
        setSummary("");
        setPt([]);
        setDemand([]);
        setError(result.error);
        setTableData([]);
        return;
      }

      // Clear error
      setError("");
      setSummary(result.summary);
      setPt(result.price_trend);
      setDemand(result.demand_trend);
      setTableData(result.table);

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSummary("");
      setPt([]);
      setDemand([]);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Real Estate Analysis</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location (e.g., Aundh)"
      />
      <button onClick={handleAnalyze}>Analyze</button>

      {error.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {error}
        </div>
      )}


      {summary && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}


      {price_trend.length > 0 && (
        <div className="mt-4">
          <h4>Price Trend</h4>
          <LineChart
            width={600}
            height={300}
            data={price_trend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => (value / 10000000).toFixed(1) + " Cr"} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_sales - igr" stroke="#8884d8" />
          </LineChart>
        </div>
      )}


      {demandTrend.length > 0 && (
        <div className="mt-4">
          <h4>Demand Trend</h4>

          <LineChart
            width={600}
            height={300}
            data={demandTrend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total sold - igr" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}

      {tableData.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h4>Data Table</h4>
          <table
            style={{
              width: "90%",
              borderCollapse: "collapse",
              marginTop: "10px",
              background: "#1e1e1e",
              color: "white",
            }}
          >
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      border: "1px solid #555",
                      padding: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} style={{ border: "1px solid #555", padding: "8px" }}>
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



    </div>
  );
}

export default App;
