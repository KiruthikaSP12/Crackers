import { buildDashboard } from "../data/store.js";

export const getDashboardData = (_req, res) => {
  res.json(buildDashboard());
};
