"use server";

import { db } from "@/lib/db";
import { budgets } from "@/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { budgetSchema } from "@/lib/validations";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function setBudget(data: {
  categoryId: number;
  amount: number;
  month: number;
  year: number;
}) {
  const userId = await getAuthUserId();
  const validated = budgetSchema.parse(data);

  await db
    .insert(budgets)
    .values({
      userId,
      categoryId: validated.categoryId,
      amount: validated.amount.toFixed(2),
      month: validated.month,
      year: validated.year,
    })
    .onConflictDoUpdate({
      target: [budgets.userId, budgets.categoryId, budgets.month, budgets.year],
      set: { amount: validated.amount.toFixed(2) },
    });

  revalidatePath("/budgets");
  revalidatePath("/dashboard");
}

export async function deleteBudget(id: number) {
  const userId = await getAuthUserId();

  await db
    .delete(budgets)
    .where(and(eq(budgets.id, id), eq(budgets.userId, userId)));

  revalidatePath("/budgets");
  revalidatePath("/dashboard");
}
