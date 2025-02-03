// "use client";

import { loggedInVerifier } from "@/userControls";
import { useEffect, useState } from "react";

// import React, { useState, useRef, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// // dotenv.config();
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import * as DialogPrimitive from "@radix-ui/react-dialog";
// import { useAuth } from "@/context/AuthContext";
// import { loggedInVerifier } from "@/userControls";

// const formSchema = z.object({
//   comment: z.string().min(2, {
//     message: "Comment must be at least 1 character.",
//   }),
// });

// export function LogInForm() {
//   const [failure, setFailure] = useState(false);
//   const closeRef = useRef<HTMLButtonElement>(null);
//   const { setLoggedIn } = useAuth();
//   const id = useParams();

//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

//   useEffect(() => {
//     async function checkLoggedIn() {
//       try {
//         const user = await loggedInVerifier();
//         setLoggedIn(!!user);
//       } catch (error) {
//         //user not verified
//         setLoggedIn(false);
//       }
//     }
//     checkLoggedIn();
//   }, []);

//   if (loggedIn === null) {
//     return <div>Loading...</div>; // or a loading spinner
//   }

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       comment: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     const response = await fetch(
//       `${import.meta.env.VITE_HOST_URL}/comments/${id}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       }
//     );

//     const json = await response.json();
//     console.log("JSON", json);
//     if (json.failure) {
//       setFailure(true);
//     } else {
//       setFailure(false);
//       localStorage.setItem("token", json.token);
//       localStorage.setItem(
//         "modernMurmurUsername",
//         JSON.stringify(json.user.username)
//       );
//       toast(`Logged in as user: ${json.user.username}`, {
//         position: "bottom-right",
//       });
//       setLoggedIn(true);
//       console.log("Logged in");

//       if (closeRef.current) {
//         console.log("clicking closeRef");
//         closeRef.current.click();
//       }
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         onKeyDown={(e) => {
//           e.stopPropagation();
//         }}
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         className="space-y-8"
//       >
//         <FormDescription className="mb-4">
//           Log in to your account to access your dashboard, manage your posts,
//           and leave comments.
//         </FormDescription>
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field, fieldState }) => (
//             <FormItem>
//               <FormLabel className="text-darkprimary">Username</FormLabel>
//               <FormControl>
//                 <Input
//                   onClick={(e) => e.stopPropagation()}
//                   placeholder="cool-username"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage>{fieldState.error?.message}</FormMessage>
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field, fieldState }) => (
//             <FormItem>
//               <FormLabel className="text-darkprimary">Password</FormLabel>
//               <FormControl>
//                 <Input
//                   onClick={(e) => e.stopPropagation()}
//                   type="password"
//                   placeholder="password"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage>{fieldState.error?.message}</FormMessage>
//             </FormItem>
//           )}
//         />
//         <FormMessage id="failure-message">
//           {failure ? (
//             "Invalid login. Please try again."
//           ) : (
//             <span className="opacity-0">Placeholder</span>
//           )}
//         </FormMessage>
//         <Button onClick={(e) => e.stopPropagation()} type="submit">
//           Log In
//         </Button>
//         <DialogPrimitive.Close asChild>
//           <button type="button" ref={closeRef} style={{ display: "none" }} />
//         </DialogPrimitive.Close>
//       </form>
//     </Form>
//   );
// }

export default function CommentForm() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const userInfo = await loggedInVerifier();
      setUser(userInfo);
    }
    getUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user.username}</h1>
          <h1>Comment Form</h1>
          <form>
            <label htmlFor="comment">Comment</label>
            <textarea name="comment" id="comment" />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Log in to leave a comment</h1>
        </div>
      )}
    </div>
  );
}
