import { db } from "@/lib/db";
import { categories } from "@/db/schema";
import type { Category } from "@/lib/types";

export async function getAllCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(categories.name);
}
