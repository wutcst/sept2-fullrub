import { request } from "./request";
const BASE_URL = "/data";
const getData = (id: number) =>
  request.get(`${BASE_URL}/getData`, { params: { id } });
const getArchives = () => request.get(`${BASE_URL}/getArchive`);

const saveArchive = (data) => request.post(`${BASE_URL}/save`, data);
export { getData, getArchives, saveArchive };
