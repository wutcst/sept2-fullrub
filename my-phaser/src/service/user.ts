import { request } from "./request";
function loginApi(data) {
  return request.post("/user/login", data);
}
function registerApi(data) {
  return request.post("/user/register", data);
}
export { loginApi, registerApi };
