"use client";

import { createPlaylist } from "@/libs/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});

export default function NewPlaylist() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await createPlaylist(data);
    reset();
  });

  return (
    <div className="border p-4 max-w-sm">
      <h2 className="text-lg">New playlist</h2>
      <form
        className="text-slate-500 flex flex-col gap-6  "
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap">
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name")} required />
          {errors.name && (
            <div>
              {errors.name.message || "Name needs to be least 3 characters"}
            </div>
          )}
        </div>
        <div className="flex flex-col gap">
          <label htmlFor="description">Description</label>
          <input id="description" {...register("description")} required />
          {errors.description && (
            <div>
              {errors.description.message ||
                "Description needs to be least 3 characters"}
            </div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
