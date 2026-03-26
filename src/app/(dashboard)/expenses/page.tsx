import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAuthUserId } from "@/lib/auth";
import { getExpensesByMonth } from "@/lib/queries/expenses";
import { getAllCategories } from "@/lib/queries/categories";
import { getUserPreferences } from "@/lib/queries/user";
import { getCurrentMonthYear, getMonthName } from "@/lib/date";
import ExpenseTable from "@/components/expenses/expense-table";
import AddExpenseButton from "@/components/expenses/add-expense-button";

export const metadata = {
  title: "Gastos | GastosApp",
};

export default async function ExpensesPage() {
  const userId = await getAuthUserId();
  const { month, year } = getCurrentMonthYear();
  const [expenses, categories, prefs] = await Promise.all([
    getExpensesByMonth(userId, month, year),
    getAllCategories(),
    getUserPreferences(userId),
  ]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Gastos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getMonthName(month)} {year}
          </Typography>
        </Box>
        <AddExpenseButton
          categories={categories}
          currency={prefs.preferredCurrency}
        />
      </Box>

      <ExpenseTable
        expenses={expenses}
        categories={categories}
        currency={prefs.preferredCurrency}
      />
    </Box>
  );
}
