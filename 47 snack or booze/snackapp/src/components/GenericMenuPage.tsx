"use client";

import { DPTIndex, useDataCtx } from "@/components/provider";
import { useState } from "react";
import GenericEntry from "./GenericEntry";
import Link from "next/link";

export default function GenericPage(entry: DPTIndex) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { [entry]: data } = useDataCtx();

  const handleCreate = () => {
    if (name === "" || description === "") return;
    data.setData([
      ...data.data,
      {
        id: String(data.data.length + 1),
        name: name,
        description: description,
      },
    ]);
    setName("");
    setDescription("");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">Food</h1>
      {data.data.map((item) => (
        <Link href={`${entry}/${item.id}`} key={item.id}>
          <GenericEntry data={item} />
        </Link>
      ))}
      <div>
        Create new {entry}:{" "}
        <input
          value={name}
          className="text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={description}
          className="text-black"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate} className="text-lg border">
          Create
        </button>
      </div>
    </div>
  );
}
