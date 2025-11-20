import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import techniciansSvg from "../../assets/icons/icon/tecnicos.svg";
import techiciansWhiteSvg from "../../assets/icons/icon/tecnicos-white.svg";
import clientsSvg from "../../assets/icons/icon/briefcase-business.svg";
import clientsWhiteSvg from "../../assets/icons/icon/briefcase-business-white.svg";
import serviceSvg from "../../assets/icons/icon/service.svg";
import servicesWhiteSvg from "../../assets/icons/icon/wrench-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { use, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import clockSvg from "../../assets/icons/icon/clock-2.svg";
import checkSvg from "../../assets/icons/icon/circle-check-big.svg";
import statusOpen from "../../assets/icons/icon/TagStatus(aberto).svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export function CallsDetails() {
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

  return (
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
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/tec");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img
                    src={techniciansSvg}
                    alt="Technicians"
                    className="w-5 h-5"
                  />
                  <span className="text-[var(--gray-400)]">Technicians</span>
                </li>
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/clients");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={clientsSvg} alt="Clients" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]">Clients</span>
                </li>
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/services");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={serviceSvg} alt="Services" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]">Services</span>
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
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/admin")}
              >
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
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={isHovered ? techiciansWhiteSvg : techniciansSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px] color-[var(--gray-400)] transition-all hover:pink group-hover:invert"
                />
                <span
                  className={`transition-all ${
                    isHovered ? "text-white" : "text-[var(--gray-400)]"
                  }`}
                >
                  Technicians
                </span>
              </a>
            </li>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients")}
              >
                <img
                  src={isHovered ? clientsWhiteSvg : clientsSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px]"
                />
                <span
                  className={`transition-all ${
                    isHovered ? "text-white" : "text-[var(--gray-400)]"
                  }`}
                >
                  Clients
                </span>
              </a>
            </li>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={isHovered ? servicesWhiteSvg : serviceSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px]"
                />
                <span
                  className={`transition-all ${
                    isHovered ? "text-white" : "text-[var(--gray-400)]"
                  }`}
                >
                  Services
                </span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="h-[70%]  flex justify-center items-end">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
            <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" />
            <div className="">
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

      {/* Div Calldetails starts here: */}
      <div className="w-full bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center px-4 sm:px-8">
        {/* Top Navigation & Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full max-w-[1200px] justify-between mt-[52px] gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <img src={arrowSvg} alt="" className="w-[14px] h-[14px]" />
              <button
                className="text-[var(--gray-300)] text-[12px]"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                return
              </button>
            </div>
            <h1 className="text-[var(--blue-dark)] text-[24px] font-bold">
              Detailed call
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 text-[var(--gray-100)] ">
            <button className="flex items-center bg-gray-300 rounded p-3 gap-2 w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto ">
              <img src={clockSvg} alt="" />
              <span className="font-bold text-[14px] text-center">
                In attendance
              </span>
            </button>
            <button className="flex items-center bg-gray-300 rounded p-3 gap-2 font-bold text-[14px] w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto ">
              <img src={checkSvg} alt="" />
              <span className="font-bold">Closed</span>
            </button>
          </div>
        </div>

        {/* Call Details and Technician Info */}
        <div className="flex flex-col lg:flex-row w-full max-w-[1200px] gap-6 justify-center items-stretch mt-6">
          {/* Call Details Card */}
          <div className="border rounded border-[var(--gray-500)] w-full lg:w-[800px] p-5">
            <div className="flex justify-between mb-5">
              <div>
                <span className="text-[var(--gray-300)] text-[12px]">0004</span>
                <h3 className="text-[var(--gray-200)] text-[16px] font-bold">
                  Backup is not working
                </h3>
              </div>
              <img src={statusOpen} alt="" />
            </div>

            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">
                Description
              </span>
              <p className="text-[var(--gray-200)] text-[14px]">
                The automatic backup system has stopped working. The last
                successful run was a week ago.
              </p>
            </div>

            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">
                Category
              </span>
              <p className="text-[var(--gray-200)] text-[14px]">Data recover</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-10 sm:gap-20 mb-5">
              <div>
                <span className="text-[var(--gray-400)] text-[12px]">
                  Created at
                </span>
                <p className="text-[var(--gray-200)] text-[14px]">
                  12/04/25 09:12
                </p>
              </div>
              <div>
                <span className="text-[var(--gray-400)] text-[12px]">
                  Updated at
                </span>
                <p className="text-[var(--gray-200)] text-[14px]">
                  12/04/25 09:12
                </p>
              </div>
            </div>

            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">Client</span>
              <div className="flex gap-2 items-center">
                <img src={avatarSvg} alt="" className="w-[20px] h-[20px]" />
                <p className="text-[var(--gray-200)] text-[14px]">
                  Andre Costa
                </p>
              </div>
            </div>
          </div>

          {/* Technician + Prices Card */}
          <div className="border rounded border-[var(--gray-500)] p-6 w-full lg:max-w-[400px]">
            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">
                Responsible technician
              </span>
              <div className="flex gap-2 items-center mt-2">
                <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" />
                <div>
                  <p className="text-[var(--gray-200)] text-[14px]">
                    Carlos Silva
                  </p>
                  <small className="text-[var(--gray-300)]">
                    carlos.silva@test.com
                  </small>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">Prices</span>
              <div className="flex justify-between">
                <p className="text-[var(--gray-200)] text-[14px]">Base price</p>
                <p className="text-[var(--gray-200)] text-[14px]">$400,00</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[var(--gray-400)] text-[12px]">
                Additional
              </span>
              <div className="flex justify-between">
                <p className="text-[var(--gray-200)] text-[14px]">
                  Backup sign up
                </p>
                <p className="text-[var(--gray-200)] text-[14px]">$120,00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[var(--gray-200)] text-[14px]">
                  PC formatting
                </p>
                <p className="text-[var(--gray-200)] text-[14px]">$70,00</p>
              </div>

              <div className="flex justify-between border-t border-[var(--gray-500)] pt-3 mt-3">
                <span className="text-[var(--gray-200)] text-[14px] font-bold">
                  Total
                </span>
                <span className="text-[var(--gray-200)] text-[14px] font-bold">
                  $395,00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Div Callsdetails ends here. */}
    </div>
  );
}
