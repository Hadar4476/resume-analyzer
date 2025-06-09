import axios from "axios";
import appConfig from "../config";

const route = "/resumes";

export const uploadResume = async (file: FormData): Promise<any> => {
  const response = await axios.post(`${appConfig.apiUrl}${route}`, file);

  return response.data;
};
