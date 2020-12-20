import React from "react";
import { Modal as ModalAntd, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const suffix = (onClick) => (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
    onClick={() => onClick()}
  />
);

const Modal = ({ visible, children, onChange, onClick }) => {
  const ModalHeader = () => (
    <Input
      placeholder="Basic usage"
      suffix={suffix(onClick)}
      onChange={(e) => onChange(e.target.value)}
    />
  );

  return (
    <>
      <ModalAntd
        visible={visible}
        title={<ModalHeader />}
        closable={false}
        mask
        maskClosable
        bodyStyle={{ maxHeight: 500, overflow: "scroll" }}
        footer={null}
        width={600}
      >
        {children}
      </ModalAntd>
    </>
  );
};

export default Modal;
