"use client";
import { Button, Form, Input, Modal, Switch, Tree, message } from "antd";
import { OneImageDrag } from "components/Generals/ImageDrag";
import PageNavItem from "components/Page/PageNavItem";
import { useNotificationContext } from "context/notificationContext";
import usePlaceCategories from "hooks/usePlaceCategories";
import base from "lib/base";
import { menuGenerateData } from "lib/menuGenerate";
import { toastControl } from "lib/toastControl";
import { useEffect, useState } from "react";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const { contentLoad } = useNotificationContext();
  // STATES
  const [gData, setGData] = useState([]);
  const [visible, setVisible] = useState({
    edit: false,
    add: false,
    delete: false,
    parent: false,
  });
  const [deletePictures, setDeletePictures] = useState([]);
  const [photo, setPhoto] = useState(null);
  const {
    placeCategories,
    getPlaceCategory,
    category,
    setCategory,
    changePosition,
    createPlaceCategory,
    updatePlaceCategory,
    deletePlaceCategory,
  } = usePlaceCategories();

  useEffect(() => {
    if (placeCategories) {
      setGData(menuGenerateData(placeCategories));
    }
  }, [placeCategories]);

  useEffect(() => {
    if (category && category.icon) {
      setPhoto(() => ({
        name: category.icon,
        url: base.cdnUrl + "/" + category.icon,
      }));
    } else setPhoto(() => null);
  }, [category]);

  const clear = () => {
    form.resetFields();
  };

  const onDragEnter = (info) => {};

  const onDrop = async (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    const sendData = {
      data: data,
    };
    await changePosition(sendData);
    setGData(data);
  };

  const onSelect = async (selectKey, element) => {
    if (selectKey.length > 0) {
      await getPlaceCategory(selectKey[0]);
    } else {
      setCategory(null);
    }
  };

  const showModal = (modal) => {
    if (modal != "add" && modal != "parent" && !category) {
      toastControl("error", "Нэг өгөгдөл сонгоно уу");
      return;
    }

    if (modal == "edit") {
      if (category.icon)
        setPhoto({
          name: category.icon,
          url: base.cdnUrl + "/" + category.icon,
        });
      else setPhoto(null);
    }

    setVisible((sb) => ({ ...sb, [modal]: true }));
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible((sb) => Object.keys(sb).map((el) => (sb[el] = false)));
    setPhoto(null);
    setCategory(null);
  };

  const handleAdd = (isParent = false) => {
    form
      .validateFields()
      .then(async (values) => {
        if (isParent) values.parentId = category._id;
        if (photo) values.icon = photo.name;
        const result = await createPlaceCategory(values);
        if (result) handleCancel();
      })
      .catch((error) => message.error(error));
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (photo) values.icon = photo.name;
        const result = await updatePlaceCategory(values, category._id);
        if (result) handleCancel();
      })
      .catch((error) => message.error(error));
  };

  const deleteMenu = async () => {
    await deletePlaceCategory(category._id);
    handleCancel();
    setCategory(null);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Газруудын ангилал</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="content">
        <div className="container-fluid">
          <div className="card card-body py-3">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="d-sm-flex align-items-center justify-space-between">
                  <nav className="page-nav ">
                    <PageNavItem label="Газрууд" link="/places" />
                    <PageNavItem
                      label="Газруудын ангилал"
                      link="/place-categories"
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-body">
                <h6 className="select-menu">
                  СОНГОГДСОН ЦЭС: {category && category.name}
                </h6>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card ">
                <div className="card-body">
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
                          form.setFieldsValue({ ...category });

                          category
                            ? showModal("edit")
                            : toastControl("error", "Ангилал сонгоно уу");
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
                    className="draggable-tree tree-style custom-tree"
                    // defaultExpandedKeys={expandedKeys}
                    draggable
                    blockNode
                    onDragEnter={onDragEnter}
                    onSelect={onSelect}
                    onDrop={onDrop}
                    treeData={gData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Category */}
        <Modal
          visible={visible && (visible.add || visible.parent || visible.edit)}
          title={`${visible.edit ? "Засварлах" : "Ангилал нэмэх"} `}
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
                const isParent = visible.parent;
                if (visible.add || visible.parent) handleAdd(isParent);
                if (visible.edit) handleEdit();
              }}
            >
              Нэмэх
            </Button>,
          ]}
        >
          <Form layout="vertical" form={form}>
            <div className="row">
              <div className="col-12">
                <Form.Item
                  label="Ангилалын нэр"
                  name="name"
                  className="white-input"
                  rules={[requiredRule]}
                >
                  <Input placeholder="Ангилалын нэрийг оруулна уу" />
                </Form.Item>
              </div>
              <div className="col-12">
                <Form.Item label="Дүрс" className="white-input">
                  <OneImageDrag
                    setPhoto={setPhoto}
                    photo={photo}
                    setDeletePictures={setDeletePictures}
                  />
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
              onClick={() => deleteMenu()}
            >
              Устгах
            </Button>,
          ]}
        >
          <p>
            Та <b> {category && category.name} </b> - ангилалыг устгахдаа
            итгэлтэй байна уу?{" "}
          </p>
        </Modal>
      </div>{" "}
    </>
  );
};

export default Page;
