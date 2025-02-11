"use client";

import { useState, useRef, useContext, useEffect } from "react";
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
import createPost from "@/apiCalls/createpost";
import { title } from "process";
import { useLocation } from "react-router-dom";
import updatePost from "@/apiCalls/updatePost";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(1, { message: "Required" }),
  published: z.boolean().default(true),
});

export function PostForm() {
  const [failure, setFailure] = useState(false);
  const { user, setUser } = useContext(CurrentUserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      published: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      values["authorId"] = user.id;
      console.log("form values", values);
      const response = await createPost(values);
      if (response.failure) {
        console.log(response.message);
        setFailure(true);
      } else {
        console.log("Post created");
        setFailure(false);
        window.location.href = `/posts/`;
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col "
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
                <Input onClick={(e) => e.stopPropagation()} {...field}></Input>
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
            <FormItem className="flex-1 flex flex-col">
              <FormLabel className="text-darkprimary font-bold md:text-3xl">
                Content
              </FormLabel>
              <FormControl className="flex-1">
                <Textarea
                  onClick={(e) => e.stopPropagation()}
                  className="w-full h-full min-h-[300px] font-darkprimary text-lg resize-none"
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
          name="published"
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
            "Failed to create post. Please try again."
          ) : (
            <span className="opacity-0">Placeholder</span>
          )}
        </FormMessage>
        <Button type="submit" className="w-full md:text-xl font-bold">
          Create Post
        </Button>
      </form>
    </Form>
  );
}
