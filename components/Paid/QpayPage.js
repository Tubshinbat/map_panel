"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import PageNavItem from "components/Page/PagenavItem";
import { convertFromdata } from "lib/check";

//Hooks
import useQpayAccount from "hooks/useQpayAccount";
import base from "lib/base";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [deleteFile, setDeleteFile] = useState([]);

  const [whiteLogo, setWhiteLogo] = useState({});

  const { loadQpayAccount, updateQpayAccount, account, createQpayAccount } =
    useQpayAccount();

  useEffect(() => {
    if (account) {
      form.setFieldsValue({ ...account });
    }
  }, [account]);

  const handleAdd = async (values) => {
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    await updateQpayAccount(sendData);
  };

  // Functions

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Ерөнхий тохиргоо</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="card card-body page-nav-body py-3">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="d-sm-flex align-items-center justify-space-between">
                  <nav className="page-nav ">
                    <PageNavItem label="Банкны данснууд" link="/paid_type" />
                    <PageNavItem label="Qpay" link="/qpay" />
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <Form layout="vertical" form={form}>
            <div className="row">
              <div className="col-12">
                <div className="control-bottons">
                  <Button
                    key="submit"
                    htmlType="submit"
                    className="add-button"
                    onClick={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          handleAdd(values);
                        })
                        .catch((info) => {
                          // console.log(info);
                        });
                    }}
                  >
                    Хадгалах
                  </Button>
                </div>

                <div className="card card-primary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <Form.Item
                          label="Qpay хэрэглэгчийн нэр"
                          name="username"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Input placeholder="Qpay хэрэглэгчийн нэр оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          label="Qpay нууц үг"
                          name="password"
                          hasFeedback
                        >
                          <Input placeholder="Qpay нууц үгээ оруулна уу" />
                        </Form.Item>
                      </div>
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
