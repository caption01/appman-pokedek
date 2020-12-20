import React from "react";
import { Modal as ModalAntd } from "antd";

const Modal = ({ visible, handleOk, handleCancel, children }) => {
  return (
    <>
      <ModalAntd
        maskClosable
        footer={null}
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        bodyStyle={{ maxHeight: 500, overflow: "scroll" }}
      >
        {children}
      </ModalAntd>
    </>
  );
};

export default Modal;
