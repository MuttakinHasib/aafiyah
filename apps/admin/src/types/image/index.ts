import { UploadApiResponse } from "cloudinary";

export type TImage = Pick<
  UploadApiResponse,
  "public_id" | "secure_url" | "height" | "width"
>;
