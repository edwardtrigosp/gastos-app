"use client";

import { useState, useTransition } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { CURRENCY_LIST } from "@/lib/currency";
import { updatePreferredCurrency } from "@/lib/actions/user";

interface CurrencySelectorProps {
  currentCurrency: string;
}

export default function CurrencySelector({
  currentCurrency,
}: CurrencySelectorProps) {
  const [currency, setCurrency] = useState(currentCurrency);
  const [isPending, startTransition] = useTransition();

  function handleChange(event: SelectChangeEvent) {
    const newCurrency = event.target.value;
    setCurrency(newCurrency);
    startTransition(async () => {
      await updatePreferredCurrency(newCurrency);
    });
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={currency}
        onChange={handleChange}
        disabled={isPending}
        sx={{
          "& .MuiSelect-select": { py: 0.75 },
        }}
      >
        {CURRENCY_LIST.map((c) => (
          <MenuItem key={c.code} value={c.code}>
            {c.symbol} {c.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
