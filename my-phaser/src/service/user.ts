import { request } from "./request";
const loginApi = (data) => request.post("/user/login", data);
const registerApi = (data) => request.post("/user/register", data);
export { loginApi, registerApi };
