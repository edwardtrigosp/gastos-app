import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { users, expenses, budgets, categories } from "@/db/schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Expense = InferSelectModel<typeof expenses>;
export type NewExpense = InferInsertModel<typeof expenses>;

export type Budget = InferSelectModel<typeof budgets>;
export type NewBudget = InferInsertModel<typeof budgets>;

export type Category = InferSelectModel<typeof categories>;

export interface ExpenseWithCategory extends Expense {
  category: Category;
}

export interface BudgetWithCategory extends Budget {
  category: Category;
  spent: number;
}

export interface CategoryExpenseSummary {
  categoryId: number;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  total: number;
}

export interface DailyExpense {
  date: string;
  total: number;
}

export interface MonthlyTrend {
  month: number;
  monthName: string;
  total: number;
}
