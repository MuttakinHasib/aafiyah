import { BRANDS, PRODUCTS } from "@/constants";
import { BRAND_API, PRODUCT_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";
import { omit } from "lodash";
import { productSchema } from "@/validations";

type UseProductOptions = {
  fetch?: boolean;
};

type FormFields = z.infer<typeof productSchema>;

export const useProduct = (options?: UseProductOptions) => {
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingProduct } = useMutation({
    mutationFn: PRODUCT_API.createProduct,
    mutationKey: ["CREATE_PRODUCT"],
  });

  const form = useForm<FormFields>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(productSchema),
  });

  const query = useQuery({
    queryKey: [PRODUCTS],
    queryFn: PRODUCT_API.getProducts,
    enabled: fetch,
  });

  const createProduct = form.handleSubmit(
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
    data: {
      products: query.data || [],
      ...omit(query, ["data"]),
    },
    form,
    createProduct,
    isCreatingProduct,
  };
};
