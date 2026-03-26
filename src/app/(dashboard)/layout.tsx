"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Sidebar, {
  DRAWER_WIDTH_OPEN,
  DRAWER_WIDTH_COLLAPSED,
} from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_OPEN;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header
        onMenuClick={() => setMobileOpen(true)}
        preferredCurrency="USD"
        drawerWidth={drawerWidth}
      />
      <Sidebar
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minWidth: 0,
          transition: "width 0.2s ease-in-out",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
