"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { PasswordInput } from "../ui/PasswordInput ";
import ContentLoader from "../ContentLoader";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("adqwqeqwe");
  const [otp, setOtp] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              // <FormField
              //   control={form.control}
              //   name="code"
              //   render={({ field }) => (
              //     <FormItem>
              //       <FormLabel className=" mb-4">Two Factor Code</FormLabel>
              //       <FormControl>
              //         <>
              //           <Input
              //             {...field}
              //             disabled={isPending}
              //             value={otp}
              //             placeholder="123456"
              //             className="hidden"
              //           />
              //           <div className="w-full h-full items-center flex justify-center  ">
              //             <OtpInput
              //               value={otp}
              //               onChange={setOtp}
              //               numInputs={6}
              //               renderSeparator={<span>-</span>}
              //               renderInput={(props) => (
              //                 <div className=" mx-1 ">
              //                   <Input {...props} className="w-10 otpinput" />
              //                 </div>
              //               )}
              //             />
              //           </div>
              //         </>
              //       </FormControl>
              //       <FormMessage />
              //     </FormItem>
              //   )}
              // />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" mb-4">Two Factor Code</FormLabel>
                    <FormControl>
                      <>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="123456"
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          placeholder="••••••••"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <Link href="/reset">Forgot password?</Link>
                </Button>
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full gap-2">
            {isPending && <ContentLoader size={4} dark />}
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
          {/* <div className="flex items-center mt-4 mb-4">
            <div className="border-t border flex-grow"></div>
            <div className="mx-4 text-muted-foreground">OR</div>
            <div className="border-t border flex-grow"></div>
          </div> */}
        </form>
      </Form>
    </CardWrapper>
  );
};
