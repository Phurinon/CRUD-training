import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      //   default: "#0A0F1C",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    },
  },
});

export default defaultTheme;
