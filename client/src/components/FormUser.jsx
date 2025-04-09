import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { read, update } from "../Functions/user";

export default function FormUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    role: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(params.id, form)
      .then((res) => {
        console.log(res);
        navigate("/info");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default || "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <SaveAsOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Employee Form
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={form.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="age"
                label="Age"
                id="age"
                autoComplete="age"
                value={form.age}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="role"
                label="Role"
                id="role"
                autoComplete="role"
                value={form.role}
                onChange={handleChange}
              />
              {/* Gender Select */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={form.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <MenuItem value="Men">Men</MenuItem>
                  <MenuItem value="Women">Women</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
