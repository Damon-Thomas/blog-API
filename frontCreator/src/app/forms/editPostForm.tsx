"use client";
import { useState, useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
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
import { CurrentUserContext } from "@/context/authContext";
import { Switch } from "@/components/ui/switch";

import { useLocation } from "react-router-dom";
import updatePost from "@/apiCalls/updatePost";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(1, { message: "Required" }),
  published: z.boolean().default(true),
});

export function PostEditorForm() {
  const [failure, setFailure] = useState(false);
  const { user, setUser } = useContext(CurrentUserContext);
  const [postInfo, setPostInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const postId = useLocation().pathname.split("/posts/").pop();

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;
      setIsLoading(true);
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
        setPostInfo(data);
      } else {
        console.log("Failed to fetch post", response);
      }
      setIsLoading(false);
    }
    fetchPost();
  }, [postId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isLoading && postInfo.post) {
      form.reset({
        title: postInfo.post.title,
        content: postInfo.post.content,
        published: postInfo.post.published,
      });
    }
  }, [postInfo, form, isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      values["authorId"] = user.id;
      console.log("form values", values, postInfo);
      const response = await updatePost(values, postInfo.post.id);
      if (response.failure) {
        console.log(response.message);
        setFailure(true);
      } else {
        console.log("Post created");
        setFailure(false);
        toast("Post updated successfully", {
          position: "bottom-right",
        });
      }
      return response;
    } catch (e) {
      console.log(e);
    }
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
            "Failed to edit post. Please try again."
          ) : (
            <span className="opacity-0">Placeholder</span>
          )}
        </FormMessage>
        <Button type="submit" className="w-full md:text-xl font-bold">
          Edit Post
        </Button>
      </form>
    </Form>
  );
}
