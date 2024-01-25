import { ATTRIBUTES } from "@/constants";
import { ATTRIBUTES_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";
import { omit } from "lodash";

type UseAttributeOptions = {
  fetch?: boolean;
};

const schema = z.object({
  name: z
    .string({
      required_error: "Attribute name is required",
      invalid_type_error: "Attribute name must be a string",
    })
    .min(2, {
      message: "Attribute name is required",
    }),
  values: z.array(
    z.object({
      id: z.string().min(3),
      name: z.string({ required_error: "Attribute name is required" }).min(1, {
        message: "Attribute name is required",
      }),
      value: z.string().optional(),
    })
  ),
});

type FormFields = z.infer<typeof schema>;

export const useAttribute = (options?: UseAttributeOptions) => {
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingAttribute } = useMutation({
    mutationFn: ATTRIBUTES_API.createAttribute,
    mutationKey: ["CREATE_ATTRIBUTE"],
  });

  const { handleSubmit, ...formOptions } = useForm<FormFields>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const values = useFieldArray({
    control: formOptions.control,
    name: "values",
  });

  const query = useQuery({
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
          formOptions.reset({ name: "", values: [] });
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
    isCreatingAttribute,
    attributes: query.data || [],
    ...omit(query, ["data"]),
    ...formOptions,
    ...values,
  };
};
