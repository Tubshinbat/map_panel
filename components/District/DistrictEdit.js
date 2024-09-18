"use client";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";

// Hooks
import useDistrict from "hooks/useDistrict";
import usePolygon from "hooks/usePolygon";
import useCity from "hooks/useCity";
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
  const { updateDistrict, getDistrict, district } = useDistrict();
  const { loadCity, cities } = useCity();
  const { polygons, loadPolygon, getPolygon, polygon } = usePolygon();

  // UseState
  const [polygonDatas, setPolygonDatas] = useState({});
  const [cityData, setCityData] = useState([]);

  // Config init

  const init = async () => {
    await loadPolygon("select=properties");
    await loadCity();
    await getDistrict(slug);
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
    if (district) {
      if (district.polygon && district.polygon.properties) {
        const polygonData = {
          value: district.polygon._id,
          label: district.polygon.properties.name,
        };

        const isDuplicate = polygonDatas.some(
          (data) => data.value === polygonData.value
        );

        if (!isDuplicate)
          setPolygonDatas((prevDatas) => [polygonData, ...prevDatas]);
      }

      if (district.cityProvince) {
        const cdata = {
          value: district.cityProvince._id,
          label: district.cityProvince.name,
        };

        const isDuplicate = cityData.some((data) => data.value === cdata.value);

        if (!isDuplicate) setCityData((prevDatas) => [cdata, ...prevDatas]);
      }

      form.setFieldsValue({
        ...district,
        polygon: district.polygon && district.polygon._id,
        cityProvince: district.cityProvince && district.cityProvince._id,
      });
    }
  }, [district]);

  // Handle functions

  const handleEdit = async (values) => {
    const data = {
      ...values,
    };

    const sendData = convertFromdata(data);
    const result = await updateDistrict(sendData, slug);

    if (result)
      setTimeout(() => {
        router.push("/district");
      }, 600);
  };

  const handleSearchPolygon = async (input, option) => {
    await loadPolygon(`select=properties&name=${input}`);
  };

  const handleSearchCity = async (input) => {
    await loadCity(`name=${input}`);
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
              <h1>Сум/Дүүрэг засварлах</h1>
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
                        />
                      </Form.Item>
                    </div>
                    <div className="col-md-12">
                      <Form.Item
                        label="Сум/дүүргийн нэр"
                        name="name"
                        className="dark-input"
                        rules={[requiredRule]}
                        hasFeedback
                      >
                        <Input placeholder="Сум/дүүргийн нэрийг оруулна уу" />
                      </Form.Item>
                    </div>

                    <div className="col-md-12">
                      <Form.Item
                        label="Сум/дүүргийн нэр Англи хэл дээр"
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
