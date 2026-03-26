import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getAuthUserId } from "@/lib/auth";
import {
  getExpensesByCategory,
  getDailyExpenses,
  getMonthlyTrend,
  getRecentExpenses,
  getMonthTotal,
  getMonthTransactionCount,
} from "@/lib/queries/expenses";
import { getBudgetAlerts } from "@/lib/queries/budgets";
import { getAllCategories } from "@/lib/queries/categories";
import { getUserPreferences } from "@/lib/queries/user";
import { getCurrentMonthYear, getMonthName, getMonthRange } from "@/lib/date";
import { formatCurrency } from "@/lib/currency";
import { getDaysInMonth } from "date-fns";
import SummaryCards from "@/components/expenses/expense-card";
import CategoryPieChart from "@/components/charts/category-pie-chart";
import MonthlyTrendChart from "@/components/charts/monthly-trend-chart";
import DailyBarChart from "@/components/charts/daily-bar-chart";
import ExpenseTable from "@/components/expenses/expense-table";

export const metadata = {
  title: "Dashboard | GastosApp",
};

export default async function DashboardPage() {
  const userId = await getAuthUserId();
  const { month, year } = getCurrentMonthYear();

  const [
    categoryData,
    dailyData,
    trendData,
    recentExpenses,
    totalMonth,
    transactionCount,
    budgetAlerts,
    categories,
    prefs,
  ] = await Promise.all([
    getExpensesByCategory(userId, month, year),
    getDailyExpenses(userId, month, year),
    getMonthlyTrend(userId, year),
    getRecentExpenses(userId, 10),
    getMonthTotal(userId, month, year),
    getMonthTransactionCount(userId, month, year),
    getBudgetAlerts(userId, month, year),
    getAllCategories(),
    getUserPreferences(userId),
  ]);

  const currency = prefs.preferredCurrency;
  const daysInCurrentMonth = getDaysInMonth(new Date(year, month - 1));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: -2 }}>
        {getMonthName(month)} {year}
      </Typography>

      {/* Summary Cards */}
      <SummaryCards
        totalMonth={totalMonth}
        transactionCount={transactionCount}
        currency={currency}
        daysInMonth={daysInCurrentMonth}
      />

      {/* Budget Alerts */}
      {budgetAlerts.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {budgetAlerts.map((alert) => {
            const pct = Math.round(
              (alert.spent / Number(alert.amount)) * 100
            );
            const isOver = pct >= 100;
            return (
              <Alert
                key={alert.id}
                severity={isOver ? "error" : "warning"}
              >
                <AlertTitle>
                  {alert.category.name}: {pct}% del presupuesto
                </AlertTitle>
                Gastado {formatCurrency(alert.spent, currency)} de{" "}
                {formatCurrency(Number(alert.amount), currency)}
              </Alert>
            );
          })}
        </Box>
      )}

      {/* Charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <CategoryPieChart data={categoryData} currency={currency} />
        <MonthlyTrendChart data={trendData} currency={currency} />
      </Box>

      <DailyBarChart data={dailyData} currency={currency} />

      {/* Recent Expenses */}
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Gastos Recientes
        </Typography>
        <ExpenseTable
          expenses={recentExpenses}
          categories={categories}
          currency={currency}
        />
      </Box>
    </Box>
  );
}
