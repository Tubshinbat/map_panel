"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [account, setAccount] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const loadQpayAccount = async () => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/qpayaccounts/getuser`);

      if (result && result.data) {
        setAccount(result.data.data);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createQpayAccount = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/qpayaccounts/createuser", values);
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

  const updateQpayAccount = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/qpayaccounts/updateuser`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadQpayAccount();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    account,
    createQpayAccount,
    loadQpayAccount,
    updateQpayAccount,
  };
};
