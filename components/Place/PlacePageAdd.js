"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Switch,
  Tree,
  message,
  Tag,
  theme,
  Select,
} from "antd";
import { AppstoreAddOutlined, PlusOutlined } from "@ant-design/icons";
import IconPicker from "react-icon-picker";
import { TweenOneGroup } from "rc-tween-one";
import { useRouter } from "next/navigation";

import { Editor } from "@tinymce/tinymce-react";

// Hooks
import usePlaceCategories from "hooks/usePlaceCategories";
import { useNotificationContext } from "context/notificationContext";
import useCity from "hooks/useCity";
import useDistrict from "hooks/useDistrict";
import useKhoroo from "hooks/useKhoroo";
import usePlace from "hooks/usePlace";

// Lib
import { menuGenerateData } from "lib/menuGenerate";
import { deleteImage, uploadImage } from "lib/files";
import { convertFromdata } from "lib/check";

// Components
import ImageDrag, { OneImageDrag } from "components/Generals/ImageDrag";
import ServiceItem from "components/Generals/ServiceItem";
import MapModal from "components/Modal/MapModal";

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

const Page = () => {
  const inputRef = useRef(null);
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const router = useRouter();
  const [markerPosition, setMarkerPosition] = useState(null);
  const { contentLoad } = useNotificationContext();
  const { createPlace } = usePlace();
  const { placeCategories } = usePlaceCategories();
  const { loadCity, cities } = useCity();
  const { loadDistrict, districts } = useDistrict();
  const { loadKhoroo, khoroos } = useKhoroo();

  // Usestate
  const [selectCity, setSelectCity] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectKhoroo, setSelectKhoroo] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [khorooData, setKhorooData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
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
    isAddress: false,
  });

  // Config init

  useEffect(() => {
    modalForm.setFieldsValue({ icon: "fas fa-sun" });
    (async () => {
      await loadCity();
    })();
    return () => clear();
  }, []);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    if (placeCategories) {
      setGData(menuGenerateData(placeCategories));
    }
  }, [placeCategories]);

  useEffect(() => {
    if (cities) {
      setCityData(() =>
        cities.map((el) => ({
          value: el._id,
          label: el.name,
        }))
      );
    }
  }, [cities]);

  useEffect(() => {
    if (districts) {
      setDistrictData(() =>
        districts.map((el) => ({
          value: el._id,
          label: el.name,
        }))
      );
    }
  }, [districts]);

  useEffect(() => {
    if (khoroos) {
      setKhorooData(() =>
        khoroos.map((el) => ({
          value: el._id,
          label: el.name,
        }))
      );
    }
  }, [khoroos]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ about: event });
  };

  const handleAdd = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);

    if (Array.isArray(deletePictures) && deletePictures.length > 0)
      deletePictures.map(async (img) => await deleteImage(img));

    if (Array.isArray(services) && services.length > 0)
      values.services = JSON.stringify(services);

    if (Array.isArray(tags) && tags.length > 0)
      values.addressText = JSON.stringify(tags);

    if (photo) values.logo = photo.name;

    const coordinates = [values.lng, values.lat];
    delete values.lat;
    delete values.lng;

    const data = {
      ...values,
      star: checkedRadio.star || false,
      status: checkedRadio.status || true,
      isAddress: checkedRadio.isAddress || false,
      categories: [...checkedKeys],
      type: "Point",
      coordinates,
    };

    if (data.categories.length <= 0) delete data.categories;
    const sendData = convertFromdata(data);
    const result = await createPlace(sendData);
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

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => (
    <span
      key={tag}
      style={{
        display: "inline-block",
      }}
    >
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
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

  const handleSearchDistrict = async (input) => {
    await loadDistrict(`all=true&name=${input}&cityId=${selectCity}`);
  };

  const handleSearchCity = async (input) => {
    await loadCity(`all=true&name=${input}`);
  };

  const handleSearchKhoroo = async (input) => {
    await loadKhoroo(
      `all=true&name=${input}&cityId=${selectCity}&districtId=${selectDistrict}`
    );
  };

  const handleSelectCity = async (selectId) => {
    if (selectId) {
      setSelectCity(selectId);
      await loadDistrict(`cityId=${selectId}`);
    }
    setSelectKhoroo(null);
    setSelectDistrict(null);
    form.setFieldsValue({ district: null, khoroo: null });
  };

  const handleSelectDistrict = async (selectId) => {
    if (selectId) {
      setSelectDistrict(selectId);
      await loadKhoroo(`cityId=${selectCity}&districtId=${selectId}`);
    }
    setSelectKhoroo(null);
    form.setFieldsValue({ khoroo: null });
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Газар нэмэх</h1>
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
                      <div className="col-md-12">
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
                      <div className="col-md-12">
                        <Form.Item
                          label="Газрын нэршил Англи хэл дээр"
                          name="engName"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Input placeholder="Газрын Англи нэршил оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-md-12">
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
                      <div className="col-md-12">
                        <Form.Item label="Үйлчилгээнүүд">
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
                          name="lng"
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
                            icon={<i class="fa fa-map"></i>}
                            size="large"
                            onClick={() => showModal("map")}
                          ></Button>
                        </Form.Item>
                      </div>

                      <div className="col-md-12">
                        <Form.Item
                          label="Хаягын мэдээлэл"
                          className="dark-input"
                          hasFeedback
                          extra="Хэрэглэгч тухайн хаягыг хайхад туслах түлхүүр хаягуудыг оруулана уу. Жишээ: Төв номын сан, Сталингын номын сан, tuv nomiin san г.мэт"
                        >
                          <div
                            style={{
                              marginBottom: 16,
                            }}
                          >
                            <TweenOneGroup
                              appear={false}
                              enter={{
                                scale: 0.8,
                                opacity: 0,
                                type: "from",
                                duration: 100,
                              }}
                              leave={{
                                opacity: 0,
                                width: 0,
                                scale: 0,
                                duration: 200,
                              }}
                              onEnd={(e) => {
                                if (e.type === "appear" || e.type === "enter") {
                                  e.target.style = "display: inline-block";
                                }
                              }}
                            >
                              {tagChild}
                            </TweenOneGroup>
                          </div>
                          {inputVisible ? (
                            <Input
                              ref={inputRef}
                              type="text"
                              size="small"
                              style={{
                                width: 78,
                              }}
                              value={inputValue}
                              onChange={handleInputChange}
                              onBlur={handleInputConfirm}
                              onPressEnter={handleInputConfirm}
                            />
                          ) : (
                            <Tag onClick={showInput} style={tagPlusStyle}>
                              <PlusOutlined /> Хаяг оруулах
                            </Tag>
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item
                          label="Хот/аймаг"
                          name="cityProvince"
                          hasFeedback
                        >
                          <Select
                            showSearch
                            placeholder="Хот/аймгуудаас сонгох"
                            filterOption={false}
                            onSearch={handleSearchCity}
                            options={cityData}
                            onSelect={handleSelectCity}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item
                          label="Сум/Дүүрэг"
                          name="district"
                          hasFeedback
                        >
                          <Select
                            showSearch
                            placeholder="Сум дүүргээс сонгоно уу"
                            filterOption={false}
                            onSearch={handleSearchDistrict}
                            options={districtData}
                            disabled={districts.length <= 0 || !selectCity}
                            onSelect={handleSelectDistrict}
                          />
                        </Form.Item>
                      </div>
                      <div className="col-md-4">
                        <Form.Item label="Баг/Хороо" name="khoroo" hasFeedback>
                          <Select
                            showSearch
                            placeholder="Баг хорооноос сонгоно уу"
                            filterOption={false}
                            onSearch={handleSearchKhoroo}
                            options={khorooData}
                            disabled={
                              khorooData.length <= 0 ||
                              !selectCity ||
                              !selectDistrict
                            }
                          />
                        </Form.Item>
                      </div>

                      <div className="col-md-6">
                        <Form.Item
                          label="Гудамжын мэдээлэл"
                          name="address_st"
                          className="dark-input"
                          hasFeedback
                        >
                          <Input placeholder="Гудамжын мэдээлэл оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item
                          label="Ойролцоо хаягын мэдээлэл"
                          name="vicinity"
                          hasFeedback
                        >
                          <Input placeholder="Жишээ нь: Энхтайван өргөн чөлөө ний гудамж" />
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
                      Ангилал
                    </h6>
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
                    <Form.Item
                      label="Хаягийн хайлтанд"
                      className="dark-input switch-input"
                      name="isAddress"
                    >
                      <Switch
                        size="small"
                        checked={checkedRadio.isAddress}
                        onChange={(checked) =>
                          handleRadio(checked, "isAddress")
                        }
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
