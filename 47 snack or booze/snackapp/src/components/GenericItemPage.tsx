"use client";

import Link from "next/link";
import GenericEntry from "./GenericEntry";
import { DataProviderType, useDataCtx } from "./provider";

export default function GenericMenu({
  id,
  index,
}: {
  id: string;
  index: keyof DataProviderType;
}) {
  const sbv = useDataCtx();
  const data = sbv[index];
  const ltm = data.data.find((item) => item.id === id);
  if (!ltm) return <div>Not found</div>;
  return (
    <div className="flex flex-col gap-4">
      <GenericEntry data={ltm} />
      <Link href={`/${index}`}>Return</Link>
    </div>
  );
}
