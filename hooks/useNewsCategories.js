"use client";

import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [newsCategories, setNewsCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const loadNewsCategories = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get("/news-categories");
      if (result && result.data) setNewsCategories(result.data.data);
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const getNewsCategory = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/news-categories/${id}`);
      if (result && result.data) setCategory(result.data.data);
      setContentLoad(false);
      return true;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const createNewsCategory = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/news-categories", data);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        await loadNewsCategories();
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const updateNewsCategory = async (data, id) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/news-categories/${id}`, data);
      if (result && result.data) {
        setAlert("Амжилттай шинчлэгдлээ");
        await loadNewsCategories();
        return true;
      }
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  const changePosition = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/news-categories/change", data);
      if (result && result.data) {
        setNewsCategories(result.data.data);
        setAlert("Байршил солигдлоо");
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const deleteMenu = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.delete(`/news-categories/${id}`);
      if (result && result.data) {
        setAlert("Өгөгдөл устгадлаа");
        loadNewsCategories();
        return true;
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadNewsCategories();
    };

    fetchDatas()
      .then(() => {})
      .catch((err) => {
        setError(err);
      });
  }, []);

  return {
    newsCategories,
    loadNewsCategories,
    getNewsCategory,
    setCategory,
    category,
    deleteMenu,
    changePosition,
    updateNewsCategory,
    createNewsCategory,
  };
};
