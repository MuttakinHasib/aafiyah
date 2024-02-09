import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileRejection,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

interface DropZoneOptions extends Partial<DropzoneProps> {
  onDrop: (files: FileWithPath[]) => void;
  onReject: (fileRejections: FileRejection[]) => void;
  loading?: boolean;
}

export const DropZone = (props: DropZoneOptions) => {
  const { maxSize = 5 * 1024 ** 2, accept = IMAGE_MIME_TYPE, ...rest } = props;

  return (
    <Dropzone {...{ maxSize, accept }} {...rest}>
      <Group
        justify="center"
        gap={0}
        mih={150}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(40),
              height: rem(40),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(40),
              height: rem(40),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(40),
              height: rem(40),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div className="text-center">
          <Text size="sm" inline>
            Drag images here or click to select files
          </Text>
          <Text size="xs" c="dimmed" inline mt={10}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};
