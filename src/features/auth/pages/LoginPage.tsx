import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginForm } from "../schema";
import { useLogin } from "../hooks";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "@/lib/toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending } = useLogin();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await mutateAsync(data);

      toastSuccess(res.message || "Login successful!", {
        position: "top-right",
      });

      localStorage.setItem("token", res.token || "");
      // Redirect to home page after successful registration
      navigate("/home");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Invalid credentials";
      toastError(errorMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-center">Login to Play</h2>

          <div>
            <label className="text-sm">Username</label>
            <Input
              type="text"
              className="py-5 mt-2 mb-1"
              {...register("username")}
              placeholder="Your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Password</label>
            <Input
              type="password"
              className="py-5 mt-2 mb-1"
              {...register("password")}
              placeholder="Your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-white mt-2 text-[#121212] font-bold hover:bg-gray-300"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
