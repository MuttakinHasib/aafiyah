import { PRODUCTS } from "@/constants";
import { PRODUCT_API } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/libs";
import { omit } from "lodash";
import { ProductFormFields, productSchema } from "@/validations";

type UseProductOptions = {
  fetch?: boolean;
};

export const useProduct = (options?: UseProductOptions) => {
  const { fetch = false } = options || {};

  const { mutateAsync, isPending: isCreatingProduct } = useMutation({
    mutationFn: PRODUCT_API.createProduct,
    mutationKey: ["CREATE_PRODUCT"],
  });

  const form = useForm<ProductFormFields>({
    mode: "all",
    resolver: zodResolver(productSchema),
    defaultValues: { type: "variant" },
  });
  const variants = useFieldArray({
    shouldUnregister: true,
    control: form.control,
    name: "variants",
  });

  const variantsOptions = useFieldArray({
    control: form.control,
    name: "variantsOptions",
  });

  const query = useQuery({
    queryKey: [PRODUCTS],
    queryFn: PRODUCT_API.getProducts,
    enabled: fetch,
  });

  const createProduct = form.handleSubmit(
    async (data) => console.log(data)
    // await mutateAsync(data, {
    //   onSuccess: (message) => {
    //     toast({
    //       title: message,
    //     });
    //   },
    //   onError: (error) => {
    //     toast({
    //       title: error.message,
    //       icon: "error",
    //     });
    //   },
    // })
  );

  return {
    data: {
      products: query.data || [],
      ...omit(query, ["data"]),
    },
    form: {
      ...form,
      variants,
    },
    createProduct,
    isCreatingProduct,
  };
};
