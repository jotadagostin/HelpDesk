import { useNavigate } from "react-router";
import headerLogoSvg from "../assets/images/NavHeader-logo.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../services/auth";

const loginSchema = z.object({
  email: z.string().email("Insert a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LogIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data.email, data.password);

      const { token, user } = response;

      // Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // 🔥 Save the user object in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      // Redirection by role
      if (user.role === "ADMIN") navigate("/admin");
      if (user.role === "TEC") navigate("/technician");
      if (user.role === "CLIENT") navigate("/clients");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Invalid e-mail or password");
    }
  };

  return (
    <div className="w-full h-screen bg-login  bg-cover bg-center flex items-end justify-end">
      <div className="w-full md:w-[50%] h-full md:h-[98%] bg-[var(--gray-600)] rounded-tl flex flex-col items-center justify-start ">
        <div className="flex flex-col items-center pt-13 gap-3">
          <div className="mb-7">
            <img src={headerLogoSvg} alt="Helpdesk purple iconlogo" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm  border border-gray-200 flex flex-col items-start justify-start p-7 rounded"
          >
            <div className="mb-10">
              <h1 className="text-xl font-bold">Acess the portal</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)] ">
                Log in using your e-mail and password registered
              </p>
            </div>

            <div className="mb-10 flex flex-col gap-4">
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
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-[var(--gray-300)] font-bold text-[10px] not-italic "
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                placeholder="Type your password"
                className="border-0 border-b border-gray-300 py-2 px-2 w-[344px] text-[var(--gray-300)] "
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-3">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-10 not-italic font-bold text-[14px] text-[var(--gray-600)] bg-[var(--gray-200)] mt-5 rounded p-3 flex items-center justify-center hover:bg-[var(--gray-500)] hover:text-[var(--gray-100)] transition-all duration-200"
            >
              Enter
            </button>
          </form>
          <div className="w-full max-w-sm  border border-gray-200 p-7 rounded">
            <div className="mb-6">
              <h1 className="text-xl font-bold">Don't have an account yet?</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)]">
                Register right now
              </p>
            </div>
            <button
              className="w-full h-10 not-italic font-bold text-[14px] text-[var(--gray-100)] bg-[var(--gray-500)] rounded p-3 flex items-center justify-center hover:bg-[var(--gray-200)] hover:text-[var(--gray-600)] transition-all duration-200"
              onClick={() => navigate("/signin")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
