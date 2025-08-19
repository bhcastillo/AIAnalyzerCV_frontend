import { Card, List } from "antd";
import type { FC } from "react";

export interface CardDashboardProps {
  title: string;
  icon?: React.ReactNode;
  content?: string;
  contents?: string[];
}

export const CardDashboard: FC<CardDashboardProps> = ({
  title,
  icon,
  content,
  contents,
}) => (
  <Card
    style={{
      color: "red",
      backgroundColor: "var(--color-secondary)",
      marginTop: "1rem",
    }}
    variant="borderless"
  >
    <div className="title" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      {title}
    </div>

    {content && <p>{content}</p>}
    {contents && (
      <List
        itemLayout="horizontal"
        dataSource={contents}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              description={
                <span style={{ color: "var(--color-white)", fontSize: "1rem" }}>
                  {icon} {item}
                </span>
              }
            />
          </List.Item>
        )}
      />
    )}
  </Card>
);
