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
import useOrder from "hooks/useOrder";

// Hooks
import { convertFromdata } from "lib/check";
import { useNotificationContext } from "context/notificationContext";
import usePlan from "hooks/usePlan";
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
  const { updateOrder, getOrder, order } = useOrder();

  const { loadPlan, plans } = usePlan();
  const { loadUser, users } = useUser();

  const [checkedRadio, setCheckedRadio] = useState({
    status: false,
  });
  const [planDatas, setPlans] = useState([]);
  const [userDatas, setUsers] = useState([]);

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getOrder(slug);
    };

    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (plans) {
      setPlans(() => plans.map((el) => ({ value: el._id, label: el.name })));
    }
  }, [plans]);

  useEffect(() => {
    if (users) {
      setUsers(() =>
        users.map((el) => ({ value: el._id, label: el.firstName }))
      );
    }
  }, [users]);

  useEffect(() => {
    if (order) {
      form.setFieldsValue({
        ...order,
        plan: order.plan._id,
        activedUser: order.activedUser._id,
      });

      setCheckedRadio(() => ({ status: order.status }));
    }
  }, [order]);

  // Handle functions

  const handleEdit = async (values) => {
    const data = {
      ...values,
      status: checkedRadio.status || false,
    };

    const sendData = convertFromdata(data);
    const result = await updateOrder(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/orders");
      }, 600);
  };

  const handleSearch = async (input) => {
    await loadPlan(`name=${input}`);
  };

  const handleUserSearch = async (input) => {
    await loadUser(`firstName=${input}`);
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
              <h1>Захиалга өөрчлөх</h1>
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
                        label="Багц"
                        name="plan"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          showSearch
                          placeholder="Багцуудаас сонгонго уу"
                          filterOption={false}
                          onSearch={handleSearch}
                          options={planDatas}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Төлбөрийн хэрэгсэл"
                        name="paid"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          placeholder="Төлбөрийн хэрэгсэл"
                          options={[
                            { value: "qpay", label: "Qpay" },
                            { value: "bank", label: "Шилжүүлсэн" },
                            { value: "trial", label: "Туршилтаар" },
                            {
                              value: "none",
                              label: "Төлбөрийн хэрэгсэл сонгоогүй",
                            },
                          ]}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Захиалга өгсөн"
                        name="activedUser"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          showSearch
                          placeholder="Хэрэглэгчээс сонгох"
                          filterOption={false}
                          onSearch={handleUserSearch}
                          options={userDatas}
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
                    label="Төлбөр төлсөн эсэх"
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
