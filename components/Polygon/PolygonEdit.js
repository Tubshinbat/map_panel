"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";

// Hooks
import usePlace from "hooks/usePlace";
import { useNotificationContext } from "context/notificationContext";

// Lib
import usePolygon from "hooks/usePolygon";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { updatePolygon, getPolygon, polygon } = usePolygon();

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getPolygon(slug);
    };

    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (polygon) {
      const { name, code, area_m2, au1_code, au2_code } = polygon.properties;
      delete polygon.properties;

      form.setFieldsValue({
        name,
        code,
        area_m2,
        au1_code,
        au2_code,
      });
    }
  }, [polygon]);

  // Handle functions

  const handleEdit = async (values) => {
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    const result = await updatePolygon(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/polygon");
      }, 600);
  };

  const handleBack = () => {
    router.back();
  };

  const clear = () => {
    form.resetFields();
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Полигон мэдээлэл засах</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="content">
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
                        label="Полигон нэр"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Полигон нэр оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Эзлэх м2"
                        name="area_m2"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="Эзлэх м2 оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        label="Code"
                        name="code"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="code оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        label="Au1 code"
                        name="au1_code"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="au1_code оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-4">
                      <Form.Item
                        label="Au2 code"
                        name="au2_code"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="au2_code оруулна уу" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">Тохиргоо</h6>
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
                          .then((values) => handleEdit(values))
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
    </>
  );
};

export default Page;
