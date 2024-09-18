"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";

// Hooks
import useCity from "hooks/useCity";
import usePolygon from "hooks/usePolygon";
import { useNotificationContext } from "context/notificationContext";

// Lib

import { useRouter } from "next/navigation";
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
  const { updateCity, getCity, city } = useCity();
  const { polygons, loadPolygon, getPolygon, polygon } = usePolygon();

  // UseState
  const [polygonDatas, setPolygonDatas] = useState({});

  // Config init

  const init = async () => {
    await getCity(slug);
    await loadPolygon("select=properties");
  };

  useEffect(() => {
    (async () => {
      await init();
    })();
    return () => clear();
  }, []);

  useEffect(() => {
    if (polygons)
      setPolygonDatas(() =>
        polygons.map((el) => ({
          value: el._id,
          label:
            el.properties && `${el.properties.name} / ${el.properties.code} /`,
        }))
      );
  }, [polygons]);

  useEffect(() => {
    if (city) {
      if (city.polygon && city.polygon.properties) {
        const polygonData = {
          value: city.polygon._id,
          label: city.polygon.properties.name,
        };

        setPolygonDatas((prevDatas) => [polygonData, ...prevDatas]);
      }

      form.setFieldsValue({
        ...city,
        polygon: city.polygon && city.polygon._id,
      });
    }
  }, [city]);

  // Handle functions

  const handleEdit = async (values) => {
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    const result = await updateCity(sendData, slug);

    if (result)
      setTimeout(() => {
        router.push("/city-province");
      }, 600);
  };

  const handleSearchPolygon = async (input, option) => {
    await loadPolygon(`select=properties&name=${input}`);
  };

  const handleBack = () => {
    router.back();
  };

  const clear = () => {
    form.resetFields();
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Хот/Аймаг нэмэх</h1>
            </div>
          </div>
        </div>
      </section>
      <div className="content">
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
                        label="Хот/аймгийн нэр"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Хот/аймгийн нэрийг оруулна уу" />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <Form.Item
                        label="Хот/аймгийн нэр Англи хэл дээр"
                        name="engName"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Хот/аймгийн Англи нэрийг оруулна уу" />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Полигон дүрс"
                        name="polygon"
                        hasFeedback
                      >
                        <Select
                          showSearch
                          placeholder="Полигон дүрснүүдээс сонгох"
                          filterOption={false}
                          onSearch={handleSearchPolygon}
                          options={polygonDatas}
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
                  <h6 className="card-title card-title-small mb-0">Тохиргоо</h6>
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
    </>
  );
};

export default Page;
