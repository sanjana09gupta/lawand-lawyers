import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ConfigProvider } from "antd";
import { muiTheme, antdTheme } from "./theme";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import OpeningIntro from "./components/OpeningIntro";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CareersPage from "./pages/Careers";
import NewsPage from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import ServiceDetail from "./pages/ServiceDetail";
import ContactPage from "./pages/ContactPage";
import Booking from "./pages/Booking";
import NewPurchaseQuote from "./pages/NewPurchaseQuote";
import CorporateSocialResponsibility from "./pages/CorporateSocialResponsibility";
import TeamProfile from "./pages/TeamProfile";
import ConveyancingFees from "./pages/ConveyancingFees";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfigProvider theme={antdTheme}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop />
          <OpeningIntro />
          <CustomCursor />
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
                <Route path="/book-a-consultation" element={<Booking />} />
                <Route path="/services/residential-conveyancing/new-purchase-quote" element={<NewPurchaseQuote />} />
                <Route path="/services/residential-conveyancing/residential-conveyancing-fees" element={<ConveyancingFees />} />
                <Route path="/corporate-social-responsibility" element={<CorporateSocialResponsibility />} />
                <Route path="/team/:slug" element={<TeamProfile />} />
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
