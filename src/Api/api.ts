import { message } from "antd";
import type { RcFile } from "antd/es/upload";
import axios from "axios";

import type { DashboardData } from "@Components/Dashboard";

export const getHealth = async () => {
  try {
    const response = await axios.get("/api/health");
    if (!response.data || response.status !== 200) {
      throw new Error("Invalid response from health check API");
    }
    return await response.data;
  } catch (error) {
    console.error("Error fetching health status:", error);
    throw error;
  }
};
export const analyzeRequest = async (
  cvFile: RcFile,
  jobDescription: string
): Promise<DashboardData | null> => {
  try {
    const formData = new FormData();
    formData.append("cv_file", cvFile);
    formData.append("job_description", jobDescription);

    const response = await axios.post<DashboardData>(
      "http://localhost:8000/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    message.success("Analysis completed successfully!");
    return response.data;
  } catch (error) {
    console.error("Error during analysis:", error);
    message.error("Analysis failed.");
    return null;
  }
};
