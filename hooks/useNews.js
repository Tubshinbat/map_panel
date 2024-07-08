"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [news, setNews] = useState([]);
  const [singleNews, setSingleNews] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteNews = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/news/delete", { params: { id: ids } });
      await loadNews();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadNews = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/news?${query}`);

      if (result && result.data) {
        setNews(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createNews = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/news", values);
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

  const updateNews = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/news/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getNews = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/news/${id}`);
      if (result && result.data) {
        setSingleNews(result.data.data);
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
      await loadNews();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    news,
    pagination,
    loadNews,
    deleteNews,
    createNews,
    getNews,
    singleNews,
    updateNews,
  };
};
