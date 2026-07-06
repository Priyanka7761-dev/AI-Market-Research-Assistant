import "./ReportViewer.css";
import ReactMarkdown from "react-markdown";

function ReportViewer({ report }) {
  console.log("Report Received:", report);

  return (
    <div className="report-container">
      <h2>📄 AI Market Research Report</h2>

      <ReactMarkdown>{report}</ReactMarkdown>
    </div>
  );
}

export default ReportViewer;