export const routes = {
  base:
    process.env.NODE_ENV === "production"
      ? "abes-acm.vercel.app"
      : "localhost:3000",
};
