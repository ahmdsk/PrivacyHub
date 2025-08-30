"use client";

import { Printer } from "lucide-react";
import { Button } from "./ui/button";

export function PrintButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.print()}
      aria-label="Print this page"
    >
      <Printer className="mr-2 h-4 w-4" />
      Print
    </Button>
  );
}
