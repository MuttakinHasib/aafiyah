import { ATTRIBUTES } from "@/constants";
import { ATTRIBUTES_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";

type UseAttributeOptions = {
  fetch?: boolean;
};

const schema = z.object({
  name: z.string(),
  values: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.string().optional(),
    })
  ),
});

type FormFields = z.infer<typeof schema>;

export const useAttribute = (options?: UseAttributeOptions) => {
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingAttribute } = useMutation({
    mutationFn: ATTRIBUTES_API.createAttribute,
  });

  const { handleSubmit, ...formOptions } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { data, ...restQuery } = useQuery({
    queryKey: [ATTRIBUTES],
    queryFn: ATTRIBUTES_API.getAttributes,
    enabled: fetch,
  });

  const createAttribute = handleSubmit(
    async (data) =>
      await mutateAsync(data, {
        onSuccess: (message) => {
          toast({
            title: message,
          });
        },
        onError: (error) => {
          toast({
            title: error.message,
            icon: "error",
          });
        },
      })
  );

  return {
    createAttribute,
    data: {
      attributes: data || [],
      ...restQuery,
    },
    ...formOptions,
  };
};
