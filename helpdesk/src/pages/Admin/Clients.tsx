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
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import buttonEditSvg from "../../assets/icons/icon/Button(Edit).svg";
import buttonDeleteSvg from "../../assets/icons/icon/trashButton.svg";

export function Clients() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row">
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
          <div className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4">
            <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" />
            <div className="">
              <span className="text-[var(--gray-600)] text-[14px]">
                User Admin
              </span>
              <p className="text-[var(--gray-400)] text-[12px]">
                user.adm@test.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Div Clients starts here: */}
      <div className=" w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center">
        <div className="w-[90%] flex items-center gap-3 ">
          <h1 className="w-[90%] h-[44px]  font-bold text-[24px] text-[var(--blue-dark)] px-[48px]  py-[52px] ">
            Clients
          </h1>
          <Button />
        </div>
        <div className="w-[90%]  px-[48px]  py-[52px]  flex items-center justify-center  ">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full ">
              <thead className="border border-gray-300 ">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left">Name</th>
                  <th className="p-[14px] text-left">E-mail</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <div className="flex items-center justify-end h-[50px] gap-2 pr-2">
                    <img src={buttonEditSvg} alt="" />
                    <img src={buttonDeleteSvg} alt="" />
                  </div>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <div className="flex items-center justify-end h-[50px] gap-2 pr-2">
                    <img src={buttonEditSvg} alt="" />
                    <img src={buttonDeleteSvg} alt="" />
                  </div>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <div className="flex items-center justify-end h-[50px] gap-2 pr-2">
                    <img src={buttonEditSvg} alt="" />
                    <img src={buttonDeleteSvg} alt="" />
                  </div>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <div className="flex items-center justify-end h-[50px] gap-2 pr-2">
                    <img src={buttonEditSvg} alt="" />
                    <img src={buttonDeleteSvg} alt="" />
                  </div>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <div className="flex items-center justify-end h-[50px] gap-2 pr-2">
                    <img src={buttonEditSvg} alt="" />
                    <img src={buttonDeleteSvg} alt="" />
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
