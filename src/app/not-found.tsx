import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h1" fontWeight={700} color="primary">
        404
      </Typography>
      <Typography variant="h5">Página no encontrada</Typography>
      <Typography color="text.secondary">
        La página que buscas no existe.
      </Typography>
      <Button variant="contained" href="/dashboard">
        Ir al Dashboard
      </Button>
    </Box>
  );
}
