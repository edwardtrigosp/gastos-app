"use client";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import BoltIcon from "@mui/icons-material/Bolt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { SxProps, Theme } from "@mui/material/styles";

const ICON_MAP: Record<string, React.ElementType> = {
  Restaurant: RestaurantIcon,
  DirectionsCar: DirectionsCarIcon,
  Home: HomeIcon,
  Bolt: BoltIcon,
  Favorite: FavoriteIcon,
  School: SchoolIcon,
  SportsEsports: SportsEsportsIcon,
  Checkroom: CheckroomIcon,
  MoreHoriz: MoreHorizIcon,
};

interface CategoryIconProps {
  icon: string;
  color?: string;
  size?: "small" | "medium" | "large";
  withBackground?: boolean;
  sx?: SxProps<Theme>;
}

export default function CategoryIcon({
  icon,
  color,
  size = "medium",
  withBackground = false,
  sx,
}: CategoryIconProps) {
  const IconComponent = ICON_MAP[icon] ?? MoreHorizIcon;
  const fontSize = size === "small" ? 18 : size === "large" ? 32 : 24;

  if (withBackground) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: fontSize + 16,
          height: fontSize + 16,
          borderRadius: 12,
          backgroundColor: color ? `${color}22` : undefined,
        }}
      >
        <IconComponent
          sx={{ fontSize, color: color ?? "inherit", ...sx }}
        />
      </span>
    );
  }

  return (
    <IconComponent
      sx={{ fontSize, color: color ?? "inherit", ...sx }}
    />
  );
}
