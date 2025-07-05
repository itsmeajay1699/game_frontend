// features/auth/pages/RegisterPage.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "../hooks";
import { registerSchema, type RegisterForm } from "../schema";
import AuthLayout from "../layout/AuthLayout";
import { toastError, toastSuccess } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync, isPending } = useRegister();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await mutateAsync(data);

      toastSuccess(res.message || "Registration successful!", {
        position: "top-right",
      });
      localStorage.setItem("token", res.token || "");
      // Redirect to home page after successful registration
      navigate("/");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Something went wrong";
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
          <h2 className="text-3xl font-bold text-center">
            Create Your Account
          </h2>

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
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
