"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SavingsIcon from "@mui/icons-material/Savings";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const DRAWER_WIDTH_OPEN = 240;
const DRAWER_WIDTH_COLLAPSED = 68;

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
  { label: "Gastos", href: "/expenses", icon: <ReceiptLongIcon /> },
  { label: "Presupuestos", href: "/budgets", icon: <SavingsIcon /> },
  { label: "Exportar", href: "/export", icon: <FileDownloadIcon /> },
];

interface SidebarProps {
  mobileOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  mobileOpen,
  collapsed,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_OPEN;

  const drawerContent = (showFull: boolean) => (
    <>
      <Toolbar
        sx={{
          justifyContent: showFull ? "space-between" : "center",
          px: showFull ? 2 : 0,
          minHeight: "64px !important",
        }}
      >
        {showFull ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SavingsIcon color="primary" sx={{ fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700} color="primary">
              GastosApp
            </Typography>
          </Box>
        ) : (
          <SavingsIcon color="primary" sx={{ fontSize: 28 }} />
        )}
      </Toolbar>
      <Divider />
      <List sx={{ px: showFull ? 1 : 0.5, pt: 1, flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const button = (
            <ListItemButton
              component={Link}
              href={item.href}
              selected={isActive}
              onClick={onClose}
              sx={{
                borderRadius: 2,
                justifyContent: showFull ? "initial" : "center",
                px: showFull ? 2 : 1.5,
                minHeight: 44,
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                  "& .MuiListItemIcon-root": { color: "inherit" },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: showFull ? 40 : 0,
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {showFull && <ListItemText primary={item.label} />}
            </ListItemButton>
          );

          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              {showFull ? (
                button
              ) : (
                <Tooltip title={item.label} placement="right" arrow>
                  {button}
                </Tooltip>
              )}
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          py: 1,
        }}
      >
        <IconButton onClick={onToggleCollapse} size="small">
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH_OPEN },
        }}
      >
        {drawerContent(true)}
      </Drawer>
      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.2s ease-in-out",
            overflowX: "hidden",
          },
        }}
        open
      >
        {drawerContent(!collapsed)}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH_OPEN, DRAWER_WIDTH_COLLAPSED };
