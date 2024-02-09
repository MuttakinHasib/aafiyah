"use client";

import "@mantine/tiptap/styles.css";
import {
  Button,
  DropZone,
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

import { XIcon } from "lucide-react";
import { getCartesianProduct } from "@/helpers";
import { Controller, UseFormSetValue } from "react-hook-form";
import Image from "next/image";
import { IconCloudUpload } from "@tabler/icons-react";

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
  const {
    createProduct,
    form: {
      register,
      unregister,
      control,
      setValue,
      watch,
      variants,
      formState: { errors },
    },
  } = useProduct();

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
  const variantsData = watch("variants");

  useEffect(() => {
    if (type === "simple") {
      unregister(["variants", "variantsOptions"]);
    } else {
      unregister(["sku", "quantity", "price", "salePrice"]);
    }
  }, [type, unregister]);

  const filterAttributes = useMemo(() => {
    const res = attributes?.filter((el) => {
      return !variantsData?.find((variant: any) => {
        return variant?.attribute === el?.id;
      });
    });

    return res?.map((attribute) => ({
      label: attribute.name,
      value: attribute.id,
    }));
  }, [attributes, variantsData]);

  const cartesianProduct = getCartesianProduct(variantsData);

  useEffect(() => {
    if (cartesianProduct.length > 0) {
      cartesianProduct.forEach((item, index) => {
        const name = Array.isArray(item)
          ? item.map((i) => i.value).join("/")
          : item.value;

        const options = Array.isArray(item)
          ? JSON.stringify(item)
          : JSON.stringify([item]);

        register(`variantsOptions.${index}.name`);
        register(`variantsOptions.${index}.options`);
        setValue(`variantsOptions.${index}.name`, name);
        setValue(`variantsOptions.${index}.options`, options);
      });
    }
  }, [cartesianProduct.length]);

  return (
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
            <Select
              value={type}
              onValueChange={(value) =>
                setValue("type", value as "simple" | "variant")
              }
            >
              <SelectTrigger
                id="type"
                className="bg-slate-50 border-gray-100 max-w-xs w-full"
                onChange={(value) => console.log("UNIT:", value)}
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
              <DescriptionEditor
                value={watch("description")}
                {...{ setValue }}
              />
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
                    error={errors?.salePrice?.message}
                    onKeyDown={preventNonNumeric}
                    defaultValue={0}
                    {...register("salePrice")}
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
                  error={errors?.costPrice?.message}
                  onKeyDown={preventNonNumeric}
                  defaultValue={0}
                  {...register("costPrice")}
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
                  error={errors?.taxPrice?.message}
                  onKeyDown={preventNonNumeric}
                  defaultValue={0}
                  {...register("taxPrice")}
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
          <div className="space-y-5">
            <div className="border-2 border-dashed rounded-md p-3 space-y-3">
              <Label htmlFor="images">Feature Image</Label>
              <div className="flex flex-wrap gap-5">
                <div className="w-40 h-40 grid place-content-center border">
                  <IconCloudUpload
                    size={40}
                    stroke={1.5}
                    style={{ color: "var(--mantine-color-blue-6)" }}
                  />
                </div>
                <div className="w-40 h-40">
                  <Image
                    src="/images/products/product-1-1.jpg"
                    alt="Product"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="border-2 border-dashed rounded-md p-3 space-y-3">
              <Label htmlFor="gallery">Gallery</Label>
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
            <Select defaultValue="MKS">
              <SelectTrigger
                id="unit"
                className="bg-slate-50 border-gray-100 max-w-xs w-full"
                onChange={(value) => console.log("UNIT:", value)}
              >
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Unit Type</SelectLabel>
                  <SelectItem value="MKS">MKS (Meter KG Second)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
              Customize products with versatile options like colors, sizes, and
              unique features
            </p>
            <div className="space-y-5">
              {variants.fields.map((variant, index) => (
                <div key={variant.id} className="flex gap-5 items-center">
                  <MantineSelect
                    id="attribute"
                    placeholder="Select attribute"
                    data={filterAttributes}
                    searchable
                    value={variantsData[index].attribute}
                    onChange={(value) => {
                      if (value) {
                        setValue(`variants.${index}.values`, []);
                        setValue(`variants.${index}.attribute`, value);
                        const options = attributes
                          .find((attribute) => attribute.id === value)
                          ?.values.map((value) => value.name);

                        if (options?.length) {
                          setValue(`variants.${index}.options`, options);
                        }
                      }
                    }}
                  />
                  <div className="flex-1 flex items-center gap-5">
                    <MultiSelect
                      id="values"
                      searchable
                      placeholder="Pick attribute values"
                      value={variantsData[index].values}
                      onChange={(value) => {
                        setValue(`variants.${index}.values`, value);
                      }}
                      className="w-full"
                      data={variantsData[index].options}
                      comboboxProps={{
                        transitionProps: { transition: "pop", duration: 200 },
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="inline-block border-red-400"
                      onClick={() => variants.remove(index)}
                    >
                      <XIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
              {attributes?.length !== variantsData?.length && (
                <Button
                  type="button"
                  onClick={() => {
                    variants.append({ attribute: "", values: [], options: [] });
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
                          error={
                            errors?.variantsOptions?.[index]?.price?.message
                          }
                          onKeyDown={preventNonNumeric}
                          defaultValue={0}
                          {...register(`variantsOptions.${index}.price`)}
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
                            errors?.variantsOptions?.[index]?.salePrice?.message
                          }
                          onKeyDown={preventNonNumeric}
                          defaultValue={0}
                          {...register(`variantsOptions.${index}.salePrice`)}
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
                          error={errors?.variantsOptions?.[index]?.sku?.message}
                          {...register(`variantsOptions.${index}.sku`)}
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
                          error={
                            errors?.variantsOptions?.[index]?.quantity?.message
                          }
                          onKeyDown={preventNonNumeric}
                          {...register(`variantsOptions.${index}.quantity`)}
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
            <Button type="submit">Create Product</Button>
          </div>
        </div>
      </div>
    </form>
  );
});

ProductScreen.displayName = "ProductScreen";

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

interface DescriptionEditorProps {
  setValue: UseFormSetValue<ProductFormFields>;
  value: string;
}

function DescriptionEditor({ setValue, value }: DescriptionEditorProps) {
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
  }, [editor]);

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
