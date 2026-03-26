import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExportForm from "@/components/export/export-form";

export const metadata = {
  title: "Exportar | GastosApp",
};

export default function ExportPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Exportar Datos
      </Typography>
      <ExportForm />
    </Box>
  );
}
