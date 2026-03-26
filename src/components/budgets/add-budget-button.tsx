"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BudgetForm from "./budget-form";
import type { Category } from "@/lib/types";

interface AddBudgetButtonProps {
  categories: Category[];
  currency: string;
  month: number;
  year: number;
}

export default function AddBudgetButton({
  categories,
  currency,
  month,
  year,
}: AddBudgetButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Nuevo Presupuesto
      </Button>
      <BudgetForm
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        currency={currency}
        month={month}
        year={year}
      />
    </>
  );
}
