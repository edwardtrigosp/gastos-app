"use client";

import { useTransition } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { deleteExpense } from "@/lib/actions/expenses";

interface DeleteExpenseDialogProps {
  open: boolean;
  onClose: () => void;
  expenseId: number;
}

export default function DeleteExpenseDialog({
  open,
  onClose,
  expenseId,
}: DeleteExpenseDialogProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteExpense(expenseId);
      onClose();
    });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Eliminar Gasto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar este gasto? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
