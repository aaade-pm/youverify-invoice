import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { loginSchema, LoginFormValues } from "../schemas/login.schema";
import { signIn } from "../api/auth.api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "../components/PasswordInput";
import { Spinner } from "@/components/ui/spinner";

export function LoginPage() {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-ghost-blue">
      <Card className="w-full max-w-md bg-white py-8 px-4">
        <CardHeader className="space-y-4 text-center">
          <CardTitle className="text-2xl font-bold">
            YOUVERIFY INVOICE
          </CardTitle>
          <CardTitle className="text-lg font-semibold">
            Sign in to your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cichild-blue/90 hover:bg-cichild-blue text-white font-semibold uppercase"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">No account? </span>
              <Link
                to="/signup"
                className="text-cichild-blue underline font-medium hover:text-cichild-blue/80"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
