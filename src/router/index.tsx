import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Spin from "@cfx-kit/ui-components/dist/Spin";
import TopLevelErrorBoundary from "@modules/TopLevelErrorBoundary";
import PredictionPage from "@pages/Prediction";

const AppRouter: React.FC = () => {
  return (
    <TopLevelErrorBoundary>
      <Routes>
        <Route path="/" element={<RouteWrapper />}>
          <Route path="/prediction/:id" element={<PredictionPage />}></Route>
          <Route path="/" element={<Navigate to="/prediction/0" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </TopLevelErrorBoundary>
  );
};

const PageLevelLoading: React.FC = () => (
  <Spin className="block mx-auto mt-180px text-(40px white-normal)" />
);

const RouteWrapper: React.FC = () => {
  return (
    <Suspense fallback={<PageLevelLoading />}>
      <Outlet />
    </Suspense>
  );
};

export default AppRouter;
