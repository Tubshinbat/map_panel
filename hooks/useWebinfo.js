"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [webinfo, setWebinfo] = useState([]);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const createWebinfo = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/webinfos", values);
      if (result && result.data) {
        setAlert("Амжилтай нэмэгдлээ");
        setWebinfo(result.data.data);
        return true;
      }
      setContentLoad(false);
      return false;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  const updateWebinfo = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/webinfos`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
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

  const getWebinfo = async () => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/webinfos`);
      if (result && result.data) {
        setWebinfo(result.data.data);
        setContentLoad(false);
        return true;
      }
      setContentLoad(false);
      return false;
    } catch (err) {
      setError(err);
      setContentLoad(false);
      return false;
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await getWebinfo();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    webinfo,
    getWebinfo,
    createWebinfo,
    updateWebinfo,
  };
};
