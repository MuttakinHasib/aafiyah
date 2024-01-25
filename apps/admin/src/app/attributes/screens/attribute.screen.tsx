"use client";
import "@mantine/tiptap/styles.css";

import { Button, Input, Label } from "@/components";
import React from "react";
import { useAttribute } from "@/hooks";
import { XIcon } from "lucide-react";

import { nanoid } from "nanoid";

export const AttributeScreen = () => {
  const {
    createAttribute,
    register,
    fields: values,
    append,
    remove,
    formState: { errors },
  } = useAttribute();
  console.log("🚀 ~ AttributeScreen ~ values:", values);

  return (
    <form className="grid grid-cols-3 gap-5" onSubmit={createAttribute}>
      <div className="col-span-2 space-y-8">
        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">General</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Customize the basic information of attribute
          </p>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter attribute name"
                className="text-sm bg-slate-50"
                error={errors?.name?.message}
                {...register("name")}
              />
            </div>
          </div>
        </div>
        {/* ************** VARIATIONS SECTION ************** */}

        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">Values</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Add your attribute value and necessary information from here
          </p>
          <div className="space-y-5">
            {values?.map((item, index) => (
              <div key={item.id} className="flex gap-5">
                <div className="flex gap-5 w-full">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name of the attribute option"
                      className="text-sm bg-slate-50"
                      error={errors?.values?.[index]?.name?.message}
                      {...register(`values.${index}.name`)}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="value">Value (Optional)</Label>
                    <Input
                      id="value"
                      type="text"
                      placeholder="Enter attribute value"
                      className="text-sm bg-slate-50"
                      error={errors?.values?.[index]?.value?.message}
                      {...register(`values.${index}.value`)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-8 inline-block border-red-400"
                    onClick={() => remove(index)}
                  >
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => {
                append({
                  id: nanoid(),
                  name: "",
                  value: "",
                });
              }}
            >
              Add Value
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save Attribute</Button>
        </div>
      </div>
    </form>
  );
};
