import axios from "axios";
import appConfig from "../config";
import { IPosition } from "@/types";

const route = "/resumes";

export const uploadResume = async (file: FormData): Promise<IPosition[]> => {
  const response = await axios.post(`${appConfig.apiUrl}${route}`, file);

  return response.data;
};
