import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("services", [
    index("features/services/pages/services-page.tsx"),
  ]),
] satisfies RouteConfig;
