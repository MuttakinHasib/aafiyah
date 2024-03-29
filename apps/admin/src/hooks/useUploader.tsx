import { UPLOAD_API } from "@/services/upload";
import { useMutation } from "@tanstack/react-query";

export const useUploader = () => {
  const uploadFile = useMutation({
    mutationKey: ["UPLOAD_FILE"],
    mutationFn: UPLOAD_API.uploadFile,
  });

  const uploadFiles = useMutation({
    mutationKey: ["UPLOAD_FILES"],
    mutationFn: UPLOAD_API.uploadFiles,
  });

  const deleteFiles = useMutation({
    mutationKey: ["DELETE_FILES"],
    mutationFn: UPLOAD_API.deleteFiles,
  });

  return {
    uploadFile,
    uploadFiles,
    deleteFiles,
  };
};
