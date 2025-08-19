import { Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { RcFile } from "antd/es/upload";
import { useState } from "react";

import { analyzeRequest } from "@Api/api";
import { Upload } from "@Components/Upload";

import { Dashboard, type DashboardData } from "./Components/Dashboard";

export const App = () => {
  const [displayInput, setDisplayInput] = useState(true);
  const [cvFile, setCvFile] = useState<RcFile | null>(null);
  const [jobDescription, setVacancy] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const startProgress = () => {
    Array.from({ length: 24 }).forEach((_, index) => {
      setTimeout(() => {
        setPercentage((prev) => prev + 4);
      }, index * 1000);
    });
  };

  const handleOnClick = async () => {
    if (!cvFile) {
      message.error("Please upload a cv first.");
      return;
    }
    if (!jobDescription) {
      message.error("Please enter a job description.");
      return;
    }

    if (displayInput) {
      setLoading(true);
      setPercentage(0);
      startProgress();

      try {
        const dashboardData = await analyzeRequest(cvFile, jobDescription);
        setData(dashboardData);
        setPercentage(100);
      } catch (error) {
        console.error(error);
        message.error("Error analyzing the CV.");
      } finally {
        setLoading(false);
      }
    } else {
      setData(null);
      setPercentage(0);
    }
    setDisplayInput((prev) => !prev);
  };

  return (
    <div className="app">
      <h1 className="title">
        AI Analyzer <span>CV</span>
      </h1>
      <div className={`transition-wrapper ${displayInput ? "show" : "hide"}`}>
        <TextArea
          style={{ width: 700, height: 200 }}
          value={jobDescription}
          onChange={(e) => setVacancy(e.target.value)}
          placeholder="job description here"
          rows={4}
        />
        <div style={{ minHeight: 75 }}>
          <Upload
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
            }}
            setCvFile={setCvFile}
          />
        </div>
      </div>

      <Button
        type="primary"
        className="analyze-button"
        style={{ color: "var(--color-secondary)" }}
        onClick={handleOnClick}
        disabled={loading || !cvFile || !jobDescription}
      >
        {displayInput ? "Analyze" : "New Analysis"}
      </Button>
      {loading && percentage > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <p>Analyzing...</p>
          <progress value={percentage} max="100" />
        </div>
      )}
      {data && <Dashboard data={data} />}
    </div>
  );
};
