import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import avatarClientSvg from "../../assets/icons/icon/AvatarClient.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import statusOpenSvg from "../../assets/icons/icon/TagStatus(open).svg";
import statusOpenMobile from "../../assets/icons/icon/statusOpenMobile.svg";
import statusInProgresSvg from "../../assets/icons/icon/TagStatus(inprogress).svg";
import statusInProgressMobile from "../../assets/icons/icon/statusInProgressMobile.svg";
import statusClosedSvg from "../../assets/icons/icon/TagStatus(closed).svg";
import statusClosedMobile from "../../assets/icons/icon/statusClosedMobile.svg";
import buttonEditSvg from "../../assets/icons/icon/Button(Edit).svg";
import plusSvg from "../../assets/icons/icon/plusGraySvg.svg";
import plusWhiteSvg from "../../assets/icons/icon/plus.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";
import buttonXSvg from "../../assets/icons/icon/x.svg";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import uploadSvg from "../../assets/icons/icon/upload.svg";
import trashSvg from "../../assets/icons/icon/trashRed.svg";

export function Clients() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleClick = () => {
    setIsProfileModalOpen(false);
    setShowModal(true);
  };

  const handleClick2 = () => {
    setIsProfileModalOpen(true);
    setShowModal(false);
  };

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
                    navigate("/clients");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={callsSvg} alt="Calls" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]"> My Calls</span>
                </li>
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/clients/newcall");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={plusSvg} alt="Technicians" className="w-5 h-5" />
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
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients/newcall")}
              >
                <img
                  src={isHovered ? plusWhiteSvg : plusSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px] color-[var(--gray-400)] transition-all hover:pink group-hover:invert"
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

        <div className="h-[80%]  flex justify-center items-end ">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
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
          {/* Popup */}
          {isUserPopupOpen && (
            <div
              ref={popupRef}
              className="absolute bottom-[80px] left-[50px] w-[198px] h-[142px] bg-[var(--gray-100)] rounded-md shadow-xl border border-[var(--gray-300)] flex flex-col justify-center z-50"
            >
              <span className="text-[14px] text-[var(--gray-400)] px-4 py-2">
                Options
              </span>
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-4 py-2 text-left text-[var(--gray-600)] hover:bg-[var(--gray-200)] flex gap-2"
              >
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
          {/* Modal de Perfil */}
        </div>
      </div>

      {isProfileModalOpen && (
        <>
          {/* Overlay levemente escurecido */}
          <div className="fixed inset-0 bg-black/40 z-40"></div>

          {/* Modal central */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[440px]  max-h-[90vh] overflow-y-auto bg-[var(--gray-600)] rounded-md shadow-xl border border-[var(--gray-400)] z-50 flex flex-col p-4">
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center justify-between border-b border-[var(--gray-500)] pb-4">
                <span className="font-bold text-md">Perfil</span>
                <img
                  src={buttonXSvg}
                  alt=""
                  className="w-[18px] h-[18px] cursor-pointer"
                  onClick={() => setIsProfileModalOpen(false)}
                />
              </div>
              <div className="flex gap-3">
                <img src={avatarClientSvg} alt="" />
                <button className="flex items-center gap-1">
                  <div className="flex items-center bg-[var(--gray-500)] p-1 rounded-md gap-1">
                    <img src={uploadSvg} alt="" className="w-[12px] h-[12px]" />
                    <span className="text-xs">New Image</span>
                  </div>
                  <img
                    src={trashSvg}
                    alt=""
                    className="bg-[var(--gray-500)] p-1 rounded-md"
                  />
                </button>
              </div>
              <label htmlFor="" className="text-[var(--gray-300)] text-xs mt-3">
                NAME
              </label>
              <input
                type="text"
                placeholder="Andre Costa"
                className="border-b border-[var(--gray-500)] py-3 px-3 placeholder-[var(--gray-200)]"
              />
              <label htmlFor="" className="text-[var(--gray-300)] text-xs mt-3">
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="andre.costa@test.com"
                className="border-b border-[var(--gray-500)] py-3 px-3 placeholder-[var(--gray-200)]"
              />
              <label htmlFor="" className="text-[var(--gray-300)] text-xs mt-3">
                Password
              </label>

              <div className="relative w-full mt-4 ">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="border-b border-[var(--gray-500)] py-3 px-3 placeholder-[var(--gray-200)] w-full pr-16"
                />
                <button
                  className="absolute right-1 bottom-2 bg-[var(--gray-500)] text-[var(--gray-200)] text-xs font-bold px-2 py-2 rounded-md"
                  onClick={handleClick}
                >
                  Change
                </button>
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-10 bg-[var(--gray-200)] text-white px-4 py-2 rounded "
            >
              Save
            </button>
          </div>
        </>
      )}

      {/* Div Calls starts here: */}
      <div className=" w-full  bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-left px-4 py-4 sm:px-26">
        <h1 className="w-full max-w-screen-lg  font-bold text-[20px] sm:text-[24px] text-[var(--blue-dark)] px-4  py-6">
          Calls
        </h1>
        <div className="w-full h-screen md:max-w-screen-2xl overflow-x-auto mx-auto px-4   ">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full ">
              <thead className="border border-gray-300 ">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left">Updated on</th>
                  <th className="p-[14px] text-left hidden md:table-cell">
                    Id
                  </th>
                  <th className="p-[14px] text-left">Title and Service</th>
                  <th className="p-[14px] text-left hidden md:table-cell">
                    Total amount
                  </th>
                  <th className="p-[14px] text-left hidden md:table-cell">
                    Client
                  </th>
                  <th className="p-[14px] text-left hidden md:table-cell">
                    Technician
                  </th>
                  <th className="p-[14px] text-left">Status</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="p-[14px]">12/04/25 15:50</td>
                  <td className="p-[14px] hidden md:table-cell">00004</td>
                  <td className="p-[14px]">
                    <div className="flex flex-col">
                      <strong>Backup is not working</strong>
                      <small>Data recuparation</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">$ 200,00</td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Andre Costa</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between p-2">
                      <img
                        src={statusOpenSvg}
                        alt=""
                        className="hidden md:block "
                      />
                      <img
                        src={statusOpenMobile}
                        alt=""
                        className="block md:hidden"
                      />
                      <button>
                        <img
                          src={buttonEditSvg}
                          alt=""
                          className=""
                          onClick={() => navigate("details")}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr>
                  <td className="p-[14px]">13/04/25 20:56</td>
                  <td className="p-[14px] hidden md:table-cell">00003</td>
                  <td className="p-[14px]">
                    <div className="flex flex-col">
                      <strong>Slow net</strong>
                      <small>Net Instation</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">$ 170,00</td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Andre Costa</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between p-2">
                      <img
                        src={statusOpenSvg}
                        alt=""
                        className="hidden md:block "
                      />
                      <img
                        src={statusOpenMobile}
                        alt=""
                        className="block md:hidden"
                      />
                      <button>
                        <img
                          src={buttonEditSvg}
                          alt=""
                          onClick={() => navigate("details")}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td className="p-[14px]">12/04/25 09:56</td>
                  <td className="p-[14px] hidden md:table-cell">00004</td>
                  <td className="p-[14px]">
                    <div className="flex flex-col">
                      <strong>Pc does not turn on</strong>
                      <small>Hardware support</small>
                    </div>
                  </td>
                  <td className="p-[14px ] hidden md:table-cell">$ 200,00</td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Julia Maria</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between items-center gap-1 p-2">
                      <img
                        src={statusInProgresSvg}
                        alt=""
                        className="hidden md:block"
                      />
                      <img
                        src={statusInProgressMobile}
                        alt=""
                        className="block md:hidden "
                      />
                      <button>
                        <img
                          src={buttonEditSvg}
                          alt=""
                          onClick={() => navigate("details")}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="p-[14px]">10/04/25 10:56</td>
                  <td className="p-[14px] hidden md:table-cell">00005</td>
                  <td className="p-[14px]">
                    <div className="flex flex-col">
                      <strong>Instalation of Software</strong>
                      <small>Software support</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">$ 80,00</td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Julia Maria</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Ana Oliveira</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between p-2">
                      <img
                        src={statusClosedSvg}
                        alt=""
                        className="hidden md:block"
                      />
                      <img
                        src={statusClosedMobile}
                        alt=""
                        className="block md:hidden"
                      />
                      <button>
                        <img
                          src={buttonEditSvg}
                          alt=""
                          onClick={() => navigate("details")}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td className="p-[14px]">11/04/25 10:56</td>
                  <td className="p-[14px] hidden md:table-cell">00006</td>
                  <td className="p-[14px]">
                    <div className="flex flex-col">
                      <strong>
                        My phone does not connect with the computer
                      </strong>
                      <small>Software support</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">$ 80,00</td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex  gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Suzana Moura</small>
                    </div>
                  </td>
                  <td className="p-[14px] hidden md:table-cell">
                    <div className="flex gap-2">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Ana Oliveira</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-between p-2">
                      <img
                        src={statusClosedSvg}
                        alt=""
                        className="hidden md:block"
                      />
                      <img
                        src={statusClosedMobile}
                        alt=""
                        className="block md:hidden"
                      />
                      <button>
                        <img
                          src={buttonEditSvg}
                          alt=""
                          onClick={() => navigate("details")}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
                <div className="flex gap-2 items-center">
                  <button onClick={handleClick2}>
                    <img src={arrowSvg} alt="" className="w-[20px] h-[20px]" />
                  </button>
                  <h2 className="text-[var(--gray-200)] font-bold text-lg ">
                    Change Password
                  </h2>
                </div>
                <button onClick={() => setShowModal(false)}>
                  <img src={buttonXSvg} alt="" className="w-[24px] h-[24px]" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-[var(--gray-300)] text-sm font-semibold mb-1">
                    Current password
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-[var(--gray-500)]  py-3 focus:outline-none focus:border-[var(--gray-400)]"
                    placeholder="Type your current password"
                  />
                </div>

                <div>
                  <label className="block text-[var(--gray-300)] text-sm font-semibold mb-1">
                    New password
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-[var(--gray-500)]  py-3 focus:outline-none focus:border-[var(--gray-400)]"
                    placeholder="type your new password"
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
    </div>
  );
}
