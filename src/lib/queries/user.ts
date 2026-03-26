import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserPreferences(userId: string) {
  const result = await db
    .select({
      preferredCurrency: users.preferredCurrency,
    })
    .from(users)
    .where(eq(users.id, userId));

  return result[0] ?? { preferredCurrency: "USD" };
}
