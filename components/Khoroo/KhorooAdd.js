"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";

// Hooks
import useKhoroo from "hooks/useKhoroo";
import usePolygon from "hooks/usePolygon";
import useCity from "hooks/useCity";
import useDistrict from "hooks/useDistrict";
import { useNotificationContext } from "context/notificationContext";

// Lib

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
  const { createKhoroo } = useKhoroo();
  const { loadCity, cities } = useCity();
  const { loadDistrict, districts } = useDistrict();
  const { polygons, loadPolygon } = usePolygon();

  // UseState
  const [polygonDatas, setPolygonDatas] = useState({});
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [selectCity, setSelectCity] = useState(null);
  const [isDistrict, setIsDistrict] = useState(true);

  // Config init

  const init = async () => {
    await loadPolygon("select=properties");
    await loadCity();
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
    if (districts && districts.length > 0 && !isDistrict) {
      setDistrictData(() =>
        districts.map((el) => ({
          value: el._id,
          label: el.name,
        }))
      );
    } else {
      setIsDistrict(true);
      setDistrictData([]);
      form.setFieldsValue({ district: null });
    }
  }, [districts]);

  // Handle functions

  const handleAdd = async (values) => {
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    const result = await createKhoroo(sendData);

    if (result)
      setTimeout(() => {
        router.push("/khoroo");
      }, 600);
  };

  const handleSearchPolygon = async (input, option) => {
    await loadPolygon(`select=properties&name=${input}`);
  };

  const handleSearchCity = async (input) => {
    await loadCity(`name=${input}`);
  };

  const handleSearchDistrict = async (input) => {
    await loadDistrict(`name=${input}&cityId=${selectCity}`);
  };

  const handleBack = () => {
    router.back();
  };

  const clear = () => {
    form.resetFields();
  };

  const handleSelectCity = async (selectId) => {
    if (selectId) {
      setSelectCity(selectId);
      await loadDistrict(`cityId=${selectId}`);
      setIsDistrict(false);
    } else setIsDistrict(true);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Баг/Хороо нэмэх</h1>
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
                        label="Хот/аймаг"
                        name="cityProvince"
                        rules={[requiredRule]}
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
                    <div className="col-md-12">
                      <Form.Item
                        label="Сум/Дүүрэг"
                        name="district"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Select
                          showSearch
                          placeholder="Сум дүүргээс сонгоно уу"
                          filterOption={handleSearchDistrict}
                          options={districtData}
                          disabled={isDistrict}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Баг/хорооны нэр"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Баг/хорооны нэрийг оруулна уу" />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <Form.Item
                        label="Баг/хорооны нэр Англи хэл дээр"
                        name="engName"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Сум/дүүргийн Англи нэрийг оруулна уу" />
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
