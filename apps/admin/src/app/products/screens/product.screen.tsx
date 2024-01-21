"use client";
import "@mantine/tiptap/styles.css";

import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import React from "react";
import { MultiSelect, Select as MantineSelect } from "@mantine/core";

export const ProductScreen = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 space-y-8">
        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">General</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Customize the basic information of your product
          </p>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="text-sm bg-slate-50"
                // error={errors?.email?.message}
                // {...register('email', {
                //   required: 'Email is required',
                //   pattern: {
                //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                //     message: 'Invalid email address',
                //   },
                // })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <DescriptionEditor />
            </div>
          </div>
        </div>
        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">Pricing</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Set your pricing strategies to stay ahead of the competition
          </p>
          <div className="space-y-5">
            <div className="flex gap-5">
              <div className="space-y-2 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min={10}
                  placeholder="Set the product regular price"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
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
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="space-y-2 w-full">
                <Label htmlFor="cost_price">Cost Price</Label>
                <Input
                  id="cost_price"
                  type="number"
                  min={10}
                  placeholder="Set the cost price of the product"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
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
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white rounded p-6 shadow-box sticky top-20">
          <h3 className="text-xl font-medium">Organization</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Better organize your product
          </p>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger
                  id="status"
                  className="w-full bg-slate-50 border-gray-100"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <MultiSelect
                id="category"
                searchable
                placeholder="Pick product categories"
                data={["React", "Angular", "Vue", "Svelte"]}
                comboboxProps={{
                  transitionProps: { transition: "pop", duration: 200 },
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <MultiSelect
                id="tags"
                searchable
                placeholder="Pick product tags"
                data={["React", "Angular", "Vue", "Svelte"]}
                comboboxProps={{
                  transitionProps: { transition: "pop", duration: 200 },
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <MantineSelect
                id="brand"
                placeholder="Select product brand"
                data={["React", "Angular", "Vue", "Svelte"]}
                searchable
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

function DescriptionEditor() {
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
