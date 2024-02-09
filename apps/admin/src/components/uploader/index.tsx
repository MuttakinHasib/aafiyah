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
  Button,
  DropZone,
} from "..";
import { useUploader } from "@/hooks";
import { FileWithPath } from "@mantine/dropzone";
import { Accept } from "react-dropzone-esm";

import { TFile } from "@/types";
import Image from "next/image";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { differenceWith, isEqual } from "lodash";

interface Options extends PropsWithChildren {
  onUpload: (data: TFile | TFile[]) => void;
  folder?: string;
  maxSize?: number;
  maxFiles?: number;
  accept?: Accept | string[];
  images: TFile[];
  title: string;
}

export const Uploader = (props: Options) => {
  const {
    children,
    folder = "images",
    maxFiles = 1,
    maxSize,
    accept,
    onUpload,
    images = [],
    title,
  } = props;

  const { uploadFile, uploadFiles, deleteFiles } = useUploader();

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
            onUpload([...images, ...data]);
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
    [folder, images, maxFiles, onUpload, uploadFile, uploadFiles]
  );

  const onReject = useCallback(async () => {}, []);

  const onDeleteFile = async (files: TFile[]) => {
    if (!files.length) return;

    await deleteFiles.mutateAsync(files, {
      onSuccess: () => {
        onUpload(differenceWith(images, files, isEqual));
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="space-y-5">
            <DropZone
              multiple={maxFiles > 1}
              disabled={images.length >= maxFiles}
              loading={uploadFile.isPending || uploadFiles.isPending}
              {...{ onDrop, onReject, maxFiles, maxSize, accept }}
            />
            <h4 className="text-center font-semibold">
              You can upload up to {maxFiles} images
            </h4>
            {images?.length > 0 && (
              <>
                <div className="space-y-3">
                  {images?.map((image) => (
                    <div
                      key={image?.public_id}
                      className="flex items-center justify-between gap-5 flex-wrap"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 overflow-hidden rounded-md border-2 border-dashed">
                          <Image
                            src={image?.secure_url}
                            alt={image?.public_id}
                            width={image?.width}
                            height={image?.height}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h4 className="text-medium">{image?.public_id}</h4>
                      </div>
                      <Button
                        type="button"
                        title="Delete"
                        variant="outline"
                        loading={deleteFiles.isPending}
                        onClick={() => onDeleteFile([image])}
                      >
                        <XMarkIcon className="w-5 h-5 stroke-[2]" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  title="Remove All"
                  type="button"
                  className="w-full"
                  variant="outline"
                  loading={deleteFiles.isPending}
                  onClick={() => onDeleteFile(images)}
                >
                  <TrashIcon className="w-5 h-5 mr-3" /> Remove All
                </Button>
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={
              uploadFile.isPending ||
              uploadFiles.isPending ||
              deleteFiles.isPending
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
