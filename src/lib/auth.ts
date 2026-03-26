import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error("No autenticado");

  // Asegurar que el usuario existe en la DB (auto-sync)
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (existing.length === 0) {
    const user = await currentUser();
    await db.insert(users).values({
      id: userId,
      email: user?.emailAddresses[0]?.emailAddress ?? "",
      name: [user?.firstName, user?.lastName].filter(Boolean).join(" ") || null,
    }).onConflictDoNothing();
  }

  return userId;
}
