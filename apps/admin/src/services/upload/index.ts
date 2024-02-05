import { UploadApiResponse } from "cloudinary";
import { api } from "@/api";
import { UPLOAD } from "@/constants";

export const UPLOAD_API = {
  uploadFile: async (data: FormData): Promise<UploadApiResponse> =>
    await api.post(UPLOAD + "/file", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadFiles: async (data: FormData): Promise<UploadApiResponse[]> =>
    await api.post(UPLOAD + "/files", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};