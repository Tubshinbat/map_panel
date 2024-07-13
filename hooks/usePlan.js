"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [plans, setPlans] = useState([]);
  const [singlePlan, setSinglePlan] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deletePlan = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/plans/delete", { params: { id: ids } });
      await loadPlan();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadPlan = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/plans?${query}`);

      if (result && result.data) {
        setPlans(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createPlan = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/plans", values);
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

  const updatePlan = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/plans/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getPlan = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/plans/${id}`);
      if (result && result.data) {
        setSinglePlan(result.data.data);
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
      await loadPlan();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    plans,
    pagination,
    loadPlan,
    deletePlan,
    createPlan,
    getPlan,
    singlePlan,
    updatePlan,
  };
};
