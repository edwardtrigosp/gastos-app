"use client";

import { useState, useTransition } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@/components/category-icon";
import { createExpense, updateExpense } from "@/lib/actions/expenses";
import type { Category, Expense } from "@/lib/types";

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  currency: string;
  expense?: Expense | null;
}

export default function ExpenseForm({
  open,
  onClose,
  categories,
  currency,
  expense,
}: ExpenseFormProps) {
  const isEditing = !!expense;
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState(expense ? expense.amount : "");
  const [categoryId, setCategoryId] = useState(
    expense ? expense.categoryId : ""
  );
  const [description, setDescription] = useState(expense?.description ?? "");
  const [date, setDate] = useState(
    expense?.date ?? new Date().toISOString().split("T")[0]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const data = {
      amount: parseFloat(String(amount)),
      categoryId: Number(categoryId),
      description: description || undefined,
      date,
      currency,
    };

    if (!data.amount || data.amount <= 0) {
      setError("Ingresa un monto válido");
      return;
    }
    if (!data.categoryId) {
      setError("Selecciona una categoría");
      return;
    }

    startTransition(async () => {
      try {
        if (isEditing && expense) {
          await updateExpense(expense.id, data);
        } else {
          await createExpense(data);
        }
        onClose();
      } catch {
        setError("Error al guardar el gasto");
      }
    });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AttachMoneyIcon color="primary" />
            {isEditing ? "Editar Gasto" : "Nuevo Gasto"}
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            pt: "16px !important",
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Monto"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">{currency}</InputAdornment>
                ),
              },
              htmlInput: { step: "0.01", min: "0.01" },
            }}
          />

          <FormControl required fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryId}
              label="Categoría"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <CategoryIcon
                        icon={cat.icon}
                        color={cat.color}
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText primary={cat.name} />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            label="Fecha"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
              inputLabel: { shrink: true },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            disableElevation
          >
            {isPending
              ? "Guardando..."
              : isEditing
              ? "Actualizar"
              : "Agregar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
