"use server";

import { db } from "@/lib/db";
import { expenses } from "@/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { expenseSchema } from "@/lib/validations";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createExpense(data: {
  amount: number;
  categoryId: number;
  description?: string;
  date: string;
  currency: string;
}) {
  const userId = await getAuthUserId();
  const validated = expenseSchema.parse(data);

  await db.insert(expenses).values({
    userId,
    categoryId: validated.categoryId,
    amount: validated.amount.toFixed(2),
    currency: validated.currency,
    description: validated.description ?? null,
    date: validated.date,
  });

  revalidatePath("/dashboard");
  revalidatePath("/expenses");
}

export async function updateExpense(
  id: number,
  data: {
    amount: number;
    categoryId: number;
    description?: string;
    date: string;
    currency: string;
  }
) {
  const userId = await getAuthUserId();
  const validated = expenseSchema.parse(data);

  const result = await db
    .update(expenses)
    .set({
      categoryId: validated.categoryId,
      amount: validated.amount.toFixed(2),
      currency: validated.currency,
      description: validated.description ?? null,
      date: validated.date,
    })
    .where(and(eq(expenses.id, id), eq(expenses.userId, userId)));

  revalidatePath("/dashboard");
  revalidatePath("/expenses");
  return result;
}

export async function deleteExpense(id: number) {
  const userId = await getAuthUserId();

  await db
    .delete(expenses)
    .where(and(eq(expenses.id, id), eq(expenses.userId, userId)));

  revalidatePath("/dashboard");
  revalidatePath("/expenses");
}
