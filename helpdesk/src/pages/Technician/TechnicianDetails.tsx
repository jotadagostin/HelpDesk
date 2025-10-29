import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import clockSvg from "../../assets/icons/icon/white-clock.svg";
import checkSvg from "../../assets/icons/icon/black-circle-check.svg";
import statusOpen from "../../assets/icons/icon/TagStatus(aberto).svg";
import plusSvg from "../../assets/icons/icon/plus.svg";
import redTrashSvg from "../../assets/icons/icon/trashRed.svg";
import buttonXSvg from "../../assets/icons/icon/x.svg";

export function TechnicianDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
                onClick={() => navigate("/technician")}
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
          </ul>
        </nav>

        <div className="h-[82%]  flex justify-center items-end">
          <div className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 ">
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
                  navigate("/technician");
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
            <button className="flex items-center bg-gray-300 rounded p-3 gap-2 w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto hover:bg-[var(--gray-500)]">
              <img src={checkSvg} alt="" />
              <span className="font-bold text-[14px] text-center">Closed</span>
            </button>
            <button className="flex items-center bg-[var(--gray-200)] text-[var(--gray-600)] rounded p-3 gap-2 font-bold text-[14px] w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto hover:bg-[var(--gray-300)] hover:text-white">
              <img src={clockSvg} alt="" />
              <span className="font-bold">In attendance</span>
            </button>
          </div>
        </div>

        {/* Call Details and Technician Info */}
        <div className="flex flex-col lg:flex-row w-full max-w-[1200px] gap-6 justify-center items-stretch mt-6">
          {/* Call Details Card */}
          <div className="flex flex-col">
            <div className="border rounded border-[var(--gray-500)] w-full lg:w-[800px] p-5">
              <div className="flex justify-between mb-5">
                <div>
                  <span className="text-[var(--gray-300)] text-[12px]">
                    0004
                  </span>
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
                <p className="text-[var(--gray-200)] text-[14px]">
                  Data recover
                </p>
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
                <span className="text-[var(--gray-400)] text-[12px]">
                  Client
                </span>
                <div className="flex gap-2 items-center">
                  <img src={avatarSvg} alt="" className="w-[20px] h-[20px]" />
                  <p className="text-[var(--gray-200)] text-[14px]">
                    Andre Costa
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-[var(--gray-500)] rounded-md mt-3">
              <div className="flex items-center justify-between p-6">
                <span className="text-[var(--gray-400)] text-[12px] font-bold">
                  Additional services
                </span>
                <button
                  className="bg-[var(--gray-200)] p-2 rounded-md w-[28px] h-[28px]"
                  onClick={() => setShowModal(true)}
                >
                  <img src={plusSvg} alt="" />
                </button>
              </div>
              <div className="flex items-center justify-between p-6 border-b border-b-[var(--gray-500)]">
                <h1 className="text-xs font-bold text-[var(--gray-200)]">
                  Back signture
                </h1>
                <div className="flex items-center gap-5">
                  <span>$120,00</span>
                  <img src={redTrashSvg} alt="" />
                </div>
              </div>
              <div className="flex items-center justify-between p-6 border-b border-b-[var(--gray-500)]">
                <h1 className="text-xs font-bold text-[var(--gray-200)]">
                  PC Clean up
                </h1>
                <div className="flex items-center gap-5">
                  <span>$75,00</span>
                  <img src={redTrashSvg} alt="" />
                </div>
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
        {showModal && (
          <>
            {/* Fundo escuro */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Conteúdo do modal */}
            <div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    bg-[var(--gray-600)] rounded-lg shadow-lg z-50 
                    p-6 w-[90%] max-w-md border border-[var(--gray-400)]"
            >
              <div className="flex items-center justify-between  mb-4 border-b border-b-[var(--gray-500)] pb-4">
                <h2 className="text-[var(--gray-200)] font-bold text-lg ">
                  Additional service
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <img src={buttonXSvg} alt="" className="w-[24px] h-[24px]" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-[var(--gray-300)] text-sm font-semibold mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-[var(--gray-500)]  py-3 focus:outline-none focus:border-[var(--gray-400)]"
                    placeholder="Backup is not working"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray-300)] text-sm font-semibold mb-1">
                    Valor
                  </label>
                  <input
                    type="number"
                    className="w-full border-b border-[var(--gray-500)]  py-3 focus:outline-none focus:border-[var(--gray-400)]"
                    placeholder="$120,00"
                  />
                </div>
              </div>

              {/* Botão de salvar */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-[var(--gray-100)] hover:bg-[var(--gray-200)] text-white px-4 py-2 rounded-md font-semibold transition-colors w-screen"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* Div Callsdetails ends here. */}
    </div>
  );
}
