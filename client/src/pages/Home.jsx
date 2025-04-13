import React from "react";
import { Button } from "@mui/material";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("authtoken");
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-4xl font-bold">WELCOME TO HOME PAGE</div>
        {!isLoggedIn && ( // แสดงปุ่มเฉพาะตอนที่ยังไม่ล็อกอิน
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href={"/login"}
            >
              Get Start
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
