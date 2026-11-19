import { lazy, Suspense, useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { AppLayout } from "./components/AppLayout"

// Komponen bantu untuk memaksa scroll ke atas setiap pindah halaman
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
)
const LocatorPage = lazy(() =>
  import("./pages/LocatorPage").then((module) => ({
    default: module.LocatorPage,
   })),
)
const StationPage = lazy(() =>
  import("./pages/StationPage").then((module) => ({
    default: module.StationPage,
   })),
)
const GuidePage = lazy(() =>
  import("./pages/GuidePage").then((module) => ({ default: module.GuidePage })),
)

export default function App() {
  return (
    <BrowserRouter>
      {/* Letakkan di dalam BrowserRouter agar mendeteksi perpindahan rute */}
      <ScrollToTop />
      
      <Suspense
        fallback={
          <div className="route-loading">
            <span />
            <strong>Loading SortSense…</strong>
          </div>
        }
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-bin" element={<LocatorPage />} />
            <Route path="/stations/:id" element={<StationPage />} />
            <Route path="/sorting-guide" element={<GuidePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}