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
import SavingsIcon from "@mui/icons-material/Savings";
import CategoryIcon from "@/components/category-icon";
import { setBudget } from "@/lib/actions/budgets";
import type { Category } from "@/lib/types";

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
  currency: string;
  month: number;
  year: number;
}

export default function BudgetForm({
  open,
  onClose,
  categories,
  currency,
  month,
  year,
}: BudgetFormProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!categoryId || !amount || parseFloat(amount) <= 0) {
      setError("Completa todos los campos correctamente");
      return;
    }

    startTransition(async () => {
      try {
        await setBudget({
          categoryId: Number(categoryId),
          amount: parseFloat(amount),
          month,
          year,
        });
        setCategoryId("");
        setAmount("");
        onClose();
      } catch {
        setError("Error al guardar el presupuesto");
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
            <SavingsIcon color="primary" />
            Establecer Presupuesto
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

          <FormControl required fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={categoryId}
              label="Categoría"
              onChange={(e) => setCategoryId(e.target.value as number)}
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
            label="Límite mensual"
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
            {isPending ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
