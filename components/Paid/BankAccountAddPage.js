"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Switch,
  Tree,
  Upload,
  message,
} from "antd";

// Components

// Hooks
import useBankAccounts from "hooks/useBankAccounts";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { buildFileInput, deleteImage, uploadImage } from "lib/files";
import ImageDrag, { OneImageDrag } from "components/Generals/ImageDrag";
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
  const { createBankAccount } = useBankAccounts();

  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState({
    map: false,
    service: false,
  });

  const [deletePictures, setDeletePictures] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
  });

  // Config init

  useEffect(() => {
    modalForm.setFieldsValue({ icon: "fas fa-sun" });
    return () => clear();
  }, []);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleAdd = async (values) => {
    if (Array.isArray(deletePictures) && deletePictures.length > 0)
      deletePictures.map(async (img) => await deleteImage(img));

    if (photo) values.bankLogo = photo.name;

    const data = {
      ...values,
      status: checkedRadio.status || true,
    };

    const sendData = convertFromdata(data);
    const result = await createBankAccount(sendData);
    if (result)
      setTimeout(() => {
        router.push("/paid_type");
      }, 600);
  };

  const handleBack = () => {
    deletePictures.map(async (el) => await deleteImage(el));
    router.back();
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
  };

  const clear = () => {
    form.resetFields();
    deletePictures.map(async (el) => await deleteImage(el));
  };

  // -- TREE FUNCTIONS

  const handleMap = (place) => {
    form.setFieldsValue({ ...place });
    handleCancel();
  };

  const showModal = (modal) => {
    setVisible((sb) => ({ ...sb, [modal]: true }));
  };

  const handleCancel = () => {
    setVisible((bprev) => ({ ...bprev, map: false, service: false }));
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Банкны данс нэмэх</h1>
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
                  <div className=" card-body py-3">
                    <div className="row">
                      <div className="col-12">
                        <Form.Item
                          label="Банкны нэр"
                          name="bankName"
                          className="dark-input"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Input placeholder="Банкны нэр оруулна уу" />
                        </Form.Item>
                      </div>

                      <div className="col-md-12">
                        <Form.Item
                          label="Данс эзэмшигч"
                          name="accountName"
                          rules={[requiredRule]}
                          className="dark-input"
                          hasFeedback
                        >
                          <Input placeholder="Данс эзэмшигчийн нэрийг оруулна уу" />
                        </Form.Item>
                      </div>

                      <div className="col-md-12">
                        <Form.Item
                          label="Дансны дугаар"
                          name="accountNumber"
                          rules={[requiredRule]}
                          className="dark-input"
                          hasFeedback
                        >
                          <InputNumber
                            placeholder="Дансны дугаараа оруулна уу"
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
                      Лого оруулах
                    </h6>
                  </div>
                  <div className="card-body p-3">
                    <OneImageDrag
                      setDeletePictures={setDeletePictures}
                      setPhoto={setPhoto}
                    />
                  </div>
                </div>

                <div className="card">
                  <div className="px-4 py-3 border-bottom">
                    <h6 className="card-title card-title-small mb-0">
                      Тохиргоо
                    </h6>
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
      </section>
    </>
  );
};

export default Page;
