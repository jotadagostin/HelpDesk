import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import plusSvg from "../../assets/icons/icon/plusGraySvg.svg";
import plusWhiteSvg from "../../assets/icons/icon/plus.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export function ClientsNewCall() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsUserPopupOpen(false);
      }
    };

    if (isUserPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserPopupOpen]);

  const getInitials = (fullName: string) => {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row">
      {/* ========== MOBILE HEADER ========== */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[var(--gray-100)]">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 z-50 w-[200px] h-full bg-[var(--gray-100)] shadow-lg flex flex-col">
            {/* Botão fechar */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[var(--gray-600)] hover:text-[var(--blue-dark)]"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-2">
              <ul className="flex flex-col gap-2">
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/admin");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={callsSvg} alt="Calls" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]">Calls</span>
                </li>
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/clients/newcall");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={plusSvg} alt="Create Call" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]">Create Call</span>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Botão burger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[var(--gray-200)]"
        >
          <svg
            className="w-6 h-6 text-[var(--gray-600)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="w-[200px] h-[44px] flex items-center">
          <img src={adminMenuSvg} alt="Logo" />
        </div>

        {/* Avatar */}
        <div>
          <img
            src={avatarSvg}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* ========== DESKTOP SIDEBAR ========== */}
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)] flex-col">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full justify-center items-center pt-5">
          <ul>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients")}
              >
                <img
                  src={isHovered ? callsWhiteSvg : callsSvg}
                  alt="Calls icon"
                  className="w-[20px] h-[20px] transition-all"
                />
                <span
                  className={`transition-all ${
                    isHovered ? "text-white" : "text-[var(--gray-400)]"
                  }`}
                >
                  Calls
                </span>
              </a>
            </li>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients/newcall")}
              >
                <img
                  src={isHovered ? plusWhiteSvg : plusSvg}
                  alt="Create call icon"
                  className="w-[20px] h-[20px] transition-all"
                />
                <span
                  className={`transition-all ${
                    isHovered ? "text-white" : "text-[var(--gray-400)]"
                  }`}
                >
                  Create call
                </span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Footer Avatar */}
        <div className="h-[80%] flex justify-center items-end">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
            <div className="w-[32px] h-[32px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white">
              {getInitials(user.name)}
            </div>

            <div>
              <span className="text-[var(--gray-600)] text-[14px]">
                {user.name}
              </span>
              <p className="text-[var(--gray-400)] text-[12px]">{user.email}</p>
            </div>
          </div>
          {/* Popup */}
          {isUserPopupOpen && (
            <div
              ref={popupRef}
              className="absolute bottom-[80px] left-[50px] w-[198px] h-[142px] bg-[var(--gray-100)] rounded-md shadow-xl border border-[var(--gray-300)] flex flex-col justify-center z-50"
            >
              <span className="text-[14px] text-[var(--gray-400)] px-4 py-2">
                Options
              </span>
              <button className="px-4 py-2 text-left text-[var(--gray-600)] hover:bg-[var(--gray-200)] flex gap-2">
                <img src={userWhite} alt="" />
                Perfil
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");

                  navigate("/");
                }}
                className="px-4 py-2 text-left text-[var(--feedback-danger)] hover:bg-[var(--gray-200)] flex gap-2"
              >
                <img src={exitRed} alt="" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="w-full bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-start min-h-screen px-16 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-[1200px] mb-10">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <img src={arrowSvg} alt="Back" className="w-[14px] h-[14px]" />
              <button
                className="text-[var(--gray-300)] text-[12px]"
                onClick={() => navigate("/clients")}
              >
                return
              </button>
            </div>
            <h1 className="text-[var(--blue-dark)] text-[24px] font-bold">
              New Call
            </h1>
          </div>
        </div>

        {/* Information + Summary */}
        <div className="flex flex-col md:flex-row items-start gap-8 w-full max-w-[1200px]">
          {/* Information */}
          <div className="border border-[var(--gray-500)] rounded-lg w-full md:w-[65%] bg-[var(--gray-700)]">
            <form className="w-full flex flex-col items-start p-7 rounded-lg bg-[var(--gray-800)]">
              <div className="mb-10">
                <h1 className="text-xl font-bold text-[var(--gray-200)]">
                  Informations
                </h1>
                <p className="font-normal text-[12px] text-[var(--gray-300)]">
                  Set the days and times you are available to answer calls.
                </p>
              </div>

              <div className="mb-10 flex flex-col gap-4 w-full">
                <label
                  htmlFor="title"
                  className="text-[var(--gray-300)] font-bold text-[10px]"
                >
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Backup is not working"
                  className="border-0 border-b border-gray-300 text-[var(--gray-300)] py-1 w-full bg-transparent focus:outline-none"
                />

                <label
                  htmlFor="description"
                  className="text-[var(--gray-300)] font-bold text-[10px]"
                >
                  DESCRIPTION
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="The automatic backup system has stopped working. The last successful backup was a week ago."
                  className="border-0 border-b border-gray-300 text-[var(--gray-300)] py-1 px-2 w-full resize-none bg-transparent focus:outline-none"
                ></textarea>

                <label
                  htmlFor="categoria"
                  className="text-[var(--gray-300)] font-bold text-[10px]"
                >
                  SERVICE CATEGORY
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="border-0 border-b border-gray-300 text-[var(--gray-300)] py-1 w-full bg-transparent focus:outline-none"
                >
                  <option value="">Select a category</option>
                  <option value="data-recover">Data Recover</option>
                  <option value="backup">Backup</option>
                  <option value="internet">Internet</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div className="border border-[var(--gray-500)] rounded-lg flex flex-col items-center justify-start pt-5 pb-10 w-full md:w-[30%] bg-[var(--gray-700)]">
            <div className="mb-10 w-[72%]">
              <h1 className="text-xl font-bold text-[var(--gray-200)]">
                Summary
              </h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)]">
                Values and details
              </p>
            </div>

            <div className="w-[72%]">
              <div className="mb-5">
                <h3 className="text-[var(--gray-400)] text-[12px] font-bold">
                  Category of service
                </h3>
                <div className="flex gap-1">
                  <span className="text-sm text-[var(--gray-200)] font-normal">
                    Network error
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <h3 className="text-[var(--gray-400)] text-[12px] font-bold">
                  Initial value
                </h3>
                <div className="flex gap-1 text-[var(--gray-200)] items-center font-bold">
                  $
                  <span className="text-[25px] text-[var(--gray-200)] font-bold">
                    300,00
                  </span>
                </div>
              </div>

              <div className="flex gap-1 mb-5">
                <p className="text-xs text-[var(--gray-300)]">
                  The call will be automatically assigned to an available
                  technician.
                </p>
              </div>

              <button className="bg-[var(--gray-200)] text-[14px] text-[var(--gray-600)] px-4 py-4 rounded font-bold hover:opacity-90 transition w-full">
                Create call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
