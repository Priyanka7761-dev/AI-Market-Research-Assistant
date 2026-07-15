import { useState, useEffect} from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";
import ReportViewer from "../components/ReportViewer";

function Dashboard() {

  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const [step, setStep] = useState("");

  const [showReport, setShowReport] = useState(false);

  const [report, setReport] = useState("");

  const [industry, setIndustry] = useState("");

const [country, setCountry] = useState("");

const [reportType, setReportType] = useState("");

const [errorMessage, setErrorMessage] = useState("");

  const AI_STEPS = [
  { progress: 20, step: "⚡ Initializing AI Engine..." },
  { progress: 40, step: "📊 Reading Industry Reports..." },
  { progress: 60, step: "🏆 Finding Competitors..." },
  { progress: 80, step: "📰 Collecting Market News..." },
  { progress: 100, step: "📝 Preparing Final Report..." },
];

  const handleGenerate = (data) => {

    setShowReport(false);
setReport("");
setLoading(true);
setErrorMessage("");

    setIndustry(data.industry);
setCountry(data.country);
setReportType(data.reportType);
  console.log(data);

  api.get(`/generate-report?topic=${data.industry}`)
  .then((response) => {

    console.log(response.data);

    if (response.data.success) {

        setReport(response.data.report);

    } else {

        setErrorMessage(response.data.message);

        setLoading(false);

        setShowReport(false);

    }

})
  .catch((error) => {
    console.error(error);
  });

};

useEffect(() => {

  if (!loading) return;

  let index = 0;

  const interval = setInterval(() => {

    if (index < AI_STEPS.length) {

      setProgress(AI_STEPS[index].progress);
      setStep(AI_STEPS[index].step);

      index++;

    } else {

  clearInterval(interval);

  setTimeout(() => {

    setLoading(false);

    setShowReport(true);

  }, 1000);

}

  }, 1200);

  return () => clearInterval(interval);

}, [loading]);

  return (
    <>
      <Navbar />

      <Hero />

      <SearchBox onGenerate={handleGenerate}/>

      {loading && (
  <Loader
    progress={progress}
    step={step}
  />
)}

{errorMessage && (
  <div
    style={{
      width: "80%",
      margin: "30px auto",
      padding: "20px",
      background: "#ff4d4f",
      color: "white",
      borderRadius: "12px",
      textAlign: "center",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    {errorMessage}
  </div>
)}


      {showReport && (
  <ReportViewer
    report={report}
    industry={industry}
    country={country}
    reportType={reportType}
  />
)}
    </>
  );
}

export default Dashboard;