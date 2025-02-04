"use client";

import { useState, useRef, useContext } from "react";
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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { contextLogin, CurrentUserContext } from "@/context/AuthContext";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, { message: "Required" }),
});

export function LogInForm() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [failure, setFailure] = useState(false);
  const { setUser } = useContext(CurrentUserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();

    const response = await contextLogin(values, setUser);
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
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="space-y-8"
      >
        <FormDescription className="mb-4">
          Log in to your account to access your dashboard, manage your posts,
          and leave comments.
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
        <FormMessage id="failure-message">
          {failure ? (
            "Invalid login. Please try again."
          ) : (
            <span className="opacity-0">Placeholder</span>
          )}
        </FormMessage>
        <Button onClick={(e) => e.stopPropagation()} type="submit">
          Log In
        </Button>
        <DialogPrimitive.Close asChild>
          <button type="button" ref={closeRef} style={{ display: "none" }} />
        </DialogPrimitive.Close>
      </form>
    </Form>
  );
}
