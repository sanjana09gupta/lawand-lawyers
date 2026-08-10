import { createTheme } from "@mui/material/styles";
import type { ThemeConfig } from "antd";

// Brand blues sampled from the Law and Lawyers logo mark.
export const brand = {
  950: "#0a1122",
  900: "#101b38",
  850: "#172750",
  800: "#1d3468",
  700: "#22458a",
  600: "#2657a3",
  500: "#2f74bd",
  400: "#4a97d6",
  300: "#7fbde5",
  200: "#b8dcf0",
  100: "#e3f1fa",
};

export const muiTheme = createTheme({
  palette: {
    primary: { main: brand[700], light: brand[400], dark: brand[900], contrastText: "#fff" },
    secondary: { main: brand[400] },
    text: { primary: "#0d1424", secondary: "#4a5468" },
    background: { default: "#fcfdfe", paper: "#ffffff" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif' },
    h2: { fontFamily: '"Fraunces", Georgia, serif' },
    h3: { fontFamily: '"Fraunces", Georgia, serif' },
    h4: { fontFamily: '"Fraunces", Georgia, serif' },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingLeft: 22, paddingRight: 22 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: brand[700],
    colorLink: brand[600],
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    borderRadius: 14,
  },
};
