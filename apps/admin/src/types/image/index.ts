import { UploadApiResponse } from "cloudinary";

export type TFile = Pick<
  UploadApiResponse,
  "public_id" | "secure_url" | "height" | "width"
>;
