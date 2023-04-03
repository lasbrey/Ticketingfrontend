import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemedSuspense from "./pages/components/ThemedSuspense";
import Page404 from "./pages/page404";
import Header from "./pages/components/admin/Header.jsx";
import HeaderTwo from "./pages/components/Header.jsx";
import routesTwo from "./routes/index";
import routes from "./routes/admin/index";
import instance from "./middleware/axios";

function App() {
  const routeComponents = routes.map((route, i) => (
    <Route
      path={route.path}
      loader={async () => {
        const response = await instance.get(`/tickets`);
        return response.data;
      }}
      element={
        <div>
          <Header />
          <route.component />
        </div>
      }
      key={i}
    />
  ));
  const routeComponentsTwo = routesTwo.map((route, i) => (
    <Route
      path={route.path}
      element={
        <div>
          <HeaderTwo />
          <route.component />
        </div>
      }
      key={i}
    />
  ));
  return (
    <div className="bg-gray-100">
      <Suspense fallback={<ThemedSuspense />}>
        <Routes>
          {routeComponents}
          {routeComponentsTwo}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
