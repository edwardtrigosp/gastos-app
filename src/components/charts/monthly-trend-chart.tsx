"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { formatCurrency } from "@/lib/currency";
import type { MonthlyTrend } from "@/lib/types";

interface MonthlyTrendChartProps {
  data: MonthlyTrend[];
  currency: string;
}

export default function MonthlyTrendChart({
  data,
  currency,
}: MonthlyTrendChartProps) {
  if (data.length === 0) {
    return (
      <Card sx={{ height: "100%", borderRadius: 3 }}>
        <CardContent
          sx={{
            textAlign: "center",
            pt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ShowChartIcon sx={{ fontSize: 40, color: "text.secondary" }} />
          <Typography color="text.secondary">
            Sin datos para mostrar
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Tendencia Mensual
        </Typography>
        <Box sx={{ width: "100%", height: { xs: 250, sm: 300 }, overflow: "hidden" }}>
          <LineChart
            xAxis={[
              {
                data: data.map((d) => d.monthName),
                scaleType: "point",
              },
            ]}
            series={[
              {
                data: data.map((d) => d.total),
                area: true,
                color: "#90caf9",
                valueFormatter: (value) =>
                  value !== null ? formatCurrency(value, currency) : "",
              },
            ]}
            height={300}
            margin={{ left: 60, right: 20 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
