"use client";
import { Button, Form, Input } from "antd";
import { useAuthContext } from "context/authContext";
import { toastControl } from "lib/toastControl";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const [otpCode, setOtpCode] = useState(null);
  const [step, setStep] = useState(1);
  const { getOTP, verifyOTP, resetPassword } = useAuthContext();
  const [form] = Form.useForm();
  const router = useRouter();
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData("text").slice(0, 6); // зөвхөн эхний 6 тэмдэгтийг авах
      paste.split("").forEach((char, index) => {
        if (index < inputRefs.current.length) {
          inputRefs.current[index].value = char;
        }
      });
      e.preventDefault();
    };

    inputRefs.current.forEach((input) => {
      if (input) {
        input.addEventListener("paste", handlePaste);
      }
    });

    return () => {
      inputRefs.current.forEach((input) => {
        if (input) {
          input.removeEventListener("paste", handlePaste);
        }
      });
    };
  }, []);

  const handleOTPsend = async (values) => {
    setLoading(true);
    const { success, beforeOtp, resetPasswordExpire } = await getOTP(values);

    if (success) {
      setStep(2);
    }
    if (beforeOtp) {
      toastControl("success", "Өмнө баталгаажуулах код илгээсэн байна.");
      const currentTime = new Date().getTime();
      const expireTime = new Date(resetPasswordExpire).getTime();
      const remainingTime = Math.max(0, expireTime - currentTime);
      setCountdown(Math.floor(remainingTime / 1000)); // Секундээр тохируулна
    }
    setLoading(false);
  };

  const handleOTPverify = async () => {
    const code = inputRefs.current.map((input) => input.value).join("");
    setOtpCode(code);
    const email = form.getFieldValue("email");
    const success = await verifyOTP(email, code);

    if (success) {
      setStep(3);
    }
  };

  const handlePasswordReset = async (values) => {
    setLoading(true);
    const email = form.getFieldValue("email");
    const success = await resetPassword(email, otpCode, values.password);

    if (success) {
      toastControl("success", "Нууц үг амжилттай шинэчлэгдлээ.");
      router.push("/");
    } else {
      toastControl("error", "Нууц үг шинэчлэхэд алдаа гарлаа.");
    }
    setLoading(false);
  };

  const backLogin = () => {
    router.push("/");
  };

  const maskEmail = (email) => {
    let [localPart, domain] = email.split("@");
    let maskedLocalPart =
      localPart.substring(0, 1) +
      "**********" +
      localPart.substring(localPart.length - 3);
    return maskedLocalPart + "@" + domain;
  };

  const handleInput = (e, index) => {
    const { maxLength, value } = e.target;
    if (value.length >= maxLength && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setResendEnabled(false);
    setCountdown(120);
    handleOTPsend({ email: form.getFieldValue("email") });
  };

  return (
    <>
      <div id="main-wrapper">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100">
          <div className="position-relative z-index-5">
            <div className="row gx-0">
              <div className="col-lg-6 col-xl-5 col-xxl-4">
                <div className="min-vh-100 bg-body row justify-content-center align-items-center p-5">
                  {step === 1 && (
                    <div className="col-12 auth-card">
                      <h2 className="mb-2 mt-4 fs-7 fw-bolder">
                        Нууц үгээ сэргээх
                      </h2>
                      <p className="mb-9">
                        Та өөрийнхөө бүртгэлтэй имэйл хаягаа оруулна уу.
                        <br /> Таны имэйл хаягт баталгаажуулах код илгээх болно
                      </p>
                      <hr />
                      <Form form={form}>
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
                                message:
                                  "Та өөрийн бүртгэлтэй имэйлээ оруулна уу!",
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
                          <Button
                            className="btn btn-primary login-btn w-100 py-8 mb-4 "
                            loading={loading}
                            onClick={() => {
                              form
                                .validateFields()
                                .then((values) => {
                                  handleOTPsend(values);
                                })
                                .catch((info) => {
                                  // console.log(info);
                                });
                            }}
                          >
                            Баталгаажуулах код авах
                          </Button>
                          <Button
                            onClick={backLogin}
                            className="btn bg-primary-subtle height-45 text-primary w-100 py-8"
                          >
                            Нэвтрэх
                          </Button>
                        </div>
                      </Form>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="col-12 auth-card">
                      <h2 className="mb-2 mt-4 fs-7 fw-bolder">
                        Баталгаажуулах код илгээв
                      </h2>
                      <p className="mb-9">
                        Бид таны бүртгэлтэй имэйл хаягруу баталгаажуулах кодыг
                        илгээллээ
                      </p>
                      <h6 className="fw-bolder">
                        {maskEmail(form.getFieldValue("email"))}
                      </h6>
                      <form className="mt-3">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="form-label fw-semibold"
                          >
                            Баталгаажуулах 6 оронтой кодоо оруулна уу
                          </label>
                          <div className="d-flex align-items-center gap-2 gap-sm-3">
                            {[...Array(6)].map((_, index) => (
                              <input
                                key={index}
                                type="text"
                                maxLength="1"
                                pattern="\d*"
                                className="form-control"
                                ref={(el) => (inputRefs.current[index] = el)}
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                              />
                            ))}
                          </div>
                        </div>
                        <a
                          href="javascript:void(0)"
                          className="btn btn-primary w-100 py-8 mb-4"
                          onClick={handleOTPverify}
                        >
                          Код баталгаажуулах
                        </a>
                        <div className="d-flex align-items-center">
                          <p className="fs-4 mb-0 text-dark">
                            Танд код очоогүй юу?
                          </p>
                          <Button
                            type="link"
                            className="text-primary fw-medium ms-2"
                            onClick={handleResend}
                            disabled={!resendEnabled}
                          >
                            Код авах {resendEnabled ? "" : `(${countdown}s)`}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="col-12 auth-card">
                      <h2 className="mb-2 mt-4 fs-7 fw-bolder">
                        Нууц үг шинэчлэх
                      </h2>
                      <p className="mb-9">
                        Доорх талбарт нууц үгээ шинэчлэн оруулна уу
                      </p>
                      <Form form={form} onFinish={handlePasswordReset}>
                        <div className="mb-3">
                          <label
                            htmlFor="password"
                            className="form-label fw-semibold"
                          >
                            Шинэ нууц үг
                          </label>
                          <Form.Item
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Нууц үгээ оруулна уу!",
                              },
                              {
                                min: 6,
                                message:
                                  "Нууц үг хамгийн багадаа 6 тэмдэгттэй байх ёстой!",
                              },
                            ]}
                          >
                            <Input.Password
                              className="form-control custom-login-form"
                              id="password"
                            />
                          </Form.Item>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label fw-semibold"
                          >
                            Нууц үг давтах
                          </label>
                          <Form.Item
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                              {
                                required: true,
                                message: "Нууц үгээ дахин оруулна уу!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error("Нууц үгс таарахгүй байна!")
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password
                              className="form-control custom-login-form"
                              id="confirmPassword"
                            />
                          </Form.Item>
                        </div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn btn-primary height-45 w-100 py-8 mb-4"
                          loading={loading}
                        >
                          Нууц үг шинэчлэх
                        </Button>
                      </Form>
                    </div>
                  )}
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
    </>
  );
};

export default Page;
