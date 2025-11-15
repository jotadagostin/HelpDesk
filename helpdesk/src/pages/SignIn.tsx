import { useNavigate } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import headerLogoSvg from "../assets/images/NavHeader-logo.svg";
import axios from "axios";

const signInSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Insert a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignInData = z.infer<typeof signInSchema>;

export function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Redirecionamento baseado na role
      if (user.role === "ADMIN") navigate("/admin");
      if (user.role === "TEC") navigate("/technician");
      if (user.role === "CLIENT") navigate("/clients");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-login  bg-cover bg-center flex items-end justify-end">
      <div className="w-full md:w-[50%]  h-full md:h-[98%] bg-[var(--gray-600)] rounded-tl flex flex-col items-center justify-start ">
        <div className="flex flex-col items-center pt-13 gap-3">
          <div className="mb-7">
            <img src={headerLogoSvg} alt="Helpdesk purple iconlogo" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm border border-gray-200 flex flex-col items-start justify-start p-7 rounded"
          >
            <div className="mb-10">
              <h1 className="text-xl font-bold">Create your account</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)] ">
                Inform your name, e-mail and password to create your account
              </p>
            </div>

            <div className="mb-10 flex flex-col gap-4">
              <label
                htmlFor="name"
                className="text-[var(--gray-300)] font-bold text-[10px] not-italic"
              >
                NAME
              </label>
              <input
                id="name"
                type="name"
                placeholder="Type your full name"
                className="border-0 border-b border-gray-300  text-[var(--gray-300)] py-1 px-2 w-[344px]"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
              <label
                htmlFor="email"
                className="text-[var(--gray-300)] font-bold text-[10px] not-italic"
              >
                E-MAIL
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="border-0 border-b border-gray-300  text-[var(--gray-300)] py-1 px-2 w-[344px]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
              <label
                htmlFor="password"
                className="text-[var(--gray-300)] font-bold text-[10px] not-italic"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                placeholder="Type your password"
                className="border-0 border-b border-gray-300 py-1 px-2 w-[344px] text-[var(--gray-300)]"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-10 not-italic font-bold text-[14px] text-[var(--gray-600)] bg-[var(--gray-200)] rounded p-3 flex items-center justify-center hover:bg-[var(--gray-500)] hover:text-[var(--gray-100)] transition-all duration-200"
            >
              Register
            </button>
          </form>
          <div className="w-full max-w-sm  border border-gray-200 p-7 rounded">
            <div className="mb-6">
              <h1 className="text-xl font-bold">Already have an account?</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)]">
                Enter right now
              </p>
            </div>
            <button
              className="w-full h-10 not-italic font-bold text-[14px] text-[var(--gray-100)] bg-[var(--gray-500)] rounded p-3 flex items-center justify-center hover:bg-[var(--gray-200)] hover:text-[var(--gray-600)] transition-all duration-200"
              onClick={() => navigate("/")}
            >
              Access account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
