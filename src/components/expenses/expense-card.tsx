import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { formatCurrency } from "@/lib/currency";

interface SummaryCardsProps {
  totalMonth: number;
  transactionCount: number;
  currency: string;
  daysInMonth: number;
}

export default function SummaryCards({
  totalMonth,
  transactionCount,
  currency,
  daysInMonth,
}: SummaryCardsProps) {
  const dailyAvg = daysInMonth > 0 ? totalMonth / daysInMonth : 0;

  const cards = [
    {
      title: "Total del Mes",
      value: formatCurrency(totalMonth, currency),
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      color: "#90caf9",
    },
    {
      title: "Transacciones",
      value: transactionCount.toString(),
      icon: <ReceiptLongIcon sx={{ fontSize: 28 }} />,
      color: "#ce93d8",
    },
    {
      title: "Promedio Diario",
      value: formatCurrency(dailyAvg, currency),
      icon: <CalendarTodayIcon sx={{ fontSize: 28 }} />,
      color: "#66bb6a",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      {cards.map((card) => (
        <Card key={card.title} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight={500}
                >
                  {card.title}
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                  {card.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: card.color + "1A",
                  color: card.color,
                  borderRadius: 3,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
