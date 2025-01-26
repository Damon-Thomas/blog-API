"use client";

import React, { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, { message: "Required" }),
});

export function LogInForm() {
  const [failure, setFailure] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const json = await response.json();
    console.log('JSON', json);
    if (json.failure) {
      setFailure(true);
    } else {
      setFailure(false);
      localStorage.setItem("token", json.token);
      toast("Logged in", { position: "bottom-right" });
      console.log('Logged in');
      if (closeRef.current) {
        closeRef.current.click();
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormDescription className="mb-4">
          Log in to your account to access your dashboard, manage your posts, and leave comments.
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">Username</FormLabel>
              <FormControl>
                <Input onClick={(e) => e.stopPropagation()} placeholder="cool-username" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">Password</FormLabel>
              <FormControl>
                <Input onClick={(e) => e.stopPropagation()} type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormMessage id="failure-message">
          {failure ? "Invalid login. Please try again." : <span className="opacity-0">Placeholder</span>}
        </FormMessage>
        <Button onClick={(e) => e.stopPropagation()} type="submit">Log In</Button>
        <DialogPrimitive.Close asChild>
          <button ref={closeRef} style={{ display: "none" }} />
        </DialogPrimitive.Close>
      </form>
    </Form>
  );
}
