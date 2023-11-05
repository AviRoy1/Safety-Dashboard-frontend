import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/user";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login(username, password));
  };

  return (
    <Container maxWidth="xl" style={{ height: "100vh" }}>
      <Grid container style={{ height: "100%" }}>
        {/* Left half with an image */}
        <Grid
          item
          xs={6}
          style={{
            backgroundImage: "url(your-image.jpg)",
            backgroundSize: "cover",
          }}
        >
          {/* You can adjust the image styles here */}
        </Grid>

        {/* Right half with the sign-in form */}
        <Grid item xs={6} container justifyContent="center" alignItems="center">
          <Paper
            elevation={3}
            style={{
              padding: "100px",
              textAlign: "center",
              backgroundColor: "#F9F9FF",
            }}
          >
            <Typography variant="h4" style={{ color: "#434EFE" }}>
              Sign in
            </Typography>
            <Typography variant="subtitle1" style={{ margin: "10px" }}>
              Please enter your details
            </Typography>
            <TextField
              label="Username"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              style={{ width: "100%" }}
              margin="normal"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              style={{ width: "100%" }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember password"
                />
                <Typography style={{ marginLeft: "80px", marginTop: "10px" }}>
                  Forgot Password?
                </Typography>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", backgroundColor: "#434EFE" }}
                  onClick={loginHandler}
                >
                  Sign In
                </Button>
              </div>
              <div>
                <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
                  Don't have an account? <Link href="#">Sign up</Link>
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
