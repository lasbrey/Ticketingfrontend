import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemedSuspense from "./pages/components/ThemedSuspense";
// import Protected from ".components/Protected";
import routes from "./routes/index";
import Page404 from "./pages/page404";
import Header from "./pages/components/Header.jsx";
import Footer from "./pages/components/Footer.jsx";

function App() {
  const routeComponents = routes.map((route, i) => (
    <Route
      path={route.path}
      element={
        // <Protected>
        <route.component />
        // </Protected>
      }
      key={i}
    />
  ));
  return (
    <>
      <Header />
      <div className="mb-10">
        <Suspense fallback={<ThemedSuspense />}>
          <Routes>
            {routeComponents}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
