import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");

  const generateReport = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/generate-report?topic=${topic}`
      );

      setReport(response.data.report);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>AI Market Research Assistant</h1>

      <input
        type="text"
        placeholder="Enter Industry"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          marginRight: "10px"
        }}
      />

      <button onClick={generateReport}>
        Generate Report
      </button>

      <div
  style={{
    marginTop: "30px",
    textAlign: "left",
    maxWidth: "1000px",
    margin: "30px auto",
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px"
  }}
>
  <ReactMarkdown>
    {report}
  </ReactMarkdown>
</div>
    </div>
  );
}

export default App;