import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import statusOpen from "../../assets/icons/icon/tecStatusOpen.svg";
import penEdit from "../../assets/icons/icon/pen-line.svg";
import circleClose from "../../assets/icons/icon/white-circle.svg";
import mobileStatusInProgress from "../../assets/icons/icon/statusInProgressMobile.svg";

export function Technician() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    // sidebar desktop:
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row ">
      {/* Topbar - apenas para mobile */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[var(--gray-100)]">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 z-50 w-[200px] h-full bg-[var(--gray-100)] shadow-lg flex flex-col">
            {/* Botão de fechar */}
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

        {/* Logo ou título */}
        <div className="w-[200px] h-[44px] flex items-center">
          <img src={adminMenuSvg} alt="" />
        </div>

        {/* Avatar Admin */}
        <div>
          <img
            src={avatarSvg}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)] flex-col">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full  justify-center items-center pt-5">
          <ul className="">
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="  w-[168px] h-[44px] flex items-center gap-3  pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={isHovered ? callsWhiteSvg : callsSvg}
                  alt="cliboard icon"
                  className="w-[20px] h-[20px]  transition-all"
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
          </ul>
        </nav>

        <div className="h-[83%]  flex justify-center items-end ">
          <div className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4">
            <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" />
            <div className="">
              <span className="text-[var(--gray-600)] text-[14px]">
                User Technician
              </span>
              <p className="text-[var(--gray-400)] text-[12px]">
                user.tec@test.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Div Calls starts here: */}
      <div className=" w-full  bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-left px-4 py-4 sm:px-26">
        <div className=" ">
          <h1 className="w-full max-w-screen-lg  font-bold text-[20px] sm:text-[24px] text-[var(--blue-dark)]  py-6 ">
            My calls
          </h1>
        </div>
        <div className=" w-full h-screen">
          <div>
            <div className="pb-5">
              <img src={statusOpen} alt="" />
            </div>
            <div className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]">
              <div className="">
                <div className="flex justify-between p-3">
                  <span className="text-[var(--gray-400)] font-bold text-[12px] flex items-center justify-center">
                    00003
                  </span>
                  <div className="flex gap-1">
                    <button className="bg-[var(--gray-500)] p-2 rounded-md">
                      <img src={penEdit} className="w-[14px] h-[14px]" alt="" />
                    </button>
                    <button className="bg-black text-[var(--gray-600)] flex items-center justify-center p-1 px-2 gap-2 rounded-md">
                      <img src={circleClose} alt="" />
                      Close
                    </button>
                  </div>
                </div>
                <div className="px-3">
                  <h1 className="text-[var(--gray-100)] font-bold text-[16px]">
                    Network slow
                  </h1>
                  <p className="text-[var(--gray-100)] text-[12px]">
                    Network instalation
                  </p>
                  <div className="flex border-b border-b-[var(--gray-500)] pb-4 justify-between px-3">
                    <span>10/04/25 15:30</span>
                    <span>$200,00</span>
                  </div>
                  <div className="flex justify-between mt-4 ">
                    <div className="flex gap-1 items-center  ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <span>Andre Costa</span>
                    </div>
                    <img src={mobileStatusInProgress} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
