import { PRODUCTS } from "@/constants";
import { PRODUCT_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";
import { omit } from "lodash";
import { ProductFormFields, productSchema } from "@/validations";
import { useSearchParams } from "next/navigation";
import { getQueries } from "@/utils";

type UseProductOptions = {
  fetch?: boolean;
};

export const useProduct = (options?: UseProductOptions) => {
  const searchParams = useSearchParams();
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingProduct } = useMutation({
    mutationFn: PRODUCT_API.createProduct,
    mutationKey: ["CREATE_PRODUCT"],
  });

  const form = useForm<ProductFormFields>({
    mode: "all",
    resolver: zodResolver(productSchema),
    defaultValues: { type: "simple", dimensions: { unit: "MKS" } },
  });

  const attributes = useFieldArray({
    shouldUnregister: true,
    control: form.control,
    name: "attributes",
  });

  const query = useQuery({
    queryKey: [PRODUCTS, getQueries(searchParams)],
    queryFn: async () => await PRODUCT_API.getProducts(searchParams.toString()),
    enabled: fetch,
  });

  const createProduct = form.handleSubmit(
    async (data) =>
      await mutateAsync(data, {
        onSuccess: (message) => {
          toast({
            title: message,
          });
          form.reset();
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
    form: {
      ...form,
      attributes,
    },
    createProduct,
    isCreatingProduct,
  };
};
