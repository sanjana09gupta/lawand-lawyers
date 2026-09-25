import { lazy, Suspense } from "react";
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

function RouteLoader() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <img src="/images/logo-icon.png" alt="" width="40" height="40" />
      <span>Loading Law &amp; Lawyers</span>
    </div>
  );
}

const About = lazy(() => import("./pages/About"));
const CareersPage = lazy(() => import("./pages/Careers"));
const NewsPage = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Booking = lazy(() => import("./pages/Booking"));
const ConveyancingFees = lazy(() => import("./pages/ConveyancingFees"));
const NewPurchaseQuote = lazy(() => import("./pages/NewPurchaseQuote"));
const CorporateSocialResponsibility = lazy(() => import("./pages/CorporateSocialResponsibility"));
const TeamProfile = lazy(() => import("./pages/TeamProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/news/:slug" element={<NewsDetail />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/book-a-consultation" element={<Booking />} />
                  <Route path="/services/residential-conveyancing/fees" element={<ConveyancingFees />} />
                  <Route path="/services/residential-conveyancing/new-purchase-quote" element={<NewPurchaseQuote />} />
                  <Route path="/corporate-social-responsibility" element={<CorporateSocialResponsibility />} />
                  <Route path="/team/:slug" element={<TeamProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeProvider>
  );
}
