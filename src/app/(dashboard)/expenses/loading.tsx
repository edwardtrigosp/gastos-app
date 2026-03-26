import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function ExpensesLoading() {
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
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="rounded" width={140} height={36} />
      </Box>
      <Skeleton variant="rounded" height={400} />
    </Box>
  );
}
