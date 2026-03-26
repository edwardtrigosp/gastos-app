import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SavingsIcon from "@mui/icons-material/Savings";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function HomePage() {
  const features = [
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      title: "Registra tus Gastos",
      description:
        "Agrega gastos diarios con categoría, monto, descripción y fecha.",
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      title: "Visualiza tu Dinero",
      description:
        "Gráficos interactivos por categoría, tendencia mensual y gastos diarios.",
    },
    {
      icon: <SavingsIcon sx={{ fontSize: 40 }} />,
      title: "Controla Presupuestos",
      description:
        "Define límites mensuales por categoría y recibe alertas automáticas.",
    },
    {
      icon: <FileDownloadIcon sx={{ fontSize: 40 }} />,
      title: "Exporta tus Datos",
      description:
        "Descarga tus gastos en formato CSV para análisis externo.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <SavingsIcon color="primary" sx={{ fontSize: 48 }} />
          <Typography variant="h3" fontWeight={800}>
            GastosApp
          </Typography>
        </Box>

        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Tu aplicación para el control inteligente de gastos diarios.
          Simple, visual y multi-moneda.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            href="/sign-up"
          >
            Comenzar Gratis
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="/sign-in"
          >
            Iniciar Sesión
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
            mt: 8,
            width: "100%",
          }}
        >
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  py: 4,
                }}
              >
                <Box sx={{ color: "primary.main", mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{ py: 3, textAlign: "center", borderTop: 1, borderColor: "divider" }}
      >
        <Typography variant="body2" color="text.secondary">
          GastosApp &copy; {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
