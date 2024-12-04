import axios from "axios";
import { BASE_URL, configHeaders } from "./config";
import { ROUTES } from "@/routes";

export const UserService = {
  postLogin: async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${ROUTES.LOGIN}`, data, {
        headers: configHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error login: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
  postRegister: async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${ROUTES.REGISTER}`, data, {
        headers: configHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error login: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
  postVerifyOTP: async (data: any) => {
    console.log("data: ", data);

    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-code`, data, {
        headers: configHeaders(),
      });

      console.log("response: ", response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error login: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
  postSendOTP: async (data: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/send-code`, data, {
        headers: configHeaders(),
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
  postActiveAccount: async (data: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/active-account`,
        data,
        {
          headers: configHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
  postNewPassword: async (data: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${ROUTES.RESET_PASSWORD}`,
        data,
        {
          headers: configHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error: ", error.response.data);
        return error.response.data;
      }
      return { success: false, message: "Error from server" };
    }
  },
};
