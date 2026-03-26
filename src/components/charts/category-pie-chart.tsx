"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PieChartIcon from "@mui/icons-material/PieChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { formatCurrency } from "@/lib/currency";
import type { CategoryExpenseSummary } from "@/lib/types";

interface CategoryPieChartProps {
  data: CategoryExpenseSummary[];
  currency: string;
}

export default function CategoryPieChart({
  data,
  currency,
}: CategoryPieChartProps) {
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
          <PieChartIcon sx={{ fontSize: 40, color: "text.secondary" }} />
          <Typography color="text.secondary">
            Sin datos para mostrar
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const pieData = data.map((item) => ({
    id: item.categoryId,
    value: item.total,
    label: item.categoryName,
    color: item.categoryColor,
  }));

  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2.5 } }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Gastos por Categoría
        </Typography>
        <Box sx={{ width: "100%", height: { xs: 250, sm: 300 }, overflow: "hidden" }}>
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 50,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { fade: "global", highlight: "item" },
                valueFormatter: (value) =>
                  formatCurrency(value.value, currency),
              },
            ]}
            height={300}
            margin={{ right: 120, left: 10 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
