import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function DashboardLoading() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Skeleton variant="text" width={200} height={40} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={100} />
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Skeleton variant="rounded" height={350} />
        <Skeleton variant="rounded" height={350} />
      </Box>
      <Skeleton variant="rounded" height={350} />
      <Skeleton variant="rounded" height={300} />
    </Box>
  );
}
