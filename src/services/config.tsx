import axios from "axios";
import { CookiesService } from "./cookies.service";

export const BASE_URL = "http://14.225.212.121:8080/api/v1";

// export const BASE_URL = "http://localhost:8081/api/v1";

export const configHeaders = () => {
  return {
    Authorization: `Bearer ${CookiesService.get()}`,
    "Content-Type": "application/json",
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaders(),
});
