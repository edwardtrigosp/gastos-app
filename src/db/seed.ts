import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories } from "./schema";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const CATEGORIES = [
  { name: "Alimentación", slug: "alimentacion", icon: "Restaurant", color: "#22c55e" },
  { name: "Transporte", slug: "transporte", icon: "DirectionsCar", color: "#3b82f6" },
  { name: "Vivienda", slug: "vivienda", icon: "Home", color: "#a855f7" },
  { name: "Servicios", slug: "servicios", icon: "Bolt", color: "#eab308" },
  { name: "Salud", slug: "salud", icon: "Favorite", color: "#ef4444" },
  { name: "Educación", slug: "educacion", icon: "School", color: "#06b6d4" },
  { name: "Entretenimiento", slug: "entretenimiento", icon: "SportsEsports", color: "#f97316" },
  { name: "Ropa", slug: "ropa", icon: "Checkroom", color: "#ec4899" },
  { name: "Otros", slug: "otros", icon: "MoreHoriz", color: "#6b7280" },
];

async function seed() {
  console.log("Seeding categories...");
  await db
    .insert(categories)
    .values(CATEGORIES)
    .onConflictDoNothing({ target: categories.slug });
  console.log("Done! Inserted", CATEGORIES.length, "categories.");
}

seed().catch(console.error);
