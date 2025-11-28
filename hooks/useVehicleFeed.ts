"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchAllPublicVehicles, type PublicVehicle } from "@/lib/api";

const PAGE_SIZE = 12;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function useVehicleFeed() {
  const [allVehicles, setAllVehicles] = useState<PublicVehicle[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [exploreClicks, setExploreClicks] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  // initial fetch
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await fetchAllPublicVehicles();

        setAllVehicles(list);
        setOrder(shuffle(list.map((_, i) => i)));
        setOffset(0);
      } catch (e) {
        console.error(e);
        setError("Failed to load vehicles.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const hasVehicles = allVehicles.length > 0;

  // compute current page
  const vehicles = useMemo(() => {
    if (!hasVehicles) return [];

    const n = allVehicles.length;
    const result: PublicVehicle[] = [];

    for (let i = 0; i < PAGE_SIZE; i++) {
      const idx = offset + i;
      if (idx >= n) break;
      const vehicleIndex = order[idx];
      const v = allVehicles[vehicleIndex];
      if (v) result.push(v);
    }

    return result;
  }, [allVehicles, order, offset, hasVehicles]);

  // helper: advance one page (12 vehicles) with reshuffle at end
  const advancePage = () => {
    if (!hasVehicles) return;

    const n = allVehicles.length;
    if (n === 0) return;

    let newOffset = offset + PAGE_SIZE;

    if (newOffset >= n) {
      newOffset = 0;
      setOrder((prev) =>
        prev.length === n ? shuffle(prev) : shuffle(allVehicles.map((_, i) => i))
      );
    }

    setOffset(newOffset);
  };

  // Explore More: every 3rd click opens dialog instead of paging
  const handleExploreMore = () => {
    if (!hasVehicles) return;

    const nextClick = exploreClicks + 1;

    // Every 3rd click → show dialog, no page change
    if (nextClick % 3 === 0) {
      setExploreClicks(nextClick);
      setShowDialog(true);
      return;
    }

    // normal page advance
    setExploreClicks(nextClick);
    advancePage();
  };

  // Back: go to previous 12; if at start, go to last page
  const handleBack = () => {
    if (!hasVehicles) return;

    const n = allVehicles.length;
    if (n === 0) return;

    let newOffset = offset - PAGE_SIZE;

    if (newOffset < 0) {
      const pageCount = Math.max(1, Math.ceil(n / PAGE_SIZE));
      newOffset = (pageCount - 1) * PAGE_SIZE;
      if (newOffset >= n) {
        newOffset = Math.max(0, n - PAGE_SIZE);
      }
    }

    setOffset(newOffset);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  // Called when user clicks "Continue exploring →" in dialog
  const continueAfterDialog = () => {
    setShowDialog(false);
    advancePage();
  };

  return {
    loading,
    error,
    hasVehicles,
    vehicles,
    handleExploreMore,
    handleBack,
    showDialog,
    closeDialog,
    continueAfterDialog,
    totalCount: allVehicles.length,
  };
}
