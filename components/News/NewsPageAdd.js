"use client";
import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Switch,
  Tree,
  Upload,
  message,
} from "antd";

import { Editor } from "@tinymce/tinymce-react";
import { slugify } from "transliteration";

// Components
import TemplateSettings from "components/Generals/TemplateSettings";
import Header from "components/Header/Header";
import Side from "components/Side/Side";

// Hooks
import useNewsCategories from "hooks/useNewsCategories";
import { useNotificationContext } from "context/notificationContext";

// Lib
import { menuGenerateData } from "lib/menuGenerate";
import { buildFileInput, deleteImage, uploadImage } from "lib/files";
import ImageDrag from "components/Generals/ImageDrag";
import useNews from "hooks/useNews";
import { useRouter } from "next/navigation";
import { convertFromdata } from "lib/check";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { createNews } = useNews();
  const [pictures, setPictures] = useState([]);
  const [deletePictures, setDeletePictures] = useState([]);
  const [gData, setGData] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState({
    status: true,
    star: false,
  });
  const { newsCategories } = useNewsCategories();
  const [checkedKeys, setCheckedKeys] = useState([]);

  // Config init

  useEffect(() => {
    return () => clear();
  }, []);

  useEffect(() => {
    if (newsCategories) {
      setGData(menuGenerateData(newsCategories));
    }
  }, [newsCategories]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleAdd = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);

    if (Array.isArray(deletePictures) && deletePictures.length > 0) {
      deletePictures.map(async (img) => await deleteImage(img));
    }

    const data = {
      ...values,
      star: checkedRadio.star || false,
      status: checkedRadio.status || true,
      categories: [...checkedKeys],
    };

    if (data.categories.length <= 0) delete data.categories;
    const sendData = convertFromdata(data);
    const result = await createNews(sendData);
    if (result)
      setTimeout(() => {
        router.push("/news");
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

  const handleName = (event) => {
    form.setFieldValue("slug", slugify(event.target.value));
  };

  // -- TREE FUNCTIONS

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  return (
    <>
      <div className="container-fluid">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Нийтлэл нэмэх</h1>
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
                    <div className="col-md-12">
                      <Form.Item
                        label="Мэдээний гарчиг"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input
                          placeholder="Мэдээний гарчиг оруулна уу"
                          onChange={handleName}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Хаяг"
                        name="slug"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Хаяг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Мэдээний дэлгэрэнгүй"
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

                  <Form.Item
                    className="dark-input"
                    label="Нийтлэгдсэн огноо"
                    name="createAt"
                  >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
    </>
  );
};

export default Page;
