import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { signupSchema, SignupFormValues } from "../schemas/signup.schema";
import { signUp } from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "../components/PasswordInput";
import { PasswordStrength } from "../components/PasswordStrength";
import { Spinner } from "@/components/ui/spinner";

export function SignupPage() {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const watchedPassword = watch("password", "");

  useEffect(() => {
    setPassword(watchedPassword || "");
  }, [watchedPassword]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e8e8e8]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg font-semibold text-center text-muted-foreground">
            YOUVERIFY INVOICE
          </CardTitle>
          <CardTitle className="text-2xl font-bold">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  {...register("firstName")}
                  placeholder="First name"
                  className="w-full"
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  {...register("lastName")}
                  placeholder="Last name"
                  className="w-full"
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <PasswordInput
                {...register("password")}
                placeholder="Enter password"
                className="w-full"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              {password && <PasswordStrength password={password} />}
            </div>

            <div className="space-y-2">
              <PasswordInput
                {...register("confirmPassword")}
                placeholder="Confirm password"
                className="w-full"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cichild-blue/90 hover:bg-cichild-blue text-white font-semibold uppercase"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating account...
                </>
              ) : (
                "Sign up"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-cichild-blue underline font-medium hover:text-cichild-blue/80"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
