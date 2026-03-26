"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import SavingsIcon from "@mui/icons-material/Savings";
import { useTransition } from "react";
import { deleteBudget } from "@/lib/actions/budgets";
import { formatCurrency } from "@/lib/currency";
import CategoryIcon from "@/components/category-icon";
import type { BudgetWithCategory } from "@/lib/types";

interface BudgetProgressProps {
  budgets: BudgetWithCategory[];
  currency: string;
}

function getProgressColor(pct: number): "success" | "warning" | "error" {
  if (pct >= 100) return "error";
  if (pct >= 80) return "warning";
  return "success";
}

function BudgetCard({
  budget,
  currency,
}: {
  budget: BudgetWithCategory;
  currency: string;
}) {
  const [isPending, startTransition] = useTransition();
  const limit = Number(budget.amount);
  const pct = limit > 0 ? Math.min((budget.spent / limit) * 100, 100) : 0;

  function handleDelete() {
    startTransition(async () => {
      await deleteBudget(budget.id);
    });
  }

  return (
    <Card sx={{ borderRadius: 3, opacity: isPending ? 0.5 : 1 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CategoryIcon
              icon={budget.category.icon}
              color={budget.category.color}
              size="medium"
              withBackground
            />
            <Typography fontWeight={600}>{budget.category.name}</Typography>
          </Box>
          <IconButton
            size="small"
            color="error"
            onClick={handleDelete}
            disabled={isPending}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        <LinearProgress
          variant="determinate"
          value={pct}
          color={getProgressColor(pct)}
          sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {formatCurrency(budget.spent, currency)} /{" "}
            {formatCurrency(limit, currency)}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={700}
            color={
              pct >= 100
                ? "error.main"
                : pct >= 80
                ? "warning.main"
                : "success.main"
            }
          >
            {Math.round(pct)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function BudgetProgress({
  budgets,
  currency,
}: BudgetProgressProps) {
  if (budgets.length === 0) {
    return (
      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SavingsIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography color="text.secondary">
          No hay presupuestos configurados para este mes.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 2,
      }}
    >
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} currency={currency} />
      ))}
    </Box>
  );
}
