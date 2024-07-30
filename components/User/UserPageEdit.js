"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
} from "antd";
import { useRouter } from "next/navigation";
// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

// Hooks
import { convertFromdata } from "lib/check";
import { useNotificationContext } from "context/notificationContext";
import useUser from "hooks/useUser";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { updateUser, getUser, user } = useUser();

  const [checkedRadio, setCheckedRadio] = useState({
    status: false,
  });

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getUser(slug);
    };

    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [user]);

  // Handle functions

  const handleAdd = async (values) => {
    const data = {
      ...values,
      status: checkedRadio.status || false,
    };

    const sendData = convertFromdata(data);

    const result = await updateUser(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/users");
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
              <h1>Гишүүний мэдээлэл шинчлэх</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid">
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
                        label="Эрх"
                        name="role"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          placeholder="Эрх сонгоно уу"
                          options={[
                            { value: "user", label: "Хэрэглэгч" },
                            { value: "operator", label: "Оператор" },
                            { value: "admin", label: "Админ" },
                          ]}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Хүйс"
                        name="gender"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          placeholder="Хүйс сонгоно уу"
                          options={[
                            { value: "male", label: "Эрэгтэй" },
                            { value: "female", label: "Эмэгтэй" },
                            { value: "other", label: "Бусад" },
                          ]}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Эцэг, эхийн нэр"
                        name="lastName"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input
                          placeholder="Эцэг эхийнхээ нэрийг оруулна уу"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Өөрийн нэр"
                        name="firstName"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Өөрийн нэрийг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        name="email"
                        label="Имэйл хаяг"
                        className="dark-input"
                        hasFeedback
                        rules={[
                          requiredRule,
                          {
                            type: "email",
                            message: "Имэйл хаяг буруу байна!",
                          },
                        ]}
                      >
                        <Input placeholder="Имэйл хаягаа оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        name="phoneNumber"
                        label="Утасны дугаар"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <InputNumber
                          placeholder="Утасны дугаараа оруулна уу"
                          style={{ width: "100%", height: "45px" }}
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
      </div>
    </>
  );
};

export default Page;
