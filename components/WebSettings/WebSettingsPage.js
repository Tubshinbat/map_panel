"use client";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { OneImageDrag } from "components/Generals/ImageDrag";
import PageNavItem from "components/Page/PagenavItem";
import { convertFromdata } from "lib/check";

//Hooks
import useWebInfo from "hooks/useWebinfo";
import base from "lib/base";

const requiredRule = {
  required: true,
  message: "Тус талбарыг заавал бөглөнө үү",
};

const Page = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [deleteFile, setDeleteFile] = useState([]);
  const [logo, setLogo] = useState({});
  const [deletePictures, setDeletePictures] = useState([]);
  const [whiteLogo, setWhiteLogo] = useState({});
  const [progress, setProgress] = useState(0);

  const { getWebInfo, webinfo, updateWebinfo } = useWebInfo();

  useEffect(() => {
    if (webinfo) {
      form.setFieldsValue({ ...webinfo });
      if (webinfo && webinfo.logo) {
        const data = {
          name: webinfo.logo,
          url: `${base.cdnUrl}/150x150/${webinfo.logo}`,
        };
        setLogo(data);
      }
      if (webinfo && webinfo.whiteLogo) {
        const data = {
          name: webinfo.whiteLogo,
          url: `${base.cdnUrl}/150x150/${webinfo.whiteLogo}`,
        };
        setWhiteLogo(data);
      }
    }
  }, [webinfo]);

  const handleAdd = async (values) => {
    if (logo && logo.name) values.logo = logo.name;
    if (whiteLogo && whiteLogo.name) values.whiteLogo = whiteLogo.name;

    if (!whiteLogo.name || !logo.name) {
      toastControl("error", "Лого оруулна уу");
    } else {
      if (deleteFile && deleteFile.length > 0) {
        deleteFile.map(async (file) => {
          await axios.delete("/imgupload", { data: { file: file } });
        });
      }

      const data = {
        ...values,
      };

      const sendData = convertFromdata(data);
      await updateWebinfo(sendData);
    }
  };

  // Functions

  const init = async () => {};

  const handleChange = (event) => {
    form.setFieldsValue({ policy: event });
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Ерөнхий тохиргоо</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
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

          <Form layout="vertical" form={form}>
            <div className="row">
              <div className="col-12">
                <div className="control-bottons">
                  <Button
                    key="submit"
                    htmlType="submit"
                    className="add-button"
                    onClick={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          handleAdd(values);
                        })
                        .catch((info) => {
                          // console.log(info);
                        });
                    }}
                  >
                    Хадгалах
                  </Button>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div class="card-header">
                        <h3 class="card-title">Лого оруулах</h3>
                      </div>
                      <div className="card-body">
                        <OneImageDrag
                          setDeletePictures={setDeleteFile}
                          setPhoto={setLogo}
                          photo={logo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div class="card-header">
                        <h3 class="card-title">Цагаан өнгөтэй лого оруулах</h3>
                      </div>
                      <div className="card-body">
                        <OneImageDrag
                          setDeletePictures={setDeleteFile}
                          setPhoto={setWhiteLogo}
                          photo={whiteLogo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-primary">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <Form.Item
                          label="Сайтын нэр"
                          name="name"
                          rules={[requiredRule]}
                          hasFeedback
                        >
                          <Input placeholder="Сайтын нэр оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-6">
                        <Form.Item
                          label="Утасны дугаар"
                          name="phone"
                          hasFeedback
                          tooltip=" (,) тавиад олон дугаар холбох боломжтой"
                        >
                          <Input placeholder="Холбоо барих утасны дугаараа оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-6">
                        <Form.Item label="Имэйл хаяг" name="email" hasFeedback>
                          <Input placeholder="Имэйл хаягаа оруулна уу" />
                        </Form.Item>
                      </div>
                      <div className="col-12">
                        <Form.Item
                          label="Сайтын дэлгэрэнгүй"
                          name="siteInfo"
                          hasFeedback
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                      </div>
                      <div className="col-12">
                        <Form.Item label="Хаяг" name="address" hasFeedback>
                          <TextArea rows={2} />
                        </Form.Item>
                      </div>
                      <div className="col-12">
                        <Form.Item
                          label="Сайтын дүрэм"
                          name="policy"
                          getValueFromEvent={(e) =>
                            e.target && e.target.getContent()
                          }
                        >
                          <Editor
                            apiKey="2nubq7tdhudthiy6wfb88xgs36os4z3f4tbtscdayg10vo1o"
                            init={{
                              height: 300,
                              menubar: false,
                              plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount image media  code  table  ",
                              ],
                              toolbar:
                                "undo redo | fontselect fontsizeselect formatselect blockquote  | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | link image | quickbars | media | code | tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                              file_picker_types: "image",
                              automatic_uploads: false,
                              file_picker_callback: function (cb, value, meta) {
                                var input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", "image/*");
                                input.onchange = async function () {
                                  var file = this.files[0];
                                  const fData = new FormData();
                                  fData.append("file", file);
                                  const res = await axios.post(
                                    "/imgupload",
                                    fData
                                  );
                                  const url = `${base.cdnUrl}` + res.data.data;
                                  cb(url);
                                };
                                input.click();
                              },
                            }}
                            onEditorChange={(event) => handleChange(event)}
                          />
                        </Form.Item>
                      </div>
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
