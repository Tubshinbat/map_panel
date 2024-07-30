"use client";
import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Tree,
  Upload,
  message,
} from "antd";

import { Editor } from "@tinymce/tinymce-react";
import { slugify } from "transliteration";

// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

// Hooks
import usePlace from "hooks/usePlace";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { buildFileInput, deleteImage, uploadImage } from "lib/files";
import ImageDrag from "components/Generals/ImageDrag";
import useRate from "hooks/useRate";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";
import TextArea from "antd/es/input/TextArea";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { createRate } = useRate();
  const [pictures, setPictures] = useState([]);
  const [deletePictures, setDeletePictures] = useState([]);
  const [placeDatas, setPlaces] = useState([]);
  const [gData, setGData] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: false,
    star: false,
  });
  const { places, loadPlace } = usePlace();
  const [checkedKeys, setCheckedKeys] = useState([]);

  // Config init

  useEffect(() => {
    return () => clear();
  }, []);

  useEffect(() => {
    if (places) {
      setPlaces(() => places.map((el) => ({ value: el._id, label: el.name })));
    }
  }, [places]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleAdd = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);

    if (Array.isArray(deletePictures) && deletePictures.length > 0) {
      deletePictures.map(async (img) => await deleteImage(img));
    }

    const data = {
      ...values,
      status: checkedRadio.status || false,
    };

    const sendData = convertFromdata(data);
    const result = await createRate(sendData);
    if (result)
      setTimeout(() => {
        router.push("/rates");
      }, 600);
  };

  const handleBack = () => {
    deletePictures.map(async (el) => await deleteImage(el));
    pictures.map(async (el) => await deleteImage(el.name));
    router.back();
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
  };

  const clear = () => {
    form.resetFields();
    setPictures([]);
    setCheckedKeys([]);
    setGData([]);
    deletePictures.map(async (el) => await deleteImage(el));
    pictures.map(async (el) => await deleteImage(el.name));
  };

  const handleSearch = async (input, option) => {
    await loadPlace(`name=${input}`);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Үнэлгээ нэмэх</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid">
        <Form layout="vertical" className="custom-form" form={form}>
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">Агуулга</h6>
                </div>
                <div className=" card-body py-3">
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Item
                        label="Газар"
                        name="place"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          showSearch
                          placeholder="Газруудаас сонгонго уу"
                          filterOption={false}
                          onSearch={handleSearch}
                          options={placeDatas}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Сэтгэгдэл"
                        name="comment"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <TextArea />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <Form.Item
                        label="Үнэлгээ"
                        name="rate"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <InputNumber
                          placeholder="Үнэлгээ өгнө үү"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">
                    Зураг оруулах
                  </h6>
                </div>
                <div className="card-body p-3">
                  <ImageDrag
                    pictures={pictures}
                    setPictures={setPictures}
                    deletePictures={deletePictures}
                    setDeletePictures={setDeletePictures}
                  />
                </div>
              </div>
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">Тохиргоо</h6>
                </div>
                <div className="card-body py-3 px-4">
                  <Form.Item
                    label="Идэвхтэй эсэх"
                    className="dark-input switch-input"
                    name="status"
                  >
                    <Switch
                      size="small"
                      defaultChecked
                      checked={checkedRadio.status}
                      onChange={(checked) => handleRadio(checked, "status")}
                    />
                  </Form.Item>
                </div>
                <div className="p-3 border-top">
                  <div className="text-end">
                    <Button
                      key="submit"
                      htmlType="submit"
                      className="btn btn-primary custom-btn"
                      loading={contentLoad}
                      onClick={() => {
                        form
                          .validateFields()
                          .then((values) => handleAdd(values))
                          .catch((error) => message.error(error));
                      }}
                    >
                      Хадгалах
                    </Button>
                    <Button
                      className="btn bg-danger-subtle text-danger  custom-btn"
                      onClick={() => handleBack()}
                    >
                      Буцах
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default Page;
