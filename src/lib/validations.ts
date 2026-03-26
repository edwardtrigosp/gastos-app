import { z } from "zod";
import { CURRENCIES } from "./currency";

export const expenseSchema = z.object({
  amount: z
    .number({ message: "El monto es requerido" })
    .positive("El monto debe ser mayor a 0"),
  categoryId: z
    .number({ message: "La categoría es requerida" })
    .int()
    .positive(),
  description: z.string().max(500, "Máximo 500 caracteres").optional(),
  date: z.string().min(1, "La fecha es requerida"),
  currency: z
    .string()
    .refine((val) => val in CURRENCIES, "Moneda no válida"),
});

export const budgetSchema = z.object({
  categoryId: z
    .number({ message: "La categoría es requerida" })
    .int()
    .positive(),
  amount: z
    .number({ message: "El monto es requerido" })
    .positive("El monto debe ser mayor a 0"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
