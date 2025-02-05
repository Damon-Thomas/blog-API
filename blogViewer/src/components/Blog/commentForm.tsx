// "use client";

import { CurrentUserContext } from "@/context/AuthContext";
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
import { useParams } from "react-router-dom";
import postComment from "../apiCalls/postComment";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Comment must be at least 1 character.",
  }),
});

export default function CommentForm() {
  const [failure, setFailure] = useState(false);
  const { user } = useContext(CurrentUserContext);
  const postId = useParams<{ id: string }>().id || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    const response = await postComment(values, postId);
    if (response.failure) {
      console.log("failure");
      setFailure(true);
      return;
    }
    window.location.reload();
  }

  return (
    <div className="commentFormContainer">
      {user ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col"
          >
            {/* <FormDescription className="mb-4">
              Leave a comment below!
            </FormDescription> */}
            <div className="formContainer flex flex-col">
              <div className="labelAndError">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full px-2 md:px-8 pt-2 md:pt-4">
                      <div className="labelANDError flex justify-between flex-wrap align-top">
                        <FormLabel className="text-darkprimary flex align-middle">
                          Leave Comment:
                        </FormLabel>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </div>

                      <FormControl>
                        <Textarea
                          onClick={(e) => e.stopPropagation()}
                          placeholder="I love this post!"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage id="failure-message" className="!m-0">
                {failure ? (
                  "Comment wasn't posted. Please try again."
                ) : (
                  <span className="opacity-0">Placeholder</span>
                )}
              </FormMessage>
              <Button
                onClick={(e) => e.stopPropagation()}
                type="submit"
                className="mx-2 md:mx-8 mt:0"
              >
                Leave Comment
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p>Log in to leave a comment!</p>
      )}
    </div>
  );
}
