"use client";

import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [placeCategories, setPlaceCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const loadPlaceCategories = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get("/place-categories");
      if (result && result.data) setPlaceCategories(result.data.data);
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const getPlaceCategory = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/place-categories/${id}`);
      if (result && result.data) setCategory(result.data.data);
      setContentLoad(false);
      return true;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const createPlaceCategory = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/place-categories", data);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        await loadPlaceCategories();
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const updatePlaceCategory = async (data, id) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/place-categories/${id}`, data);
      if (result && result.data) {
        setAlert("Амжилттай шинчлэгдлээ");
        await loadPlaceCategories();
        return true;
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  const deletePlaceCategory = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.delete(`place-categories/${id}`);
      if (result && result.data) {
        setAlert("Өгөгдөл устгадлаа");
        await loadPlaceCategories();
        return true;
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  const changePosition = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/place-categories/change", data);
      if (result && result.data) {
        setPlaceCategories(result.data.data);
        setAlert("Байршил солигдлоо");
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadPlaceCategories();
    };

    fetchDatas()
      .then(() => {})
      .catch((err) => {
        setError(err);
      });
  }, []);

  return {
    placeCategories,
    loadPlaceCategories,
    getPlaceCategory,
    setCategory,
    category,
    changePosition,
    updatePlaceCategory,
    createPlaceCategory,
    deletePlaceCategory,
  };
};
