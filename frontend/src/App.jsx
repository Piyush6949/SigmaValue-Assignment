import { useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";


function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");

  const handleAnalyze = async () => {
    const response = await fetch("http://localhost:8000/api/analyze/?area=" + query);
    const result = await response.json();
    setSummary(result.summary);
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

      {summary && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
     


    </div>
  );
}

export default App;
