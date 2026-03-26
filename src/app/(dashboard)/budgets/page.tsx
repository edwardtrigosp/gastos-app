import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAuthUserId } from "@/lib/auth";
import { getBudgetsByMonth } from "@/lib/queries/budgets";
import { getAllCategories } from "@/lib/queries/categories";
import { getUserPreferences } from "@/lib/queries/user";
import { getCurrentMonthYear, getMonthName } from "@/lib/date";
import BudgetProgress from "@/components/budgets/budget-progress";
import AddBudgetButton from "@/components/budgets/add-budget-button";

export const metadata = {
  title: "Presupuestos | GastosApp",
};

export default async function BudgetsPage() {
  const userId = await getAuthUserId();
  const { month, year } = getCurrentMonthYear();
  const [budgets, categories, prefs] = await Promise.all([
    getBudgetsByMonth(userId, month, year),
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
            Presupuestos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getMonthName(month)} {year}
          </Typography>
        </Box>
        <AddBudgetButton
          categories={categories}
          currency={prefs.preferredCurrency}
          month={month}
          year={year}
        />
      </Box>

      <BudgetProgress
        budgets={budgets}
        currency={prefs.preferredCurrency}
      />
    </Box>
  );
}
