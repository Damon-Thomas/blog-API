"use client";

import { useState, useRef, useContext } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { contextLogin, CurrentUserContext } from "@/context/authContext";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(1, { message: "Required" }),
  publish: z.boolean().default(true),
});

export function PostForm() {
  const [failure, setFailure] = useState(false);
  const { setUser } = useContext(CurrentUserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    console.log("values", values);
    // const response = await contextLogin(values, setUser);
    // if (response.failure) {
    //   console.log("failure");
    //   setFailure(true);
    //   return;
    // }
    // console.log("res", response);

    // return response;
    return;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col min-w-56 md:min-w-96 lg:min-w-128 xl:min-w-160"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary font-bold md:text-3xl">
                Title
              </FormLabel>
              <FormControl>
                <Input onClick={(e) => e.stopPropagation()} {...field} />
              </FormControl>
              <FormMessage className="m-0">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-darkprimary font-bold md:text-3xl">
                Content
              </FormLabel>
              <FormControl>
                <Textarea
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-1/2 font-darkprimary text-lg"
                  rows={7}
                  white-space="pre-wrap"
                  {...field}
                />
              </FormControl>
              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publish"
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-4 items-center">
              <FormLabel className="text-darkprimary font-bold md:text-3xl">
                Publish
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  id="publishSwitch"
                  onCheckedChange={field.onChange}
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
        <Button
          onClick={(e) => e.stopPropagation()}
          type="submit"
          className="w-full md:text-xl font-bold"
        >
          Create Post
        </Button>
      </form>
    </Form>
  );
}
