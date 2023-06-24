import { request } from "./request";
const BASE_URL = "/data";
function getData(id: number) {
  return request.get(`${BASE_URL}/getData`, { params: { id } });
}
function getArchives() {
  return request.get(`${BASE_URL}/getArchive`);
}
function saveArchive(data) {
  return request.post(`${BASE_URL}/save`, data);
}
export { getData, getArchives, saveArchive };
