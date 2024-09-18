"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [districts, setCities] = useState([]);
  const [district, setDistrict] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteDistrict = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/districts/delete", { params: { id: ids } });
      await loadDistrict();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadDistrict = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/districts?${query}`);

      if (result && result.data) {
        setCities(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createDistrict = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/districts", values);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        return true;
      }
      setContentLoad(false);
      return false;
    } catch (err) {
      setContentLoad(false);
      setError(err);
      return false;
    }
  };

  const updateDistrict = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/districts/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
      setContentLoad(false);
    } catch (err) {
      setContentLoad(false);
      setError(err);
      return false;
    }
  };

  const getDistrict = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/districts/${id}`);
      if (result && result.data) {
        setDistrict(result.data.data);
      }
      setContentLoad(false);
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const getAllData = async () => {
    try {
      setContentLoad(true);
      const result = await axios.get("/districts/all");
      if (result && result.data) {
        setCities(result.data.data);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadDistrict();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    districts,
    pagination,
    loadDistrict,
    deleteDistrict,
    createDistrict,
    getDistrict,
    getAllData,
    district,
    updateDistrict,
  };
};
