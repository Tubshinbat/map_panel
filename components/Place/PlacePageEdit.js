"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Switch,
  Tree,
  Upload,
  message,
} from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import IconPicker from "react-icon-picker";

import axios from "axios-base";
import { Editor } from "@tinymce/tinymce-react";

// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

// Hooks
import usePlaceCategories from "hooks/usePlaceCategories";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { menuGenerateData } from "lib/menuGenerate";
import { buildFileInput, deleteImage, uploadImage } from "lib/files";
import ImageDrag, { OneImageDrag } from "components/Generals/ImageDrag";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";
import usePlace from "hooks/usePlace";
import ServiceItem from "components/Generals/ServiceItem";
import MapModal from "components/Modal/MapModal";
import base from "lib/base";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const icons = [
  "fas fa-bed",
  "fas fa-bell",
  "fas fa-bath",
  "fas fa-broom",
  "fas fa-bus",
  "fas fa-car",
  "fas fa-car-side",
  "fas fa-coffee",
  "fas fa-concierge-bell",
  "fas fa-cocktail",
  "fas fa-dumbbell",
  "fas fa-door-closed",
  "fas fa-door-open",
  "fas fa-hotel",
  "fas fa-key",
  "fas fa-luggage-cart",
  "fas fa-shuttle-van",
  "fas fa-spa",
  "fas fa-swimming-pool",
  "fas fa-tv",
  "fas fa-utensils",
  "fas fa-wifi",
  "fas fa-hot-tub",
  "fas fa-wine-glass-alt",
  "fas fa-mug-hot",
  "fas fa-suitcase",
  "fas fa-map",
  "fas fa-plane",
  "fas fa-ticket-alt",
  "fas fa-glass-cheers",
  "fas fa-hamburger",
  "fas fa-birthday-cake",
  "fas fa-ice-cream",
  "fas fa-pizza-slice",
  "fas fa-drumstick-bite",
  "fas fa-fish",
  "fas fa-apple-alt",
  "fas fa-carrot",
  "fas fa-seedling",
  "fas fa-bread-slice",
  "fas fa-hiking",
  "fas fa-mountain",
  "fas fa-campground",
  "fas fa-tree",
  "fas fa-fire",
  "fas fa-snowflake",
  "fas fa-umbrella-beach",
  "fas fa-sun",
  "fas fa-cloud-sun",
  "fas fa-anchor",
  "fas fa-bicycle",
  "fas fa-boat",
  "fas fa-compass",
  "fas fa-directions",
  "fas fa-futbol",
  "fas fa-gift",
  "fas fa-globe",
  "fas fa-golf-ball",
  "fas fa-hand-sparkles",
  "fas fa-heart",
  "fas fa-landmark",
  "fas fa-music",
  "fas fa-paint-brush",
  "fas fa-parachute-box",
  "fas fa-parking",
  "fas fa-paw",
  "fas fa-plane-arrival",
  "fas fa-plane-departure",
  "fas fa-portrait",
  "fas fa-receipt",
  "fas fa-restroom",
  "fas fa-road",
  "fas fa-route",
  "fas fa-school",
  "fas fa-shopping-cart",
  "fas fa-skiing",
  "fas fa-skiing-nordic",
  "fas fa-snowboarding",
  "fas fa-snowman",
  "fas fa-socks",
  "fas fa-suitcase-rolling",
  "fas fa-tachometer-alt",
  "fas fa-tag",
  "fas fa-taxi",
  "fas fa-ticket",
  "fas fa-toilet-paper",
  "fas fa-tooth",
  "fas fa-train",
  "fas fa-tram",
  "fas fa-tree",
  "fas fa-umbrella",
  "fas fa-user-check",
  "fas fa-user-friends",
  "fas fa-user-tag",
  "fas fa-volleyball-ball",
  "fas fa-wallet",
  "fas fa-wheelchair",
  "fas fa-wind",
  "fas fa-wine-bottle",
  "fas fa-yin-yang",
];

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const router = useRouter();
  const [markerPosition, setMarkerPosition] = useState(null);
  const { contentLoad } = useNotificationContext();
  const { updatePlace, getPlace, singlePlace } = usePlace();
  const [pictures, setPictures] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState({
    map: false,
    service: false,
  });
  const [services, setServices] = useState([]);
  const [deletePictures, setDeletePictures] = useState([]);
  const [gData, setGData] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
  });
  const { placeCategories } = usePlaceCategories();
  const [checkedKeys, setCheckedKeys] = useState([]);

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getPlace(slug);
    };
    fetchData().then().catch();
    modalForm.setFieldsValue({ icon: "fas fa-sun" });

    return () => clear();
  }, []);

  useEffect(() => {
    if (placeCategories) {
      setGData(menuGenerateData(placeCategories));
    }
  }, [placeCategories]);

  useEffect(() => {
    if (singlePlace) {
      form.setFieldsValue({
        ...singlePlace,
      });
      if (Array.isArray(singlePlace.services))
        singlePlace.services && setServices(singlePlace.services);
      if (Array.isArray(singlePlace.categories))
        setCheckedKeys(() => singlePlace.categories.map((cat) => cat._id));
      if (singlePlace.logo)
        setPhoto({
          name: singlePlace.logo,
          url: `${base.cdnUrl}/150x150/${singlePlace.logo}`,
        });
      if (Array.isArray(singlePlace.pictures))
        setPictures(
          singlePlace.pictures.map((img) => ({
            name: img,
            url: `${base.cdnUrl}/150x150/${img}`,
          }))
        );
    }
  }, [singlePlace]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleEdit = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);
    else values.pictures = [];

    if (Array.isArray(deletePictures) && deletePictures.length > 0)
      deletePictures.map(async (img) => await deleteImage(img));

    if (Array.isArray(services) && services.length > 0)
      values.services = JSON.stringify(services);
    else values.service = [];

    if (photo) values.logo = photo.name;
    else values.logo = "";

    const data = {
      ...values,
      star: checkedRadio.star || false,
      status: checkedRadio.status || true,
      categories: [...checkedKeys],
    };

    if (data.categories.length <= 0) data.categories = [];

    const sendData = convertFromdata(data);
    const result = await updatePlace(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/places");
      }, 600);
  };

  const handleBack = () => {
    deletePictures.map(async (el) => await deleteImage(el));
    pictures.map(async (el) => await deleteImage(el.name));
    router.back();
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
  };

  const clear = () => {
    form.resetFields();
    setPictures([]);
    setCheckedKeys([]);
    setGData([]);
    deletePictures.map(async (el) => await deleteImage(el));
    pictures.map(async (el) => await deleteImage(el.name));
  };

  // -- TREE FUNCTIONS

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const handleService = () => {
    modalForm
      .validateFields()
      .then((values) => {
        setServices((prevServices) => [...prevServices, values]);
        handleCancel();
        modalForm.resetFields();
      })
      .catch();
  };

  const handleDelete = (index) => {
    setServices((prevServices) => {
      if (prevServices.length === 1) return [];
      else return prevServices.filter((_, i) => i !== index);
    });
  };

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
      <div className="container-fluid">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Газрын мэдээлэл засах</h1>
              </div>
            </div>
          </div>
        </section>

        <Form layout="vertical" className="custom-form" form={form}>
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">Агуулга</h6>
                </div>
                <div className=" card-body py-3">
                  <div className="row">
                    <div className="col-12">
                      <Form.Item
                        label="Газрын нэршил"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Газрын нэршил оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <Form.Item
                        label="Дэлгэрэнгүй"
                        name="about"
                        className="dark-input"
                        rules={[requiredRule]}
                        getValueFromEvent={(e) =>
                          e.target && e.target.getContent()
                        }
                      >
                        <Editor
                          apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                          init={{
                            plugins:
                              "advlist textcolor autolink lists link image charmap print preview anchor tinydrive searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount image media  code  table ",
                            toolbar:
                              "mybutton | addPdf |  image | undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic forecolor  backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link  | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                            file_picker_types: "image",
                            automatic_uploads: false,
                            height: "400px",
                            // skin: "oxide-dark",
                            // content_css: "dark",
                            setup: (editor) => {},
                            file_picker_callback: function (cb, value, meta) {
                              const input = Object.assign(
                                document.createElement("input"),
                                {
                                  type: "file",
                                  accept: "image/*",
                                }
                              );
                              input.onchange = async function () {
                                if (this.files && this.files[0]) {
                                  var file = this.files[0];
                                  const { url } = await uploadImage(file);
                                  cb(url);
                                }
                              };
                              input.click();
                            },
                          }}
                          onEditorChange={(event) => handleEditor(event)}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-12">
                      <Form.Item label="Үйлчилгээнүүд" className="dark-input">
                        <Button
                          className="service-btn"
                          icon={<AppstoreAddOutlined />}
                          onClick={() => showModal("service")}
                        >
                          Нэмэх
                        </Button>
                      </Form.Item>
                      <div className="service-items">
                        {services.map((service, index) => (
                          <ServiceItem
                            key={index}
                            icon={service.icon}
                            service={service.name}
                            handleDelete={() => handleDelete(index)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Хаягын мэдээлэл"
                        name="addressText"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="Хаягын дэлгэрэнгүй мэдээллийг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Address_kh"
                        name="address_kh"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="Address_kh оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-6">
                      <Form.Item
                        label="Address_ne"
                        name="address_ne"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="Address_ne оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Гудамжын мэдээлэл"
                        name="address_st"
                        className="dark-input"
                        hasFeedback
                      >
                        <Input placeholder="Гудамжын мэдээлэл оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-5">
                      <Form.Item
                        name="lat"
                        label="Өргөрөг"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Өргөрөгийг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-5">
                      <Form.Item
                        name="long"
                        label="Уртраг"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Уртрагыг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-2">
                      <Form.Item label={" "}>
                        <Button
                          className="map-btn"
                          shape="circle"
                          icon={<i class="ti ti-map-2"></i>}
                          size="large"
                          onClick={() => showModal("map")}
                        ></Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">Ангилал</h6>
                </div>
                <div className="card-body p-3">
                  <Form.Item className="mb-0" name="categories">
                    <Tree
                      checkable
                      className="custom-tree"
                      treeData={gData}
                      onCheck={onCheck}
                      checkedKeys={checkedKeys}
                      autoExpandParent={false}
                    />
                  </Form.Item>
                </div>
              </div>
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
                    photo={photo}
                  />
                </div>
              </div>
              <div className="card">
                <div className="px-4 py-3 border-bottom">
                  <h6 className="card-title card-title-small mb-0">
                    Зураг оруулах
                  </h6>
                </div>
                <div className="card-body p-3">
                  <ImageDrag
                    pictures={pictures}
                    setPictures={setPictures}
                    deletePictures={deletePictures}
                    setDeletePictures={setDeletePictures}
                  />
                </div>
              </div>
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
                  <Form.Item
                    label="Онцлох"
                    className="dark-input switch-input"
                    name="star"
                  >
                    <Switch
                      size="small"
                      checked={checkedRadio.star}
                      onChange={(checked) => handleRadio(checked, "star")}
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

      <MapModal
        open={visible && visible.map}
        handleMap={handleMap}
        handleCancel={handleCancel}
        markerPosition={markerPosition}
      />
      <Modal
        open={visible && visible.service}
        title="Үйлчилгээ нэмэх"
        onClick={() => handleService()}
        onCancel={() => handleCancel()}
        footer={[
          <Button onClick={() => handleCancel()}> Буцах </Button>,
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={() => handleService()}
          >
            Хадгалах
          </Button>,
        ]}
      >
        <div className="modal-body">
          <Form form={modalForm}>
            <div className="iconpiker-item white-input">
              <Form.Item name="icon" className="icon-picker">
                <IconPicker defaultValue="fas fa-sun" icons={icons} />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[requiredRule]}
                style={{ width: "100%" }}
              >
                <Input
                  className="custom-input"
                  placeholder="Үйлчилгээний нэршил"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Page;
