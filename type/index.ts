export * from "./authType";

export type Material = {
  wasteType: string;
  qty: number;
  unit: string;
};

export type LoadingType = "iddle" | "loading" | "error";
