export function getClientUrl() {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://genealogy-site.herokuapp.com";
}

export function getServerUrl() {
  return process.env.NODE_ENV == "development"
    ? "http://localhost:4000"
    : "https://genealogy-site.herokuapp.com";
}
