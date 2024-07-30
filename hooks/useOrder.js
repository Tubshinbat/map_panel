"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteOrder = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/orders/delete", { params: { id: ids } });
      await loadOrder();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadOrder = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/orders?${query}`);

      if (result && result.data) {
        setOrders(result.data.data);
        setPagination(result.data.pagination);
      }

      setContentLoad(false);
    } catch (error) {
      setContentLoad(false);
      setError(error);
    }
  };

  const createOrder = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/orders", values);
      if (result && result.data) {
        setAlert("Амжилттай нэмэгдлээ");
        return true;
      }
      setContentLoad(false);
      return false;
    } catch (error) {
      setContentLoad(false);
      setError(error);
      return false;
    }
  };

  const updateOrder = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/orders/${slug}`, values);

      if (result && result.data) {
        setAlert("Амжилттай хадгаллаа");
        setContentLoad(false);
        return true;
      }

      setContentLoad(false);
      return false;
    } catch (err) {
      setContentLoad(false);
      setError(err);
      return false;
    }
  };

  const getOrder = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/orders/${id}`);
      if (result && result.data) {
        setOrder(result.data.data);
        setContentLoad(false);
        return true;
      }

      setContentLoad(false);
      return false;
    } catch (error) {
      setError(error);
      setContentLoad(false);
      return false;
    }
  };

  useEffect(() => {
    const fetchDatas = async () => {
      await loadOrder();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    orders,
    pagination,
    loadOrder,
    deleteOrder,
    createOrder,
    getOrder,
    order,
    updateOrder,
  };
};
