"use client";

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

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
      path: ["username"],
    }),
    password: z.string().min(1, { message: "Required", path: ["password"] }),
    confirmpassword: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords must match",
    path: ["confirmpassword"], // path of error
  });

export function SignUpForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const uniqueId = `form-item-${Math.random().toString(36).substr(2, 9)}`;
  const uniqueId2 = `form-item-${Math.random().toString(36).substr(2, 9)}`;
  const uniqueId3 = `form-item-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormDescription className="mb-4">
          Sign up for an account to comment, make blog posts, and participate in
          our community.
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">Username</FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  id={uniqueId}
                  placeholder="cool-username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">Password</FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  id={uniqueId2}
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  id={uniqueId3}
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
