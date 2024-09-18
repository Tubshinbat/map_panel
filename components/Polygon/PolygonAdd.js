"use client";
import { useEffect, useState } from "react";
import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// Hooks
import usePolygon from "hooks/usePolygon";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { deleteImage } from "lib/files";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const router = useRouter();

  const { contentLoad } = useNotificationContext();
  const [pictures, setPictures] = useState([]);

  const [deletePictures, setDeletePictures] = useState([]);
  const [gData, setGData] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
    isAddress: false,
  });
  const { createPolygon } = usePolygon();
  const [checkedKeys, setCheckedKeys] = useState([]);

  // Config init

  useEffect(() => {
    modalForm.setFieldsValue({ icon: "fas fa-sun" });
    return () => clear();
  }, []);

  // Handle functions

  const handleAdd = async (values) => {
    const fData = new FormData();

    fData.append("dbfFile", values.dbfFile.file.originFileObj);
    fData.append("shpFile", values.shpFile.file.originFileObj);

    const result = await createPolygon(fData);
    if (result)
      setTimeout(() => {
        router.push("/polygon");
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

  // -- TREE FUNCTIONS

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Полигон нэмэх</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <Form layout="vertical" className="custom-form" form={form}>
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="px-4 py-3 border-bottom">
                    <h6 className="card-title card-title-small mb-0">
                      Агуулга
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="px-4 py-3 border-bottom">
                        <h6 className="card-title card-title-small mb-0">
                          .shp өгөгдөлтэй файл
                        </h6>
                      </div>
                      <div class="card-body">
                        <Form.Item
                          label=" .shp өгөгдөлтэй файл"
                          name="shpFile"
                          className="dark-input"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Upload accept=".shp" name="shpFile" maxCount={1}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="px-4 py-3 border-bottom">
                        <h6 className="card-title card-title-small mb-0">
                          .dbf өгөгдөлтэй файл
                        </h6>
                      </div>
                      <div class="card-body">
                        <Form.Item
                          label=" .dbf өгөгдөлтэй файл"
                          name="dbfFile"
                          className="dark-input"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Upload accept=".dbf" name=".dbfFile" maxCount={1}>
                            <Button icon={<UploadOutlined />}>
                              Click to Upload
                            </Button>
                          </Upload>
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
                      Тохиргоо
                    </h6>
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
        </div>
      </section>
    </>
  );
};

export default Page;
