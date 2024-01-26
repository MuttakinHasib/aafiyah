import { BRANDS } from "@/constants";
import { BRAND_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";
import { omit } from "lodash";

type UseBrandOptions = {
  fetch?: boolean;
};

const schema = z.object({
  name: z
    .string({
      required_error: "Brand name is required",
      invalid_type_error: "Brand name must be a string",
    })
    .min(2, {
      message: "Brand name is required",
    }),
  logo: z
    .string({
      required_error: "Logo is required",
      invalid_type_error: "Logo must be a string",
    })
    .url({
      message: "Logo must be a valid url",
    }),
  website: z
    .string({
      invalid_type_error: "Website must be a string",
    })
    .url({
      message: "Website must be a valid url",
    })
    .optional(),
});

type FormFields = z.infer<typeof schema>;

export const useBrand = (options?: UseBrandOptions) => {
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingBrand } = useMutation({
    mutationFn: BRAND_API.createBrand,
    mutationKey: ["CREATE_BRAND"],
  });

  const form = useForm<FormFields>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const query = useQuery({
    queryKey: [BRANDS],
    queryFn: BRAND_API.getBrands,
    enabled: fetch,
  });

  const createBrand = form.handleSubmit(
    async (data) =>
      await mutateAsync(data, {
        onSuccess: (message) => {
          toast({
            title: message,
          });
          form.reset({ name: "", logo: "", website: "" });
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
    data: {
      brands: query.data || [],
      ...omit(query, ["data"]),
    },
    form,
    createBrand,
    isCreatingBrand,
  };
};
