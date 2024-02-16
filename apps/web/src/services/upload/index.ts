import { api } from "@/api";
import { UPLOAD } from "@/constants";
import { TFile } from "@/types";

export const UPLOAD_API = {
  uploadFile: async (data: FormData): Promise<TFile> =>
    await api.post(UPLOAD + "/file", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadFiles: async (data: FormData): Promise<TFile[]> =>
    await api.post(UPLOAD + "/files", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteFiles: async (files: TFile[]): Promise<any> =>
    await api.put(UPLOAD + "/files", {
      public_ids: files.map((file) => file.public_id),
    }),
};
