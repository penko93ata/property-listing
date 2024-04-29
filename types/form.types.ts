import { ControllerRenderProps } from "react-hook-form";

export type IFormContextInput<T = unknown> = T & {
  name: string;
  id?: string;
  label: React.ReactNode;
  defaultValue?: string | unknown;
  //   modifyFieldProps?: (field: ControllerRenderProps) => { [key: string]: unknown };
  controllerRenderProps?: ControllerRenderProps;
  isClearable?: boolean;
  clearValue?: unknown;
  helperText?: React.ReactNode;
  error?: { message: string };
};
