"use client";
import { Button } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

export function LogoutButton({ logout }: { logout: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await logout();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [logout]);

  return (
    <Button isLoading={loading} onClick={handleLogout}>
      Login
    </Button>
  );
}
