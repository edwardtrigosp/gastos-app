import { db } from "@/lib/db";
import { budgets, expenses, categories } from "@/db/schema";
import { eq, and, between, sql } from "drizzle-orm";
import { getMonthRange } from "@/lib/date";
import type { BudgetWithCategory } from "@/lib/types";

export async function getBudgetsByMonth(
  userId: string,
  month: number,
  year: number
): Promise<BudgetWithCategory[]> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const budgetRows = await db
    .select()
    .from(budgets)
    .innerJoin(categories, eq(budgets.categoryId, categories.id))
    .where(
      and(
        eq(budgets.userId, userId),
        eq(budgets.month, month),
        eq(budgets.year, year)
      )
    );

  const spentRows = await db
    .select({
      categoryId: expenses.categoryId,
      total: sql<number>`COALESCE(SUM(${expenses.amount}::numeric), 0)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    )
    .groupBy(expenses.categoryId);

  const spentMap = new Map(
    spentRows.map((r) => [r.categoryId, Number(r.total)])
  );

  return budgetRows.map((r) => ({
    ...r.budgets,
    category: r.categories,
    spent: spentMap.get(r.categories.id) ?? 0,
  }));
}

export async function getBudgetAlerts(
  userId: string,
  month: number,
  year: number
): Promise<BudgetWithCategory[]> {
  const allBudgets = await getBudgetsByMonth(userId, month, year);
  return allBudgets.filter(
    (b) => b.spent >= Number(b.amount) * 0.8
  );
}
