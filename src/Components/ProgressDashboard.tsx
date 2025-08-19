import { Progress } from "antd";
import type { FC } from "react";
import type { CSSProperties } from "styled-components";

export interface ProgressDashboardProps {
  percentage: number;
  title: string;
  style?: CSSProperties;
}
export const ProgressDashboard: FC<ProgressDashboardProps> = ({
  percentage,
  title,
  style,
}) => (
  <Progress
    style={style}
    type="dashboard"
    percent={percentage}
    trailColor="#eee"
    format={(percent) => (
      <>
        <p style={{ fontSize: 36, color: "#eee" }}>{`${percent}%`}</p>
        <p style={{ fontSize: 16, color: "#aaa" }}>{title}</p>
      </>
    )}
  />
);
