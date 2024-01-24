"use client";

import GenericItemPage from "@/components/GenericItemPage";

export default function DrinksPageId({
  params: { foodId },
}: {
  params: { foodId: string };
}) {
  return GenericItemPage({ id: foodId, index: "food" });
}
