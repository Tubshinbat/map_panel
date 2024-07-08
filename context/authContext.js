"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./notificationContext";
import axios from "axios-base";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const { setError, setAlert, setContentLoad } = useNotificationContext();
  const router = useRouter();

  useEffect(() => {
    // Нэвтрэлтийн статусыг шалгах логик
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/users/checklogin");
        if (response && response.data) setIsLogin(response.data.success);
      } catch (error) {
        setIsLogin(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (data) => {
    setContentLoad(true);
    try {
      const result = await axios.post("users/login", data);
      if (result) {
        setUser(result.data.user);
        setIsLogin(true);
        setAlert("Амжилттай нэвтэрлээ");
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLogin(false);
      setError(error);
    }
    setContentLoad(false);
  };

  const verifyOTP = async (email, code) => {
    try {
      const result = await axios.post("/users/verifyotp", { email, code });
      if (result && result.data.success) return true;
    } catch (error) {
      setError(error);
      return false;
    }
  };

  const resetPassword = async (email, code, password) => {
    try {
      const result = await axios.post("/users/resetpassword", {
        email,
        code,
        password,
      });
      if (result && result.data.success) return true;
    } catch (error) {
      setError(error);
      return false;
    }
  };

  const getOTP = async (data) => {
    try {
      const result = await axios.post("users/forgot", data);
      if (result) {
        if (result.data.beforeOtp == false)
          setAlert("Баталгаажуулах код илгээллээ");
        return {
          success: result.data.success,
          beforeOtp: result.data.beforeOtp,
          resetPasswordExpire: result.data.resetPasswordExpire,
        };
      }
    } catch (error) {
      setError(error);
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, user, getOTP, verifyOTP, resetPassword, isLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
