"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, Switch, Tree, Upload, message } from "antd";
import axios from "axios-base";
import { Editor } from "@tinymce/tinymce-react";

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
import base from "lib/base";
import { convertFromdata } from "lib/check";

// INIT DATA
const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = ({ params: { slug } }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { contentLoad, setError } = useNotificationContext();
  const { updateNews, getNews, singleNews } = useNews();
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
    const fetchData = async () => {
      await getNews(slug);
    };
    fetchData().then().catch();
    return () => clear();
  }, []);

  useEffect(() => {
    if (newsCategories) {
      setGData(menuGenerateData(newsCategories));
    }
  }, [newsCategories]);

  useEffect(() => {
    if (singleNews) {
      form.setFieldsValue({
        ...singleNews,
        details: singleNews.details,
      });

      setCheckedRadio(() => ({
        star: singleNews.star,
        status: singleNews.status,
      }));

      if (singleNews.pictures && singleNews.pictures.length > 0)
        setPictures(
          singleNews.pictures.map((img) => ({
            name: img,
            url: `${base.cdnUrl}/${img}`,
          }))
        );
      else setPictures(() => []);

      if (singleNews.categories && singleNews.categories.length > 0) {
        setCheckedKeys(() => {
          return singleNews.categories.map((cat) => cat._id);
        });
      }
    }
  }, [singleNews]);

  // Handle functions
  const handleEditor = (event) => {
    form.setFieldsValue({ details: event });
  };

  const handleEdit = async (values) => {
    if (Array.isArray(pictures) && pictures.length > 0)
      values.pictures = pictures.map((el) => el.name);
    else values.pictures = [];

    const data = {
      ...values,
      star: checkedRadio.star || false,
      status: checkedRadio.status || true,
      categories: [...checkedKeys],
    };

    if (data.categories.length <= 0) data.categories = [];

    if (Array.isArray(deletePictures) && deletePictures.length > 0)
      deletePictures.map(async (img) => await deleteImage(img));

    const sendData = convertFromdata(data);

    const result = await updateNews(sendData, slug);
    if (result)
      setTimeout(() => {
        router.push("/news");
      }, 600);
  };

  const handleRadio = (value, type) => {
    setCheckedRadio((bc) => ({ ...bc, [type]: value }));
  };

  const clear = () => {
    form.resetFields();
    setPictures([]);
    setCheckedKeys([]);
    setGData([]);
  };

  // -- TREE FUNCTIONS

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
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
                <div className="col-12">
                  <div className="d-sm-flex align-items-center justify-space-between">
                    <h4 className="mb-4 mb-md-0 card-title">Мэдээ нэмэх</h4>
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
                        <div className="col-12">
                          <Form.Item
                            label="Мэдээний гарчиг"
                            name="name"
                            className="dark-input"
                            rules={[requiredRule]}
                            hasFeedback
                          >
                            <Input placeholder="Мэдээний гарчиг оруулна уу" />
                          </Form.Item>
                        </div>
                        <div className="col-12">
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
                              initialValue={form.getFieldValue("detials")}
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
                          onClick={() => router.back()}
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
