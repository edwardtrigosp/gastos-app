"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ExpenseForm from "./expense-form";
import type { Category } from "@/lib/types";

interface AddExpenseButtonProps {
  categories: Category[];
  currency: string;
}

export default function AddExpenseButton({
  categories,
  currency,
}: AddExpenseButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Nuevo Gasto
      </Button>
      <ExpenseForm
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        currency={currency}
      />
    </>
  );
}
