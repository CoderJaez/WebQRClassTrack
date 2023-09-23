import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import Routers from "@routes/Routers";
import useAuthStore from "store/auth";
import { useNavigate } from "react-router-dom";
const theme = createTheme({
  fontFamily: "Poppins,Open Sans, sans-serif",
  primaryColor: "cyan",
});

const App: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <MantineProvider theme={theme}>
      <Routers />
    </MantineProvider>
  );
};

export default App;
