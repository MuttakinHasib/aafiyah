"use client";

import "@mantine/tiptap/styles.css";
import {
  Button,
  ErrorMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Uploader,
} from "@/components";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import React, { memo, useEffect, useMemo } from "react";
import { MultiSelect, Select as MantineSelect, TagsInput } from "@mantine/core";
import { useAttribute, useBrand, useCategory, useProduct } from "@/hooks";
import { ProductFormFields, preventNonNumeric } from "@/validations";

import { UploadIcon, XIcon } from "lucide-react";
import { getCartesianProduct } from "@/helpers";
import {
  Controller,
  FormProvider,
  UseFormSetValue,
  useFormContext,
} from "react-hook-form";
import Image from "next/image";
import { TFile } from "@/types";

const defaultTags = [
  "Clothing",
  "Footwear",
  "Accessories",
  "Electronics",
  "HomeDecor",
  "BeautyProducts",
  "FitnessGear",
  "TechGadgets",
  "OutdoorGear",
  "KitchenAppliances",
  "BooksAndStationery",
  "ToysAndGames",
  "Jewelry",
  "HandmadeCrafts",
  "PetSupplies",
  "HealthAndWellness",
  "SportsEquipment",
  "OfficeFurniture",
  "TravelEssentials",
  "GiftIdeas",
];

