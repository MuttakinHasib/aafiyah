import { IBase } from "..";

export interface AttributeValue {
  id: string;
  name: string;
  value?: string;
}

export interface IAttribute extends IBase {
  name: string;
  values: AttributeValue[];
}
