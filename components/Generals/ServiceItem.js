import { Button, Input } from "antd";
import IconPicker from "react-icons-picker";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { useState } from "react";

const ServiceItem = ({ service, icon, handleDelete }) => {
  const [isAdd, setIsAdd] = useState(true);
  const [elements, setElements] = useState([]);

  return (
    <div className="service-item ">
      <i className={icon}></i>
      {service}

      <i
        className="fa-regular fa-trash-can element-trash-btn"
        onClick={handleDelete}
      ></i>
    </div>
  );
};

export default ServiceItem;
