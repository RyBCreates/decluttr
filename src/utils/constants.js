export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.decluttr.mycityulife.com"
    : "http://localhost:3002";

export const API_URL = "/decluttr/api";
