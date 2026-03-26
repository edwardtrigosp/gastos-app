"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { formatCurrency } from "@/lib/currency";
import type { DailyExpense } from "@/lib/types";

interface DailyBarChartProps {
  data: DailyExpense[];
  currency: string;
}

export default function DailyBarChart({ data, currency }: DailyBarChartProps) {
  if (data.length === 0) {
    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardContent
          sx={{
            textAlign: "center",
            pt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <BarChartIcon sx={{ fontSize: 40, color: "text.secondary" }} />
          <Typography color="text.secondary">
            Sin datos para mostrar
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const labels = data.map((d) => d.date.split("-")[2]);

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Gastos Diarios
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: { xs: 250, sm: 300 },
            overflow: "hidden",
          }}
        >
          <BarChart
            xAxis={[
              {
                data: labels,
                scaleType: "band",
                label: "Día",
              },
            ]}
            series={[
              {
                data: data.map((d) => d.total),
                color: "#ce93d8",
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
