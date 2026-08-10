import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { muiTheme, antdTheme } from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CareersPage from "./pages/Careers";
import NewsPage from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfigProvider theme={antdTheme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-paper">
            <ScrollProgress />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
}
