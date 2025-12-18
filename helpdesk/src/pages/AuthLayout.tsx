import type React from "react";
import headerLogoSvg from "../assets/images/NavHeader-logo.svg";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="w-full min-h-dvh bg-login bg-cover bg-center flex items-center md:items-end justify-center md:justify-end">
      <div className="w-full md:w-[50%] min-h-dvh md:min-h-[98%] bg-[var(--gray-600)] rounded-tl overflow-y-auto">
        <div className="flex flex-col items-center pt-3 gap-3">
          <div className="mb-7">
            <img src={headerLogoSvg} alt="Helpdesk purple iconlogo" />
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
