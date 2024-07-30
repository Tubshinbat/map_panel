"use client";
import { Button, Form, Input, Modal, Switch, Tree, message } from "antd";
import PageNavItem from "components/Page/PagenavItem";
import IconPicker from "react-icon-picker";

//Context
import { useNotificationContext } from "context/notificationContext";

//Hooks
import useSocial from "hooks/useSocial";
import { menuGenerateData } from "lib/menuGenerate";
import { useEffect, useState } from "react";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const icons = [
  "fab fa-facebook",
  "fab fa-facebook",
  "fab fa-twitter",
  "fab fa-instagram",
  "fab fa-linkedin",
  "fab fa-youtube",
  "fab fa-pinterest",
  "fab fa-snapchat",
  "fab fa-whatsapp",
  "fab fa-reddit",
  "fab fa-tiktok",
];

const Page = () => {
  const [form] = Form.useForm();
  const { contentLoad } = useNotificationContext();

  // States
  const [gData, setGData] = useState([]);
  const [visible, setVisible] = useState({
    edit: false,
    add: false,
    delete: false,
  });

  // Hooks
  const {
    createSocial,
    getSocial,
    social,
    setSocial,
    socials,
    updateSocial,
    loadSocials,
    deleteSocial,
  } = useSocial();

  //Useeffect
  useEffect(() => {
    if (socials) {
      setGData(menuGenerateData(socials));
    }
  }, [socials]);

  const onSelect = async (selectKey) => {
    if (selectKey.length > 0) await getSocial(selectKey[0]);
    else setSocial(null);
  };

  const showModal = (modal) => {
    if (modal != "add" && !social) {
      toastControl("error", "Нэг өгөгдөл сонгоно уу");
      return;
    }

    setVisible((sb) => ({ ...sb, [modal]: true }));
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
    setSocial(null);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await createSocial(values);
        if (result) handleCancel();
      })
      .catch((error) => message.error(error));
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        const result = await updateSocial(values, social._id);
        if (result) handleCancel();
      })
      .catch((error) => message.error(error));
  };

  const handleDeleteSocial = async () => {
    await deleteSocial(social._id);
    handleCancel();
    setSocial(null);
  };

  return (
    <>
      {" "}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Сошиал сувгууд</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="content">
        <div className="container-fluid">
          <div className="card card-body page-nav-body py-3">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="d-sm-flex align-items-center justify-space-between">
                  <nav className="page-nav ">
                    <PageNavItem
                      label="Ерөнхий тохиргоо"
                      link="/web_settings"
                    />
                    <PageNavItem label="Сошиал сувгууд" link="/socials" />
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card ">
                <div className=" card-body py-3">
                  <div className="datatable-header-tools">
                    <div className="datatable-actions">
                      <Button
                        className="datatable-action add-bg"
                        onClick={() => showModal("add")}
                      >
                        <i className="fa fa-plus"></i> Цэс нэмэх
                      </Button>

                      <Button
                        className="datatable-action edit-bg"
                        onClick={() => {
                          form.setFieldsValue({ ...social });

                          social
                            ? showModal("edit")
                            : toastControl("error", "Өгөгдөл сонгоно уу");
                        }}
                      >
                        <i className="fa-solid fa-pencil"></i>
                        Засах
                      </Button>
                      <Button
                        className="datatable-action delete-bg"
                        onClick={() => showModal("delete")}
                      >
                        <i className="fa-solid fa-trash"></i>
                        Устгах
                      </Button>
                    </div>
                  </div>

                  <Tree
                    className=" tree-style custom-tree"
                    blockNode
                    onSelect={onSelect}
                    treeData={gData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={visible && (visible.add || visible.parent || visible.edit)}
        title={`${visible.edit ? "Засварлах" : "Сошиал хаяг нэмэх"} `}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={contentLoad}
            onClick={() => {
              if (visible.add) handleAdd();
              if (visible.edit) handleEdit();
            }}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Сошиал хаягын нэр"
                name="name"
                className="white-input"
                rules={[requiredRule]}
              >
                <Input placeholder="facebook, twitter ..." />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item name="icon" className="icon-picker">
                <IconPicker
                  defaultValue={`${social ? social.icon : "fab fa-facebook"}`}
                  icons={icons}
                />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Сошиал хаягын хаяг"
                name="link"
                rules={[requiredRule]}
              >
                <Input placeholder="https://facebook.com" />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        visible={visible && visible.delete}
        title="Устгах"
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Буцах
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={contentLoad}
            danger
            className="btn-danger"
            onClick={() => handleDeleteSocial()}
          >
            Устгах
          </Button>,
        ]}
      >
        <p>
          Та <b> {social && social.name} </b> - устгахдаа итгэлтэй байна уу?{" "}
        </p>
      </Modal>
    </>
  );
};

export default Page;
