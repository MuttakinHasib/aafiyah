import { cn } from "@/utils";
import {
  FieldValuesFromFieldErrors,
  ErrorMessage as RHFErrorMessage,
} from "@hookform/error-message";
import React from "react";
import { DeepMap, FieldErrors, FieldName, FieldValues } from "react-hook-form";

interface Props {
  errors: FieldErrors;
  name: FieldName<
    FieldValuesFromFieldErrors<DeepMap<FieldValues, FieldErrors>>
  >;
}

export const ErrorMessage = ({ errors, name }: Props) => {
  return (
    <RHFErrorMessage
      {...{ errors, name }}
      render={({ message }) => (
        <small
          className={cn("text-red-500 inline-block animate__animated", {
            animate__headShake: message,
          })}
        >
          {message}
        </small>
      )}
    />
  );
};
