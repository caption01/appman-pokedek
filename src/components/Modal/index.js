import React from "react";
import { Modal as ModalAntd, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledModal = styled(ModalAntd)`
  .ant-modal-header {
    padding: 12px;
  }
`;

const suffix = (onClick) => (
  <SearchOutlined
    style={{
      fontSize: 22,
      color: "#ec5656",
    }}
    onClick={() => onClick()}
  />
);

const Modal = ({
  visible,
  children,
  query,
  onChange,
  onClick,
  onCancel,
  loading,
}) => {
  return (
    <>
      <StyledModal
        visible={visible}
        title={
          <Input
            placeholder="Find pokemon"
            suffix={suffix(onClick)}
            onPressEnter={onClick}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={query}
          />
        }
        closable={false}
        mask
        maskClosable
        header
        bodyStyle={{ maxHeight: 500, overflow: "scroll", padding: 12 }}
        footer={null}
        width={700}
        onCancel={() => onCancel()}
      >
        {loading ? <Spin /> : <>{children}</>}
      </StyledModal>
    </>
  );
};

export default Modal;
