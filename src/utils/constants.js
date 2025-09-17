export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.decluttr.mycityulife.com/decluttr/api"
    : "http://localhost:3002/decluttr/api";
