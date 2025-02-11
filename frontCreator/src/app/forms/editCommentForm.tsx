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
import updateComment from "@/apiCalls/updateComment";
import { toast } from "sonner";

const formSchema = z.object({
  content: z.string().min(1, { message: "Required" }),
});

export function EditCommentForm() {
  const [failure, setFailure] = useState(false);
  const { user, setUser } = useContext(CurrentUserContext);
  const [commentInfo, setCommentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const commentId = useLocation().pathname.split("/comments/").pop();

  useEffect(() => {
    async function fetchComment() {
      if (!commentId) return;
      setIsLoading(true);
      const response = await fetch(
        import.meta.env.VITE_HOST_URL + "/comments/" + commentId,
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
        setCommentInfo(data);
      } else {
        console.log("Failed to fetch comment", response);
      }
      setIsLoading(false);
    }
    fetchComment();
    console.log("commentInfo", commentInfo);
  }, [commentId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!isLoading && commentInfo) {
      form.reset({
        content: commentInfo.content,
      });
    }
  }, [commentInfo, form, isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    try {
      values["authorId"] = user.id;
      console.log("form values", values, commentInfo);
      const response = await updateComment(values, commentInfo.id);
      if (response.failure) {
        console.log(response.message);
        setFailure(true);
      } else {
        console.log("Comment created");
        setFailure(false);
        toast("comment updated successfully", {
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
        <FormMessage id="failure-message">
          {failure ? (
            "Failed to edit comment. Please try again."
          ) : (
            <span className="opacity-0">Placeholder</span>
          )}
        </FormMessage>
        <Button type="submit" className="w-full md:text-xl font-bold">
          Edit Comment
        </Button>
      </form>
    </Form>
  );
}
