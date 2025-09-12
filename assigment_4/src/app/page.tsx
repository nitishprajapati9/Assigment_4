"use client";
import { LoginFormInputs } from "@/app/types/Auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginHook } from "./services/Mutation";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "./_store/userSlice";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const loginMutation = useLoginHook();
  const router =useRouter();
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data:", data);

    loginMutation.mutate(data, {
      onSuccess: (response) => {
        dispatch(setUser(response))
        toast.success("Login Successfully")
        router.push("/dashboard")
      },
      onError: (error) => {
        toast.error("Something Went Wrong")
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome to Products.io
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: "Username is required." })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required." })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-200 shadow-md"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? <><span className="flex justify-center items-center"><LoaderIcon className="animate-spin" /></span></> : "Login"}
          </button>
        </form>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {String(loginMutation.error)}
          </p>
        )}
      </div>
    </div>
  );
}
