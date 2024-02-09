import React, { PropsWithChildren, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DropZone,
} from "..";
import { UseFormSetValue } from "react-hook-form";
import { useUploader } from "@/hooks";
import { FileWithPath } from "@mantine/dropzone";
import { Accept } from "react-dropzone-esm";
import { UploadApiResponse } from "cloudinary";

interface Options extends PropsWithChildren {
  onUpload: (data: UploadApiResponse | UploadApiResponse[]) => void;
  folder?: string;
  maxSize?: number;
  maxFiles?: number;
  accept?: Accept | string[];
}

export const Uploader = (props: Options) => {
  const {
    children,
    folder = "images",
    maxFiles = 1,
    maxSize,
    accept,
    onUpload,
  } = props;

  const { uploadFile, uploadFiles } = useUploader();

  const onDrop = useCallback(
    async (files: FileWithPath[]) => {
      const formData = new FormData();
      formData.append("folder", folder);

      if (maxFiles > 1) {
        files.forEach((file) => {
          formData.append("files", file);
        });

        await uploadFiles.mutateAsync(formData, {
          onSuccess: (data) => {
            onUpload(data);
          },
        });
      } else {
        formData.append("file", files[0]);

        await uploadFile.mutateAsync(formData, {
          onSuccess: (data) => {
            onUpload(data);
          },
        });
      }
    },
    [folder, maxFiles, onUpload, uploadFile, uploadFiles]
  );

  const onReject = useCallback(async () => {}, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <DropZone {...{ onDrop, onReject, maxFiles, maxSize, accept }} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
