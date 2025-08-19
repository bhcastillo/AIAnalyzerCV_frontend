import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import type { FC } from "react";

import { CardDashboard, type CardDashboardProps } from "./CardDashboard";
import { ProgressDashboard } from "./ProgressDashboard";

export interface DashboardData {
  summary_assessment: string;
  technical_fit: {
    core_technologies: string[];
    fit_score: number;
  };
  resume_improvements: string[];
  areas_to_improve: string[];
  overall_score: number;
}
export interface DashboardProps {
  data: DashboardData;
}

export const Dashboard: FC<DashboardProps> = ({ data }) => {
  const leftCardsDashboard: CardDashboardProps[] = [
    {
      title: "Resume Improvements",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      contents: data.resume_improvements,
    },
    {
      title: "Areas to Improve",
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      contents: data.areas_to_improve,
    },
  ];

  const rightCardsDashboard: CardDashboardProps[] = [
    {
      title: "Summary Assessment",
      content: data.summary_assessment,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "1rem",
          alignSelf: "center",
        }}
      >
        {/* <ProgressDashboard
          percentage={data.technical_fit.fit_score}
          title={"Technical Fit"}
        /> */}
        <ProgressDashboard percentage={data.overall_score} title={"Overall"} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "95%",
          alignSelf: "center",
          padding: "10px",
          gap: "40px",
          marginTop: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          {leftCardsDashboard.map((card, index) => (
            <CardDashboard key={index} {...card} />
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {rightCardsDashboard.map((card, index) => (
            <CardDashboard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};
