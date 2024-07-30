"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [singleBankAccount, setSingleBankAccount] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteBankAccount = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/bankaccounts/delete", { params: { id: ids } });
      await loadBankAccount();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadBankAccount = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/bankaccounts?${query}`);

      if (result && result.data) {
        setBankAccounts(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createBankAccount = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/bankaccounts", values);
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

  const updateBankAccount = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/bankaccounts/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getBankAccount = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/bankaccounts/${id}`);
      if (result && result.data) {
        setSingleBankAccount(result.data.data);
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
      await loadBankAccount();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    bankAccounts,
    pagination,
    loadBankAccount,
    deleteBankAccount,
    createBankAccount,
    getBankAccount,
    singleBankAccount,
    updateBankAccount,
  };
};
