import { Modal } from "antd";

const ShowCategory = ({ visible, title, handleCancel }) => {
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={() => handleCancel()}
      footer={[
        <Button key="back" onClick={() => handleCancel()}>
          Буцах
        </Button>,
        <Button key="submit" htmlType="submit" type="primary">
          Хадгалах
        </Button>,
      ]}
    >
      {" "}
    </Modal>
  );
};

export default ShowCategory;
