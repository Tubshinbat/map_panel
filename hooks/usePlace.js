"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [places, setPlaces] = useState([]);
  const [singlePlace, setSinglePlace] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deletePlace = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/places/delete", { params: { id: ids } });
      await loadPlace();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadPlace = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/places?${query}`);

      if (result && result.data) {
        setPlaces(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createPlace = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/places", values);
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

  const updatePlace = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/places/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getPlace = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/places/${id}`);
      if (result && result.data) {
        setSinglePlace(result.data.data);
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
      await loadPlace();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    places,
    pagination,
    loadPlace,
    deletePlace,
    createPlace,
    getPlace,
    singlePlace,
    updatePlace,
  };
};
