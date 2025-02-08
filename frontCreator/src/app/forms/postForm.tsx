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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(1, { message: "Required" }),
  published: z.boolean().default(true),
});

export function PostForm({ post }: { post: any }) {
  const [failure, setFailure] = useState(false);
  const { user, setUser } = useContext(CurrentUserContext);
  const postId = useLocation().pathname.split("/posts/").pop();
  const [postInfo, setPostInfo] = useState({});
  console.log("in FORM", postId);

  useEffect(() => {
    async function fetchPost() {
      console.log("Fetching post");
      const response = await fetch(
        import.meta.env.VITE_HOST_URL + "/posts/" + postId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPostInfo(data);
      } else {
        console.log("Failed to fetch post", response);
      }
    }
    fetchPost();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (postInfo.post) {
      form.reset({
        title: postInfo.post.title,
        content: postInfo.post.content,
        published: postInfo.post.published,
      });
    }
  }, [postInfo, form]);

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    values["authorId"] = user.id;
    console.log("form values", values);
    const response = await createPost(values);
    if (response.failure) {
      console.log(response.message);
      setFailure(true);
    } else {
      console.log("Post created");
      setFailure(false);
    }
    return response;
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
          name="published"
          render={({ field, fieldState }) => (
            <FormItem className="flex gap-4 items-center">
              <FormLabel className="text-darkprimary font-bold md:text-3xl">
                Publish
              </FormLabel>
              <FormControl>
                <Switch
                  checked={post ? post.published : true}
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
