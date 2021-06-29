import { boolean, string } from "yup/lib/locale";

export const AlertTypeClass = {
  Success: "Success",
  Error: "Error",
  Info: "Info",
  Warning: "Warning",
};

export type AlertMessageType = {
  autoClose: boolean;
  fade: boolean;
  id: string;
  keepAfterRouteChange: boolean;
  message: string;
  modal: boolean;
  type: string;
};

export type AlertMessageIdType = {
  id: string;
};
