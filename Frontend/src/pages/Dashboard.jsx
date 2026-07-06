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

  const AI_STEPS = [
  { progress: 20, step: "⚡ Initializing AI Engine..." },
  { progress: 40, step: "📊 Reading Industry Reports..." },
  { progress: 60, step: "🏆 Finding Competitors..." },
  { progress: 80, step: "📰 Collecting Market News..." },
  { progress: 100, step: "📝 Preparing Final Report..." },
];

  const handleGenerate = (data) => {

    setIndustry(data.industry);
setCountry(data.country);
setReportType(data.reportType);
  console.log(data);

  api.get(`/generate-report?topic=${data.industry}`)
  .then((response) => {
    console.log(response.data);
    setReport(response.data.report);
  })
  .catch((error) => {
    console.error(error);
  });

  setLoading(true);

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