"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ExpenseForm from "./expense-form";
import DeleteExpenseDialog from "./delete-expense-dialog";
import CategoryIcon from "@/components/category-icon";
import { formatCurrency } from "@/lib/currency";
import { formatDateShort } from "@/lib/date";
import type { ExpenseWithCategory, Category } from "@/lib/types";

interface ExpenseTableProps {
  expenses: ExpenseWithCategory[];
  categories: Category[];
  currency: string;
}

export default function ExpenseTable({
  expenses,
  categories,
  currency,
}: ExpenseTableProps) {
  const [editExpense, setEditExpense] = useState<ExpenseWithCategory | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (expenses.length === 0) {
    return (
      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ReceiptLongIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography color="text.secondary">
          No hay gastos registrados. ¡Agrega tu primer gasto!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflowX: "auto" }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell align="center" sx={{ width: 100 }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} hover>
                <TableCell>
                  <Typography variant="body2">
                    {formatDateShort(expense.date)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={
                      <CategoryIcon
                        icon={expense.category.icon}
                        size="small"
                      />
                    }
                    label={expense.category.name}
                    size="small"
                    sx={{
                      bgcolor: expense.category.color + "22",
                      color: expense.category.color,
                      fontWeight: 600,
                      "& .MuiChip-icon": { color: expense.category.color },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 250 }}>
                    {expense.description || "—"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>
                    {formatCurrency(Number(expense.amount), expense.currency)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setEditExpense(expense)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleteId(expense.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ExpenseForm
        open={!!editExpense}
        onClose={() => setEditExpense(null)}
        categories={categories}
        currency={currency}
        expense={editExpense}
      />

      {deleteId !== null && (
        <DeleteExpenseDialog
          open
          onClose={() => setDeleteId(null)}
          expenseId={deleteId}
        />
      )}
    </>
  );
}
