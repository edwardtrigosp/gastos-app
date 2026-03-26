import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function BudgetsLoading() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rounded" width={170} height={36} />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 2,
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" height={120} />
        ))}
      </Box>
    </Box>
  );
}
