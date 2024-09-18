"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteCity = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/cities/delete", { params: { id: ids } });
      await loadCity();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadCity = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/cities?${query}`);

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

  const createCity = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/cities", values);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        return true;
      }
      setContentLoad(false);
      return false;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const updateCity = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/cities/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
      setContentLoad(false);
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getCity = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/cities/${id}`);
      if (result && result.data) {
        setCity(result.data.data);
        return true;
      }
      setContentLoad(false);
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const changePosition = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/cities/change", data);

      if (result) {
        getAllData();
        setAlert("Байршил солигдлоо");
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const getAllData = async () => {
    try {
      setContentLoad(true);
      const result = await axios.get("/cities/all");
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
      await loadCity();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    cities,
    pagination,
    loadCity,
    deleteCity,
    createCity,
    getCity,
    getAllData,
    changePosition,
    city,
    updateCity,
  };
};
