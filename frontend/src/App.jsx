import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [price_trend, setPt] = useState([]);
  const [demandTrend, setDemand] = useState([]);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleAnalyze = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/analyze/?area=" + query
      );
      const result = await response.json();

      if (result.error) {
        setSummary("");
        setPt([]);
        setDemand([]);
        setTableData([]);
        setError(result.error);
        return;
      }

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
    <div className="container-fluid py-4 bg-dark text-light" style={{ minHeight: "100vh" }}>
      <h2 className="text-center mb-4 text-warning">Real Estate Analysis</h2>

      {/* Input + Button */}
      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control bg-secondary text-light"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter location (e.g., Aundh)"
        />
        <button className="btn btn-warning" onClick={handleAnalyze}>
          Analyze
        </button>
      </div>

      {/* Error */}
      {error.length > 0 && (
        <div className="alert alert-danger py-2">{error}</div>
      )}

      {/* Summary */}
      {summary && (
        <div className="card bg-secondary text-light mb-4">
          <div className="card-body">
            <h4 className="card-title text-warning">Summary</h4>
            <p className="card-text">{summary}</p>
          </div>
        </div>
      )}

      {/* Price Trend */}
      {price_trend.length > 0 && (
        <div className="mb-5">
          <h4 className="text-warning">Price Trend</h4>
          <LineChart
            width={700}
            height={300}
            data={price_trend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#555" />
            <XAxis tick={{ fill: "#fff" }} dataKey="year" />
            <YAxis
              tick={{ fill: "#fff" }}
              tickFormatter={(value) => (value / 10000000).toFixed(1) + " Cr"}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "1px solid #555" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
            <Line type="monotone" dataKey="total_sales - igr" stroke="#f1c40f" />
          </LineChart>
        </div>
      )}

      {/* Demand Trend */}
      {demandTrend.length > 0 && (
        <div className="mb-5">
          <h4 className="text-warning">Demand Trend</h4>
          <LineChart
            width={700}
            height={300}
            data={demandTrend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#555" />
            <XAxis tick={{ fill: "#fff" }} dataKey="year" />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "1px solid #555" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
            <Line type="monotone" dataKey="total sold - igr" stroke="#2ecc71" />
          </LineChart>
        </div>
      )}

      {/* Table */}
      {tableData.length > 0 && (
        <div className="mb-5">
          <h4 className="text-warning">Data Table</h4>

          <div className="table-responsive">
            <table className="table table-dark table-bordered table-striped mt-3">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key) => (
                    <th key={key} className="text-capitalize">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
