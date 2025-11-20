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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export function TecProfile() {
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
    //sidebar desktop:
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row">
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
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)]    flex-col">
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
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/services")}
              >
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

        <div className="h-[70%]  flex justify-center items-end ">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
            <div className="w-[32px] h-[32px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white">
              {getInitials(user.name)}
            </div>
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
              className="absolute bottom-[80px] left-[50px] w-[198px] h-[142px] bg-[var(--gray-100)] rounded-md shadow-xl border border-[var(--gray-300)] flex flex-col justify-center z-50 cursor-pointer"
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

      <div className="w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center min-h-screen md:min-h-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full max-w-[1200px] justify-between mt-[52px] gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <img src={arrowSvg} alt="" className="w-[14px] h-[14px]" />
              <button
                className="text-[var(--gray-300)] text-[12px]"
                onClick={() => {
                  navigate("/admin/tec");
                }}
              >
                return
              </button>
            </div>
            <h1 className="text-[var(--blue-dark)] text-[24px] font-bold">
              Technician profile
            </h1>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-2 text-[var(--gray-100)] ">
            <button className="flex items-center bg-gray-300 rounded p-3 gap-2 w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto ">
              <span className="font-bold text-[14px] text-center px-3">
                Cancel
              </span>
            </button>
            <button
              className="flex items-center bg-[var(--gray-200)] text-[var(--gray-600)] rounded p-3 gap-2 font-bold text-[14px] w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto "
              onClick={() => navigate("/admin/tecprofileedit")}
            >
              <span className="font-bold px-3 ">Save</span>
            </button>
          </div>
        </div>

        <div className="flex  justify-center gap-10 items-start mt-10 w-[100%] ">
          <div className="border border-[var(--gray-600)] rounded ">
            <div className="">
              <form className="w-full max-w-sm border border-gray-200 flex flex-col items-start justify-start p-7 rounded">
                <div className="mb-10">
                  <h1 className="text-xl font-bold">Personal data</h1>
                  <p className="font-normal text-[12px] text-[var(--gray-300)] ">
                    Set technician profile information
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
                    placeholder="Set the acess password"
                    className="border-0 border-b border-gray-300 py-1 px-2 w-[344px] text-[var(--gray-300)]"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="border border-[var(--gray-500)] rounded flex flex-col items-start justify-start pt-5 pl-10 pb-10 w-[45%] ">
            <div className="mb-10">
              <h1 className="text-xl font-bold">Opening hours</h1>
              <p className="font-normal text-[12px] text-[var(--gray-300)] ">
                Select the technician's availability hours for service
              </p>
            </div>
            <div>
              <div className="mb-5">
                <h3 className="text-[var(--gray-300)] text-[10px]">MORNING</h3>
                <div className="flex gap-1">
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    7:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    8:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    9:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    10:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    11:00
                  </span>
                </div>
              </div>
              <div className="mb-5">
                <h3 className="text-[var(--gray-300)] text-[10px]">
                  AFTERNOON
                </h3>
                <div className="flex gap-1">
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    7:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    8:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    9:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    10:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    11:00
                  </span>
                </div>
              </div>
              <div className="">
                <h3 className="text-[var(--gray-300)] text-[10px]">EVENING</h3>
                <div className="flex gap-1">
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    7:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    8:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    9:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    10:00
                  </span>
                  <span className="border rounded-2xl px-2 py-1 border-[var(--gray-400)]">
                    11:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
