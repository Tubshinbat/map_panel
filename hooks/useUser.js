"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteUser = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/users/delete", { params: { id: ids } });
      await loadUser();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadUser = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/users?${query}`);

      if (result && result.data) {
        setUsers(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createUser = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/users", values);
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

  const updateUser = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/users/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getUser = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/users/${id}`);
      if (result && result.data) {
        setUser(result.data.data);
        return true;
      }
      return false;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const changePassword = async (id, values) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/users/changepassword/${id}`, values);
      if (result && result.data) {
        setAlert("Амжилттай солигдлоо");
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
      await loadUser();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    users,
    pagination,
    loadUser,
    deleteUser,
    createUser,
    getUser,
    user,
    updateUser,
    changePassword,
  };
};
