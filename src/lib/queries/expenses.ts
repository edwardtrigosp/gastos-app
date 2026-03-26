import { db } from "@/lib/db";
import { expenses, categories } from "@/db/schema";
import { eq, and, between, sql, desc } from "drizzle-orm";
import { getMonthRange, getMonthName } from "@/lib/date";
import type {
  ExpenseWithCategory,
  CategoryExpenseSummary,
  DailyExpense,
  MonthlyTrend,
} from "@/lib/types";

export async function getExpensesByMonth(
  userId: string,
  month: number,
  year: number
): Promise<ExpenseWithCategory[]> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const result = await db
    .select()
    .from(expenses)
    .innerJoin(categories, eq(expenses.categoryId, categories.id))
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    )
    .orderBy(desc(expenses.date));

  return result.map((r) => ({
    ...r.expenses,
    category: r.categories,
  }));
}

export async function getExpensesByDateRange(
  userId: string,
  from: string,
  to: string
): Promise<ExpenseWithCategory[]> {
  const result = await db
    .select()
    .from(expenses)
    .innerJoin(categories, eq(expenses.categoryId, categories.id))
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, from, to)
      )
    )
    .orderBy(desc(expenses.date));

  return result.map((r) => ({
    ...r.expenses,
    category: r.categories,
  }));
}

export async function getExpensesByCategory(
  userId: string,
  month: number,
  year: number
): Promise<CategoryExpenseSummary[]> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const result = await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      categoryColor: categories.color,
      categoryIcon: categories.icon,
      total: sql<number>`COALESCE(SUM(${expenses.amount}::numeric), 0)`,
    })
    .from(expenses)
    .innerJoin(categories, eq(expenses.categoryId, categories.id))
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    )
    .groupBy(categories.id, categories.name, categories.color, categories.icon);

  return result.map((r) => ({
    ...r,
    total: Number(r.total),
  }));
}

export async function getDailyExpenses(
  userId: string,
  month: number,
  year: number
): Promise<DailyExpense[]> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const result = await db
    .select({
      date: expenses.date,
      total: sql<number>`COALESCE(SUM(${expenses.amount}::numeric), 0)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    )
    .groupBy(expenses.date)
    .orderBy(expenses.date);

  return result.map((r) => ({
    date: r.date,
    total: Number(r.total),
  }));
}

export async function getMonthlyTrend(
  userId: string,
  year: number
): Promise<MonthlyTrend[]> {
  const result = await db
    .select({
      month: sql<number>`EXTRACT(MONTH FROM ${expenses.date}::date)`,
      total: sql<number>`COALESCE(SUM(${expenses.amount}::numeric), 0)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        sql`EXTRACT(YEAR FROM ${expenses.date}::date) = ${year}`
      )
    )
    .groupBy(sql`EXTRACT(MONTH FROM ${expenses.date}::date)`)
    .orderBy(sql`EXTRACT(MONTH FROM ${expenses.date}::date)`);

  return result.map((r) => ({
    month: Number(r.month),
    monthName: getMonthName(Number(r.month)),
    total: Number(r.total),
  }));
}

export async function getRecentExpenses(
  userId: string,
  limit = 5
): Promise<ExpenseWithCategory[]> {
  const result = await db
    .select()
    .from(expenses)
    .innerJoin(categories, eq(expenses.categoryId, categories.id))
    .where(eq(expenses.userId, userId))
    .orderBy(desc(expenses.date), desc(expenses.createdAt))
    .limit(limit);

  return result.map((r) => ({
    ...r.expenses,
    category: r.categories,
  }));
}

export async function getMonthTotal(
  userId: string,
  month: number,
  year: number
): Promise<number> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const result = await db
    .select({
      total: sql<number>`COALESCE(SUM(${expenses.amount}::numeric), 0)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    );

  return Number(result[0]?.total ?? 0);
}

export async function getMonthTransactionCount(
  userId: string,
  month: number,
  year: number
): Promise<number> {
  const { start, end } = getMonthRange(month, year);
  const startStr = start.toISOString().split("T")[0];
  const endStr = end.toISOString().split("T")[0];

  const result = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        between(expenses.date, startStr, endStr)
      )
    );

  return Number(result[0]?.count ?? 0);
}
