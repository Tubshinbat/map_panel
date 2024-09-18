"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [khoroos, setCities] = useState([]);
  const [khoroo, setKhoroo] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteKhoroo = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/khoroos/delete", { params: { id: ids } });
      await loadKhoroo();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadKhoroo = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/khoroos?${query}`);

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

  const createKhoroo = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/khoroos", values);
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

  const updateKhoroo = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/khoroos/${slug}`, values);
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

  const getKhoroo = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/khoroos/${id}`);
      if (result && result.data) {
        setKhoroo(result.data.data);
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
      const result = await axios.get("/khoroos/all");
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
      await loadKhoroo();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    khoroos,
    pagination,
    loadKhoroo,
    deleteKhoroo,
    createKhoroo,
    getKhoroo,
    getAllData,
    khoroo,
    updateKhoroo,
  };
};
