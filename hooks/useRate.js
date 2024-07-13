"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [rates, setRates] = useState([]);
  const [singleRate, setSingleRate] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteRate = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/rates/delete", { params: { id: ids } });
      await loadRate();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadRate = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/rates?${query}`);

      if (result && result.data) {
        setRates(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createRate = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/rates", values);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const updateRate = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/rates/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getRate = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/rates/${id}`);
      if (result && result.data) {
        setSingleRate(result.data.data);
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadRate();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    rates,
    pagination,
    loadRate,
    deleteRate,
    createRate,
    getRate,
    singleRate,
    updateRate,
  };
};
