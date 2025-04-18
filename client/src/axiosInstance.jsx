// src/axiosInstance.js
import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // ปรับให้ตรงกับ backend ของคุณ
});

// Interceptor สำหรับตรวจจับ token ที่หมดอายุ
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isExpired =
      error.response &&
      (error.response.status === 401 ||
        error.response.data.message === "jwt expired");

    if (isExpired) {
      try {
        const result = await Swal.fire({
          title: "Session Expired",
          text: "Please login again.",
          icon: "warning",
          confirmButtonText: "OK",
          allowOutsideClick: false, // ไม่ให้คลิกนอก popup แล้วหาย
          allowEscapeKey: false, // ไม่ให้กด Esc เพื่อปิด
        });

        if (result.isConfirmed) {
          localStorage.clear();
          window.location.href = "/login"; // เปลี่ยนเส้นทางไปยังหน้าล็อกอินหลังจากผู้ใช้กด OK
        }
      } catch (error) {
        console.error("Error showing the popup", error);
      }
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authtoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
