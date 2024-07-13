"use client";
import axios from "axios-base";
import { useNotificationContext } from "context/notificationContext";
import { useEffect, useState } from "react";

export default () => {
  const [room, setRoom] = useState([]);
  const [singleRoom, setSingleRoom] = useState(null);
  const [pagination, setPagination] = useState(null);
  const { setError, setAlert, setContentLoad } = useNotificationContext();

  const deleteRoom = async (ids) => {
    try {
      setContentLoad(true);
      await axios.delete("/rooms/delete", { params: { id: ids } });
      await loadRoom();
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const loadRoom = async (query = "") => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/rooms?${query}`);

      if (result && result.data) {
        setRoom(result.data.data);
        setPagination(result.data.pagination);
      }
      setContentLoad(false);
    } catch (error) {
      setError(error);
      setContentLoad(false);
    }
  };

  const createRoom = async (values) => {
    try {
      setContentLoad(true);
      const result = await axios.post("/rooms", values);
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

  const updateRoom = async (values, slug) => {
    try {
      setContentLoad(true);
      const result = await axios.put(`/rooms/${slug}`, values);
      if (result && result.data) {
        setAlert("Амжилтай хадгаллаа");
        return true;
      }
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getRoom = async (id) => {
    try {
      setContentLoad(true);
      const result = await axios.get(`/rooms/${id}`);
      if (result && result.data) {
        setSingleRoom(result.data.data);
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
      await loadRoom();
    };

    fetchDatas()
      .then((result) => {})
      .catch((err) => {});
  }, []);

  return {
    room,
    pagination,
    loadRoom,
    deleteRoom,
    createRoom,
    getRoom,
    singleRoom,
    updateRoom,
  };
};
