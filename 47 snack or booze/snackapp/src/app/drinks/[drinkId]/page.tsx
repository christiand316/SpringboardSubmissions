"use client";

import GenericItemPage from "@/components/GenericItemPage";

export default function DrinksPageId({
  params: { drinkId },
}: {
  params: { drinkId: string };
}) {
  return GenericItemPage({ id: drinkId, index: "drinks" });
}
