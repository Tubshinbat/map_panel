"use client";

import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [socials, setSocials] = useState([]);
  const [social, setSocial] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const loadSocials = async () => {
    try {
      setContentLoad(true);
      const result = await axios.get("/socials");
      if (result && result.data) setSocials(result.data.data);
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const getSocial = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/socials/${id}`);
      if (result && result.data) setSocial(result.data.data);
      setContentLoad(false);
      return true;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const createSocial = async (data) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/socials", data);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        await loadSocials();
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const updateSocial = async (data, id) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/socials/${id}`, data);
      if (result && result.data) {
        setAlert("Амжилттай шинчлэгдлээ");
        await loadSocials();
        return true;
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  const deleteSocial = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.delete(`socials/${id}`);
      if (result && result.data) {
        setAlert("Өгөгдөл устгадлаа");
        await loadSocials();
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
      await loadSocials();
    };

    fetchDatas()
      .then(() => {})
      .catch((err) => {
        setError(err);
      });
  }, []);

  return {
    socials,
    loadSocials,
    getSocial,
    social,
    updateSocial,
    createSocial,
    deleteSocial,
  };
};
