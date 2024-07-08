"use client";
import { Button, Form, Input } from "antd";
import { useAuthContext } from "context/authContext";
import { toastControl } from "lib/toastControl";

const LoginPage = () => {
  const { login } = useAuthContext();
  const onFinishFailed = (errorInfo) => {
    toastControl("error", errorInfo);
  };

  const onFinish = async (values) => {
    await login(values);
  };

  return (
    <div id="main-wrapper">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100">
        <div className="position-relative z-index-5">
          <div className="row gx-0">
            <div className="col-lg-6 col-xl-5 col-xxl-4">
              <div className="min-vh-100 bg-body row justify-content-center align-items-center p-5">
                <div className="col-12 auth-card">
                  <h2 className="mb-2 mt-4 fs-7 fw-bolder">
                    Контент удирдлагын систем
                  </h2>
                  <p className="mb-9">
                    Та өөрийнхөө админ нэвтрэх эрхээр орно уу
                  </p>
                  <hr />
                  <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Имэйл хаяг
                      </label>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Та өөрийн бүртгэлтэй имэйлээ оруулна уу!",
                          },
                          {
                            type: "email",
                            message: "Имэйл хаяг буруу байна!",
                          },
                        ]}
                      >
                        <Input
                          type="email"
                          className="form-control custom-login-form"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </Form.Item>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Нууц үг
                      </label>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Нууц үгээ оруулна уу",
                          },
                        ]}
                      >
                        <Input
                          type="password"
                          size="large"
                          className="form-control custom-login-form"
                        />
                      </Form.Item>
                    </div>
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                      <div className="form-check"></div>
                      <a className="text-primary fw-medium" href="/forgot">
                        Нууц үгээ мартсан уу?
                      </a>
                    </div>

                    <Button
                      htmlType="submit"
                      className="btn btn-primary login-btn w-100 py-8 mb-4 rounded-2"
                    >
                      Нэвтрэх
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-7 col-xxl-8 position-relative overflow-hidden bg-dark d-none d-lg-block">
              <div className="circle-top" />
              <div>
                <img
                  src="../assets/images/logos/logo.png"
                  className="circle-bottom"
                  alt="Logo-Dark"
                />
              </div>
              <div className="d-lg-flex align-items-center z-index-5 position-relative h-n80">
                <div className="row justify-content-center w-100">
                  <div className="col-lg-6">
                    <h2 className="text-white fs-10 mb-3 lh-base">
                      Тавтай морил
                    </h2>
                    <span className="opacity-75 fs-4 text-white d-block mb-3">
                      Контент удирдлагын системтэй холбоотой зүйлс
                      <br />
                      гарсан бол та манайхтай холбогдоно уу
                    </span>
                    <a
                      href="https://webr.mn"
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Холбогдох
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
