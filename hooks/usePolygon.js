"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [polygons, setPolygons] = useState([]);
  const [polygon, setPolygon] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const deletePolygon = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/polygons/delete", { params: { id: ids } });
      await loadPolygon("select=properties");
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadPolygon = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/polygons?${query}`);

      if (result && result.data) {
        setPolygons(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createPolygon = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/polygons", values, config);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        setContentLoad(false);
        return true;
      }
      setContentLoad(false);
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const updatePolygon = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/polygons/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжиллтай хадгаллаа");
        setContentLoad(false);
        return true;
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  const getPolygon = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/polygons/${id}`);
      if (result && result.data) {
        setPolygon(result.data.data);
      }
      setContentLoad(false);
    } catch (err) {
      setError(err);
      setContentLoad(false);
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadPolygon("select=properties");
    };

    fetchDatas()
      .then()
      .catch((err) => setError(err));
  }, []);

  return {
    loadPolygon,
    polygons,
    polygon,
    pagination,
    getPolygon,
    createPolygon,
    deletePolygon,
    updatePolygon,
  };
};
