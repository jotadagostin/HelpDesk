import headerLogoSvg from "../assets/images/NavHeader-logo.svg";

export function Login() {
  return (
    <div className="w-full h-screen bg-login  bg-cover bg-center flex items-end justify-end">
      <div className="w-[50%] h-[98%] bg-[var(--gray-600)] rounded-tl flex flex-col items-center justify-start ">
        <div className="flex flex-col items-center pt-13 gap-3">
          <div className="mb-7">
            <img src={headerLogoSvg} alt="Helpdesk purple iconlogo" />
          </div>
          <form className="w-[400px] h-[347px] border border-gray-200 flex flex-col items-left justify-start p-7 rounded">
            <h1 className="text-xl font-bold">Acess the portal</h1>
            <p className="font-normal text-[12px] text-[var(--gray-300)] ">
              Log in using your e-mail and password registered
            </p>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" />

            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" />

            <button type="submit">Enter</button>
          </form>
          <div className="w-[400px] h-[161px] border border-gray-200 p-7 rounded">
            <h1 className="text-xl font-bold">Don't have an account yet?</h1>
            <p className="font-normal text-[12px] text-[var(--gray-300)]">
              Register right now
            </p>
            <button>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
