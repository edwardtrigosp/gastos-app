"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import { UserButton } from "@clerk/nextjs";
import CurrencySelector from "@/components/currency-selector";

interface HeaderProps {
  onMenuClick: () => void;
  preferredCurrency: string;
  drawerWidth: number;
}

export default function Header({
  onMenuClick,
  preferredCurrency,
  drawerWidth,
}: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        transition: "width 0.2s ease-in-out, margin-left 0.2s ease-in-out",
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <CurrencySelector currentCurrency={preferredCurrency} />
        <Box sx={{ ml: 2 }}>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 36, height: 36 } },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
