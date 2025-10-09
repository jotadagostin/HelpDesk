import { useNavigate } from "react-router";
import headerLogoSvg from "../assets/images/NavHeader-logo.svg";

export function SignIn() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-login  bg-cover bg-center flex items-end justify-end">
      <div className="w-[50%] h-[98%] bg-[var(--gray-600)] rounded-tl flex flex-col items-center justify-start ">
        <div className="flex flex-col items-center pt-13 gap-3">
          <div className="mb-7">
            <img src={headerLogoSvg} alt="Helpdesk purple iconlogo" />
          </div>
          <form className="w-[400px] h-[460px] border border-gray-200 flex flex-col items-start justify-start p-7 rounded">
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
              />
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
              />
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
              />
            </div>

            <button
              type="submit"
              className="w-[344px] h-[40px] not-italic font-bold text-[14px] text-[var(--gray-600)] bg-[var(--gray-200)] rounded p-3 flex items-center justify-center hover:bg-[var(--gray-500)] hover:text-[var(--gray-100)] transition-all duration-200"
            >
              Register
            </button>
          </form>
          <div className="w-[400px] h-[161px] border border-gray-200 p-7 rounded">
            <div className="mb-6">
              <h1 className="text-xl font-bold">Already have an account?</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)]">
                Enter right now
              </p>
            </div>
            <button
              className="w-[344px] h-[40px] not-italic font-bold text-[14px] text-[var(--gray-100)] bg-[var(--gray-500)] rounded p-3 flex items-center justify-center hover:bg-[var(--gray-200)] hover:text-[var(--gray-600)] transition-all duration-200"
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
