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

import { Editor } from "@tinymce/tinymce-react";
import { slugify } from "transliteration";

// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

// Hooks
import usePlace from "hooks/usePlace";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { menuGenerateData } from "lib/menuGenerate";
import { buildFileInput, deleteImage, uploadImage } from "lib/files";
import ImageDrag from "components/Generals/ImageDrag";
import useRoom from "hooks/useRoom";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";
import TextArea from "antd/es/input/TextArea";
import base from "lib/base";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { updateRoom, getRoom, singleRoom } = useRoom();
  const [pictures, setPictures] = useState([]);
  const [deletePictures, setDeletePictures] = useState([]);
  const [placeDatas, setPlaces] = useState([]);
  const [gData, setGData] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
  });
  const { places, loadPlace } = usePlace();
  const [checkedKeys, setCheckedKeys] = useState([]);

  // Config init

  useEffect(() => {
    const fetchData = async () => {
      await getRoom(slug);
    };

    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (places) {
      setPlaces(() => places.map((el) => ({ value: el._id, label: el.name })));
    }
  }, [places]);

  useEffect(() => {
    if (singleRoom) {
      form.setFieldsValue({
        ...singleRoom,
        place: singleRoom.place._id,
      });

      setCheckedRadio(() => ({
        status: singleRoom.status,
      }));
      if (singleRoom.pictures && singleRoom.pictures.length > 0)
        setPictures(
          singleRoom.pictures.map((img) => ({
            name: img,
            url: `${base.cdnUrl}/${img}`,
          }))
        );
      else setPictures(() => []);
    }
  }, [singleRoom]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleEdit = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);
    else values.pictures = [];

    if (Array.isArray(deletePictures) && deletePictures.length > 0) {
      deletePictures.map(async (img) => await deleteImage(img));
    }

    const data = {
      ...values,
      status: checkedRadio.status || true,
    };

    const sendData = convertFromdata(data);
    const result = await updateRoom(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/rooms");
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

  const handleSearch = async (input, option) => {
    await loadPlace(`name=${input}`);
  };

  return (
    <>
      <div className="page-wrapper">
        <Side />
        <Header />
        <div className="body-wrapper">
          <div className="container-fluid">
            <div className="card card-body py-3">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="d-sm-flex align-items-center justify-space-between">
                    <h4 className="mb-4 mb-md-0 card-title">Өрөө засварлах</h4>
                  </div>
                </div>
              </div>
            </div>

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
                            label="Гарчиг"
                            name="name"
                            className="dark-input"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Гарчиг оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-md-12">
                          <Form.Item
                            label="Газар"
                            name="place"
                            className="dark-input"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Select
                              showSearch
                              placeholder="Газруудаас сонгонго уу"
                              filterOption={false}
                              onSearch={handleSearch}
                              options={placeDatas}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-12">
                          <Form.Item
                            label="Богино мэдээлэл"
                            name="shortAbout"
                            className="dark-input"
                            hasFeedback
                          >
                            <TextArea />
                          </Form.Item>
                        </div>

                        <div className="col-md-12">
                          <Form.Item
                            label="Дэлгэрэнгүй"
                            name="details"
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
                                skin: "oxide-dark",
                                content_css: "dark",
                                setup: (editor) => {},
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
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
                        <div className="col-md-4">
                          <Form.Item
                            label="Үнэ"
                            name="price"
                            className="dark-input"
                            hasFeedback
                          >
                            <InputNumber
                              placeholder="Үнэ оруулна уу"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <Form.Item
                            label="Орны тоо"
                            name="bed"
                            className="dark-input"
                            hasFeedback
                          >
                            <InputNumber
                              placeholder="Орны тоо оруулна уу"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-md-4">
                          <Form.Item
                            label="Багтаамж"
                            name="human"
                            className="dark-input"
                            hasFeedback
                          >
                            <InputNumber
                              placeholder="Орох боломжтой хүний тоо"
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
                          checked={checkedRadio && checkedRadio.status}
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
        </div>

        <TemplateSettings />
      </div>
    </>
  );
};

export default Page;
