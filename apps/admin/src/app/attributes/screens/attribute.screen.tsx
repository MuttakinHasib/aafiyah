"use client";
import "@mantine/tiptap/styles.css";

import {
  Button,
  DropZone,
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
import React from "react";
import { MultiSelect, Select as MantineSelect } from "@mantine/core";

export const ProductScreen = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
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
            <div className="flex gap-5">
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  min={10}
                  placeholder="Name of the attribute option"
                  className="text-sm bg-slate-50"
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="value">Value (Optional)</Label>
                <Input
                  id="value"
                  type="text"
                  min={0}
                  placeholder="Enter attribute value"
                  className="text-sm bg-slate-50"
                />
              </div>
            </div>
            <Button>Add Value</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
