import { lazy } from "react";

const routes = [
  {
    label: "",
    path: "/",
    exact: true,
    component: lazy(() => import("./pages/HomePage")),
    privated: false,
    restricted: true,
  },
  {
    label: "Регистация",
    path: "/register",
    exact: true,
    component: lazy(() => import("./pages/RegistrationPage")),
    privated: false,
    restricted: true,
  },
  {
    label: "Вход",
    path: "/login",
    exact: true,
    component: lazy(() => import("./pages/LoginPage")),
    privated: false,
    restricted: true,
  },
  {
    label: "Дневник",
    path: "/diary",
    exact: true,
    component: lazy(() => import("./pages/DiaryPage")),
    privated: true,
    restricted: false,
  },
  {
    label: "Калькулятор",
    path: "/calculator",
    exact: true,
    component: lazy(() => import("./pages/CalculatorPage")),
    privated: true,
    restricted: false,
  },
];

export default routes;
