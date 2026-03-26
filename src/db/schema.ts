import {
  pgTable,
  text,
  serial,
  numeric,
  integer,
  date,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Users (synced from Clerk) ──────────────────────────────────
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  name: text("name"),
  preferredCurrency: text("preferred_currency").notNull().default("USD"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Categories ─────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

// ── Expenses ───────────────────────────────────────────────────
export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("USD"),
    description: text("description"),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("expenses_user_date_idx").on(table.userId, table.date),
    index("expenses_user_category_idx").on(table.userId, table.categoryId),
  ]
);

// ── Budgets ────────────────────────────────────────────────────
export const budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    month: integer("month").notNull(), // 1-12
    year: integer("year").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    unique("budgets_user_cat_month_year").on(
      table.userId,
      table.categoryId,
      table.month,
      table.year
    ),
    index("budgets_user_month_year_idx").on(
      table.userId,
      table.month,
      table.year
    ),
  ]
);

// ── Relations ──────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  expenses: many(expenses),
  budgets: many(budgets),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  expenses: many(expenses),
  budgets: many(budgets),
}));

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(users, { fields: [expenses.userId], references: [users.id] }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));

export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(users, { fields: [budgets.userId], references: [users.id] }),
  category: one(categories, {
    fields: [budgets.categoryId],
    references: [categories.id],
  }),
}));
