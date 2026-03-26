"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function DashboardError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: "error.main" }} />
      <Typography variant="h5" fontWeight={600}>
        Algo salió mal
      </Typography>
      <Typography color="text.secondary">
        Ocurrió un error inesperado. Por favor intenta de nuevo.
      </Typography>
      <Button variant="contained" onClick={reset}>
        Reintentar
      </Button>
    </Box>
  );
}
