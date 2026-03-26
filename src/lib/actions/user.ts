"use server";

import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { getAuthUserId } from "@/lib/auth";
import { CURRENCIES } from "@/lib/currency";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updatePreferredCurrency(currency: string) {
  if (!(currency in CURRENCIES)) {
    throw new Error("Moneda no válida");
  }

  const userId = await getAuthUserId();

  await db
    .update(users)
    .set({ preferredCurrency: currency, updatedAt: new Date() })
    .where(eq(users.id, userId));

  revalidatePath("/", "layout");
}
