import { OrderData } from "@/types/payment.types";

export interface OrderDocument extends Omit<OrderData, "createdAt" | "updatedAt"> {
  id: string;
  createdAt: Date | { toDate?: () => Date };
  updatedAt: Date | { toDate?: () => Date };
}

