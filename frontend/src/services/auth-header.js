export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
      return { "access_token": user.access_token };
   } else {
    return {};
  }
}
