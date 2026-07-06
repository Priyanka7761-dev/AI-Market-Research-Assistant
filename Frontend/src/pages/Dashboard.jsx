import { useState, useEffect} from "react";

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
  const AI_STEPS = [
  { progress: 20, step: "⚡ Initializing AI Engine..." },
  { progress: 40, step: "📊 Reading Industry Reports..." },
  { progress: 60, step: "🏆 Finding Competitors..." },
  { progress: 80, step: "📰 Collecting Market News..." },
  { progress: 100, step: "📝 Preparing Final Report..." },
];

  const handleGenerate = (data) => {
  console.log(data);

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

      {showReport && <ReportViewer />}
    </>
  );
}

export default Dashboard;