export const ProductScreen = memo(() => {
  const { createProduct, isCreatingProduct, form } = useProduct();
  const {
    register,
    unregister,
    control,
    setValue,
    watch,
    formState: { errors },
    attributes: variantAttributes,
  } = form;

  const {
    data: { categories },
  } = useCategory({ fetch: true });
  const {
    data: { brands },
  } = useBrand({ fetch: true });
  const {
    data: { attributes },
  } = useAttribute({ fetch: true });

  const type = watch("type");
  const [image, gallery] = watch(["image", "gallery"]);
  const variantAttributesData = watch("attributes");

  useEffect(() => {
    if (type === "simple") {
      unregister(["attributes", "variants"]);
    } else {
      unregister(["sku", "quantity", "price", "sale_price"]);
    }
  }, [type, unregister]);

  const filterAttributes = useMemo(() => {
    const res = attributes?.filter((el) => {
      return !variantAttributesData?.find((variant: any) => {
        return variant?.id === el?.id;
      });
    });

    return res?.map((attribute) => ({
      label: attribute.name,
      value: attribute.id,
    }));
  }, [attributes, variantAttributesData]);

  const cartesianProduct = getCartesianProduct(variantAttributesData);

  useEffect(() => {
    if (cartesianProduct.length > 0) {
      cartesianProduct.forEach((item, index) => {
        const name = Array.isArray(item)
          ? item.map((i) => i.value).join("/")
          : item.value;

        const options = Array.isArray(item) ? item : [item];

        register(`variants.${index}.name`);
        register(`variants.${index}.options`);
        setValue(`variants.${index}.name`, name);
        setValue(`variants.${index}.options`, options);
      });
    }
  }, [cartesianProduct.length]);

  return (
    <FormProvider {...form}>
      <form className="grid grid-cols-3 gap-5" onSubmit={createProduct}>
        <div className="col-span-2 space-y-8">
          <div className="bg-white rounded p-6 shadow-box">
            <div className="flex justify-between gap-5 flex-wrap pb-5">
              <div className="space-y-1">
                <h3 className="text-xl font-medium">General</h3>
                <p className="text-sm mt-1 text-gray-500 pb-5">
                  Customize the basic information of your product
                </p>
              </div>
              <Controller
                {...{ control }}
                name="type"
                render={({ field: { value, onChange } }) => (
                  <Select {...{ value }} onValueChange={onChange}>
                    <SelectTrigger
                      id="type"
                      className="bg-slate-50 border-gray-100 max-w-xs w-full"
                    >
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Product Type</SelectLabel>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="variant">Variant</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter product name"
                  className="text-sm bg-slate-50"
                  error={errors?.name?.message}
                  {...register("name")}
                />
              </div>
              {type === "simple" && (
                <div className="flex gap-5">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      type="text"
                      placeholder="Enter product SKU"
                      className="text-sm bg-slate-50"
                      error={errors?.sku?.message}
                      {...register("sku")}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={0}
                      defaultValue={0}
                      placeholder="Enter product quantity"
                      className="text-sm bg-slate-50"
                      error={errors?.quantity?.message}
                      onKeyDown={preventNonNumeric}
                      {...register("quantity")}
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <DescriptionEditor />
                <ErrorMessage name="description" {...{ errors }} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded p-6 shadow-box">
            <h3 className="text-xl font-medium">Pricing</h3>
            <p className="text-sm mt-1 text-gray-500 pb-5">
              Set your pricing strategies to stay ahead of the competition
            </p>
            <div className="space-y-5">
              {type === "simple" && (
                <div className="flex gap-5">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      placeholder="Set the product regular price"
                      className="text-sm bg-slate-50"
                      error={errors?.price?.message}
                      onKeyDown={preventNonNumeric}
                      defaultValue={0}
                      {...register("price")}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="sale_price">Sale Price</Label>
                    <Input
                      id="sale_price"
                      type="number"
                      min={0}
                      placeholder="Set the product offer price"
                      className="text-sm bg-slate-50"
                      error={errors?.sale_price?.message}
                      onKeyDown={preventNonNumeric}
                      defaultValue={0}
                      {...register("sale_price")}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-5">
                <div className="space-y-2 w-full">
                  <Label htmlFor="cost_price">Cost Price</Label>
                  <Input
                    id="cost_price"
                    type="number"
                    min={0}
                    placeholder="Set the cost price of the product"
                    className="text-sm bg-slate-50"
                    error={errors?.cost_price?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("cost_price")}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="tax"> Tax Amount (%)</Label>
                  <Input
                    id="tax"
                    type="number"
                    min={0}
                    placeholder="Set the product tax amount in percentage (%)"
                    className="text-sm bg-slate-50"
                    error={errors?.tax_price?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("tax_price")}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ************** MEDIA SECTION ************** */}

          <div className="bg-white rounded p-6 shadow-box">
            <h3 className="text-xl font-medium">Media</h3>
            <p className="text-sm mt-1 text-gray-500 pb-5">
              Showcase your product with high-quality images
            </p>
            <div>
              <div className="rounded-md p-5 space-y-3 border-2 border-dashed">
                <Label htmlFor="images">Feature Image</Label>
                <div className="flex flex-wrap gap-5">
                  <Uploader
                    title="Upload Feature Image"
                    images={image ? [image] : []}
                    onUpload={(data) => setValue("image", data as TFile)}
                  >
                    <div className="w-28 h-28 grid place-content-center border-2 border-dotted cursor-pointer transition duration-300 hover:bg-gray-50">
                      <UploadIcon className="w-8 h-8 mx-auto inline-block" />
                      Upload
                    </div>
                  </Uploader>
                  {image && (
                    <div className="w-28 h-28">
                      <Image
                        src={image.secure_url}
                        alt="Product"
                        width={image.width}
                        height={image.height}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <ErrorMessage name="image" {...{ errors }} />
              </div>
              <div className="rounded-md p-5 space-y-3 border-2 border-dashed border-t-0">
                <Label htmlFor="gallery">Gallery Images</Label>
                <div className="flex flex-wrap gap-5">
                  <Uploader
                    title="Upload Gallery Images"
                    images={gallery || []}
                    maxFiles={5}
                    onUpload={(data) => setValue("gallery", data as TFile[])}
                  >
                    <div className="w-28 h-28 grid place-content-center border-2 border-dotted cursor-pointer transition duration-300 hover:bg-gray-50">
                      <UploadIcon className="w-8 h-8 mx-auto inline-block" />
                      Upload
                    </div>
                  </Uploader>
                  {gallery?.map((image) => (
                    <div key={image.public_id} className="w-28 h-28">
                      <Image
                        src={image.secure_url}
                        alt="Product"
                        width={image.width}
                        height={image.height}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <ErrorMessage name="gallery" {...{ errors }} />
              </div>
            </div>
          </div>
          {/* ************** DIMENSIONS SECTION ************** */}
          <div className="bg-white rounded p-6 shadow-box">
            <div className="flex justify-between gap-5 flex-wrap pb-5">
              <div className="space-y-1">
                <h3 className="text-xl font-medium">Dimensions</h3>
                <p className="text-sm text-gray-500">
                  Details regarding size are provided below:
                </p>
              </div>
              <Controller
                name="dimensions.unit"
                {...{ control }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    {...{ value }}
                    defaultValue="MKS"
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger
                      id="unit"
                      className="bg-slate-50 border-gray-100 max-w-xs w-full"
                    >
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Unit Type</SelectLabel>
                        <SelectItem value="MKS">
                          MKS (Meter KG Second)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-5">
              <div className="flex gap-5">
                <div className="space-y-2 w-full">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    min={0}
                    placeholder="Set the product height"
                    className="text-sm bg-slate-50"
                    error={errors?.dimensions?.height?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("dimensions.height")}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    min={0}
                    placeholder="Set the product width"
                    className="text-sm bg-slate-50"
                    error={errors?.dimensions?.width?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("dimensions.width")}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="space-y-2 w-full">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    min={0}
                    placeholder="Set the weight of the product"
                    className="text-sm bg-slate-50"
                    error={errors?.dimensions?.weight?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("dimensions.weight")}
                  />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    type="number"
                    min={0}
                    placeholder="Set the length of the product"
                    className="text-sm bg-slate-50"
                    error={errors?.dimensions?.length?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("dimensions.length")}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ************** VARIATIONS SECTION ************** */}
          {type === "variant" && (
            <div className="bg-white rounded p-6 shadow-box">
              <h3 className="text-xl font-medium">Variations</h3>
              <p className="text-sm mt-1 text-gray-500 pb-5">
                Customize products with versatile options like colors, sizes,
                and unique features
              </p>
              <div className="space-y-5">
                {variantAttributes.fields.map((variant, index) => (
                  <div key={variant.id} className="flex gap-5 items-center">
                    <MantineSelect
                      id="attribute"
                      placeholder="Select attribute"
                      data={filterAttributes}
                      searchable
                      value={variantAttributesData[index].id}
                      onChange={(value) => {
                        if (value) {
                          setValue(`attributes.${index}.values`, []);
                          setValue(`attributes.${index}.id`, value);
                          const options = attributes
                            .find((attribute) => attribute.id === value)
                            ?.values.map((value) => value.name);

                          if (options?.length) {
                            setValue(`attributes.${index}.options`, options);
                          }
                        }
                      }}
                    />
                    <div className="flex-1 flex items-center gap-5">
                      <MultiSelect
                        id="values"
                        searchable
                        placeholder="Pick attribute values"
                        value={variantAttributesData[index].values}
                        onChange={(value) => {
                          setValue(`attributes.${index}.values`, value);
                        }}
                        className="w-full"
                        data={variantAttributesData[index].options}
                        comboboxProps={{
                          transitionProps: { transition: "pop", duration: 200 },
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="inline-block border-red-400"
                        onClick={() => variantAttributes.remove(index)}
                      >
                        <XIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
                {attributes?.length !== variantAttributesData?.length && (
                  <Button
                    type="button"
                    onClick={() => {
                      variantAttributes.append({
                        id: "",
                        values: [],
                        options: [],
                      });
                    }}
                  >
                    Add option
                  </Button>
                )}
              </div>
              {cartesianProduct.length > 0 && (
                <div className="space-y-5">
                  {cartesianProduct?.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-5 !mt-8 pt-8 border-t-2 border-dashed"
                    >
                      <div className="flex text-lg font-medium gap-3">
                        <span className="border min-w-8 flex items-center justify-center tabular-nums">
                          {index + 1}
                        </span>{" "}
                        Variant:{" "}
                        <div className="text-brand border flex items-center divide-x">
                          {Array.isArray(item) ? (
                            item?.map((i) => (
                              <span key={i.value} className="px-1">
                                {i.value}
                              </span>
                            ))
                          ) : (
                            <span className="px-1">{item?.value}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="space-y-2 w-full">
                          <Label htmlFor="price">Price</Label>
                          <Input
                            id="price"
                            type="number"
                            min={0}
                            placeholder="Set the product regular price"
                            className="text-sm bg-slate-50"
                            error={errors?.variants?.[index]?.price?.message}
                            onKeyDown={preventNonNumeric}
                            defaultValue={0}
                            {...register(`variants.${index}.price`)}
                          />
                        </div>
                        <div className="space-y-2 w-full">
                          <Label htmlFor="sale_price">Sale Price</Label>
                          <Input
                            id="sale_price"
                            type="number"
                            min={0}
                            placeholder="Set the product offer price"
                            className="text-sm bg-slate-50"
                            error={
                              errors?.variants?.[index]?.sale_price?.message
                            }
                            onKeyDown={preventNonNumeric}
                            defaultValue={0}
                            {...register(`variants.${index}.sale_price`)}
                          />
                        </div>
                      </div>
                      <div className="flex gap-5">
                        <div className="space-y-2 w-full">
                          <Label htmlFor="sku">SKU</Label>
                          <Input
                            id="sku"
                            type="text"
                            placeholder="Enter product SKU"
                            className="text-sm bg-slate-50"
                            error={errors?.variants?.[index]?.sku?.message}
                            {...register(`variants.${index}.sku`)}
                          />
                        </div>
                        <div className="space-y-2 w-full">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="text"
                            min={0}
                            defaultValue={0}
                            placeholder="Enter product quantity"
                            className="text-sm bg-slate-50"
                            error={errors?.variants?.[index]?.quantity?.message}
                            onKeyDown={preventNonNumeric}
                            {...register(`variants.${index}.quantity`)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-span-1">
          <div className="sticky top-20 space-y-5">
            <div className="bg-white rounded p-6 shadow-box">
              <h3 className="text-xl font-medium">Organization</h3>
              <p className="text-sm mt-1 text-gray-500 pb-5">
                Better organize your product
              </p>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    name="status"
                    {...{ control }}
                    render={({ field: { onChange, value, ref } }) => (
                      <Select {...{ value, ref }} onValueChange={onChange}>
                        <SelectTrigger
                          id="status"
                          className="w-full bg-slate-50 border-gray-100"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="archived">Archived</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <ErrorMessage errors={errors} name="status" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="categories"
                    {...{ control }}
                    render={({ field: { onChange, value, ref } }) => (
                      <MultiSelect
                        id="category"
                        searchable
                        placeholder="Pick product categories"
                        {...{ onChange, value, ref }}
                        data={categories?.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))}
                        comboboxProps={{
                          transitionProps: { transition: "pop", duration: 200 },
                        }}
                      />
                    )}
                  />
                  <ErrorMessage errors={errors} name="categories" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Controller
                    name="tags"
                    {...{ control }}
                    render={({ field }) => (
                      <TagsInput
                        id="tags"
                        placeholder="Pick product tags"
                        data={defaultTags}
                        comboboxProps={{
                          transitionProps: { transition: "pop", duration: 200 },
                        }}
                        {...field}
                      />
                    )}
                  />
                  <ErrorMessage errors={errors} name="tags" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Controller
                    name="brand"
                    {...{ control }}
                    render={({ field }) => (
                      <MantineSelect
                        id="brand"
                        placeholder="Select product brand"
                        data={brands?.map((brand) => ({
                          label: brand.name,
                          value: brand.id,
                        }))}
                        searchable
                        {...field}
                      />
                    )}
                  />
                  <ErrorMessage errors={errors} name="brand" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button loading={isCreatingProduct} type="submit">
                Create Product
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
});

ProductScreen.displayName = "ProductScreen";

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

function DescriptionEditor() {
  const { setValue, watch } = useFormContext<ProductFormFields>();
  const value = watch("description");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  useEffect(() => {
    if (editor?.getHTML()) {
      setValue("description", editor.getHTML());
    }
  }, [editor, setValue]);

  useEffect(() => {
    if (value) {
      editor?.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
