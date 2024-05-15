import { ControllerRenderProps } from "react-hook-form";

export type IFormContextInput<T = unknown> = T & {
  name: string;
  id?: string;
  // label: React.ReactNode;
  label?: string;
  defaultValue?: string | unknown;
  modifyFieldProps?: (field: ControllerRenderProps) => { [key: string]: unknown };
  // controllerRenderProps?: ControllerRenderProps;
  isClearable?: boolean;
  clearValue?: unknown;
  helperText?: React.ReactNode;
  error?: { message: string };
};

export type IFormContextSelect<T = unknown> = IFormContextInput<T> & {
  options: { value: string; label: string }[];
};

export type IFormContextCheckboxGroup<T = unknown> = Pick<IFormContextInput<T>, "name" | "label" | "helperText"> & {
  items: { id: string; label: string }[];
};
