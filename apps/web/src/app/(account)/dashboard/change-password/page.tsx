import React from "react";
import { Label, Button } from "@/components/ui";
import { Input } from "@/components";

export const metadata = {
  title: "Change Password",
};

const ChangePasswordPage = () => {
  return (
    <div className="shadow-box bg-white">
      <h4 className="border-b py-5 px-8 font-medium text-xl">
        Change Password
      </h4>
      <div className="p-8 max-w-md w-full">
        <div className="space-y-3 pb-8">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="********" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="********"
            />
          </div>
        </div>
        <Button>Save</Button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
