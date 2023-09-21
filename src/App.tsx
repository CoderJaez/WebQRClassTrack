import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import Routers from "@routes/Routers";
const theme = createTheme({
  fontFamily: "Poppins,Open Sans, sans-serif",
  primaryColor: "cyan",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Routers />
    </MantineProvider>
  );
};

export default App;
