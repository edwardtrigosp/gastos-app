import { getAuthUserId } from "@/lib/auth";
import { getExpensesByDateRange } from "@/lib/queries/expenses";

export async function GET(request: Request) {
  const userId = await getAuthUserId();

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return new Response("Parámetros from y to requeridos", { status: 400 });
  }

  const expenses = await getExpensesByDateRange(userId, from, to);

  const header = "Fecha,Categoría,Descripción,Monto,Moneda";
  const rows = expenses.map((e) => {
    const desc = (e.description ?? "").replace(/"/g, '""');
    return `${e.date},"${e.category.name}","${desc}",${e.amount},${e.currency}`;
  });
  const csv = [header, ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="gastos-${from}-${to}.csv"`,
    },
  });
}
