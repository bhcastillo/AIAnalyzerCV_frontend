import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload as UploadAntd } from "antd";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import React from "react";
import type { CSSProperties } from "styled-components";

export const Upload: React.FC<{
  style: CSSProperties;
  setCvFile: (file: RcFile | null) => void;
}> = ({ style, setCvFile }) => {
  const handleOnChange = ({ file }: UploadChangeParam<UploadFile>) => {
    if (file.status === "done" && file.originFileObj) {
      const uploadedFile = file.originFileObj;

      setCvFile(uploadedFile);
      return;
    }
    if (file.status === "error") {
      console.error(`${file.name} file upload failed.`);
    }
  };
  const handleOnRemove = () => {
    setCvFile(null);
  };

  return (
    <UploadAntd
      style={style}
      accept=".pdf"
      maxCount={1}
      name="cv_file"
      onChange={handleOnChange}
      onRemove={handleOnRemove}
      showUploadList={{ showRemoveIcon: true }}
      customRequest={({ onSuccess }) => {
        setTimeout(() => onSuccess && onSuccess("ok"), 0);
      }}
      itemRender={(_, file, __, actions) => {
        return (
          <div
            style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}
          >
            <span style={{ color: "green" }}>{file.name} </span>
            <DeleteOutlined
              onClick={actions.remove}
              style={{ color: "red", fontSize: 18, marginLeft: 8 }}
            />
          </div>
        );
      }}
    >
      <Button
        type="primary"
        className="custom-upload-button"
        icon={<UploadOutlined />}
        style={{
          color: "var(--color-secondary)",
          backgroundColor: "var(--color-primary)",
          borderColor: "#0c473c",
        }}
      >
        Upload
      </Button>
    </UploadAntd>
  );
};
