"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Switch, message } from "antd";
import { useRouter } from "next/navigation";
// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";
import usePlan from "hooks/usePlan";

// Hooks
import { convertFromdata } from "lib/check";
import { useNotificationContext } from "context/notificationContext";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { updatePlan, getPlan, singlePlan } = usePlan();

  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
  });

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getPlan(slug);
    };

    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (singlePlan) {
      form.setFieldsValue({
        ...singlePlan,
      });

      setCheckedRadio(() => ({
        status: singlePlan.status,
      }));
    }
  }, [singlePlan]);

  // Handle functions

  const handleAdd = async (values) => {
    const data = {
      ...values,
      status: checkedRadio.status || true,
    };

    const sendData = convertFromdata(data);
    const result = await updatePlan(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/plans");
      }, 600);
  };

  const handleBack = () => {
    router.back();
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
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
              <h1>Багц шинчлэх</h1>
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
                        label="Багц"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Багцын нэрийг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Идэвхтэй байх сар"
                        name="activeMonth"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <InputNumber
                          placeholder="Хэдэн сар идэвхтэй байхыг оруулна уу"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Үнэ"
                        name="price"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <InputNumber
                          placeholder="Үнийн мэдээллийг оруулна уу"
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
