"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { makePost } from "@/actions/post/makePost";
import { useState } from "react";

const makePostSchema = z.object({
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(255),
}) satisfies z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput>;

export default function MakePost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof makePostSchema>>({
    resolver: zodResolver(makePostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });
  async function onSubmit(formData: z.infer<typeof makePostSchema>) {
    setIsSubmitting(true);
    const result = await makePost(formData);
    form.reset();
    if (!result.success) {
      console.error(result.error);
    }
    setIsSubmitting(false);
  }

  return (
    <Card>
      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your title" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Make a post!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Create post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
