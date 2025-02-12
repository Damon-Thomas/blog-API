"use client";

import React, { useState, useRef, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// dotenv.config();
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
import { contextSignup, CurrentUserContext } from "@/context/authContext";

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(20, {
        message: "Username must be less than 20 characters.",
      }),
    password: z.string().min(1, { message: "Required" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // path of error
  });

export function SignUpForm() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [failure, setFailure] = useState(false);
  const { setUser } = useContext(CurrentUserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    const response = await contextSignup(values, setUser);
    if (response.failure) {
      console.log("failure");
      setFailure(true);
      return;
    }
    console.log("res", response);
    if (closeRef.current) {
      console.log("clicking closeRef");
      closeRef.current.click();
    }
    return response;
  }

  return (
    <Form {...form}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormDescription className="mb-1">
          Sign up for an account to comment, make blog posts, and participate in
          our community.
        </FormDescription>
        <FormDescription className="!mb-4 !mt-0 font-bold">
          To test the app without creating an account, go to login and use the
          username "testUser" and the password "123".
        </FormDescription>
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">Username</FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  placeholder="cool-username"
                  {...field}
                />
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
                <Input
                  onClick={(e) => e.stopPropagation()}
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  onClick={(e) => e.stopPropagation()}
                  type="password"
                  placeholder="password"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormMessage onClick={(e) => e.stopPropagation()} id="failure-message">
          {failure ? (
            "Username already exists. Please try another."
          ) : (
            <span className="opacity-0">Placeholder</span>
          )}
        </FormMessage>

        <Button onClick={(e) => e.stopPropagation()} type="submit">
          Submit
        </Button>
        <DialogPrimitive.Close asChild>
          <button ref={closeRef} style={{ display: "none" }} />
        </DialogPrimitive.Close>
      </form>
    </Form>
  );
}
