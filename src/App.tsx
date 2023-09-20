import React from "react";
import AdminLayout from "@shared/layouts/AdminLayout";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
const theme = createTheme({
  fontFamily: "Poppins,Open Sans, sans-serif",
  primaryColor: "cyan",
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <AdminLayout />
    </MantineProvider>
  );
};

export default App;
