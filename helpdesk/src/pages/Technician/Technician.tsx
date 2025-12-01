import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import statusInProgress from "../../assets/icons/icon/TagStatus(inprogress).svg";
import statusOpen from "../../assets/icons/icon/TagStatus(aberto).svg";
import penEdit from "../../assets/icons/icon/pen-line.svg";
import circleClose from "../../assets/icons/icon/white-circle.svg";
import mobileStatusInProgress from "../../assets/icons/icon/statusInProgressMobile.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";
import buttonXSvg from "../../assets/icons/icon/x.svg";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import tecProfileAvatar from "../../assets/icons/icon/tecProfileAvatar.svg";
import uploadSvg from "../../assets/icons/icon/upload.svg";
import trashSvg from "../../assets/icons/icon/trashRed.svg";

export function Technician() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [calls, setCalls] = useState<any[]>([]);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch calls from backend
  const fetchCalls = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/calls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Filter out closed calls
      setCalls(data.filter((call: any) => call.status !== "closed"));
    } catch (err) {
      console.error("Error fetching calls:", err);
    }
  };

  // Load calls on mount
  useEffect(() => {
    fetchCalls();
  }, []);

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

  const getInitials = (fullName: string) => {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    // sidebar desktop:
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row ">
      {/* Topbar -just for mobile */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[var(--gray-100)]">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 z-50 w-[200px] h-full bg-[var(--gray-100)] shadow-lg flex flex-col">
            {/* Closing button */}
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
        <div
          className="cursor-pointer"
          onClick={() => setIsProfileModalOpen(true)}
        >
          <button>
            <div className="w-8 h-8 rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white">
              {getInitials(user.name)}
            </div>
          </button>
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
                <img src={tecProfileAvatar} alt="" />
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
                placeholder="Carlos Silva"
                className="border-b border-[var(--gray-500)] py-3 px-3 placeholder-[var(--gray-200)]"
              />
              <label htmlFor="" className="text-[var(--gray-300)] text-xs mt-3">
                E-MAIL
              </label>
              <input
                type="email"
                placeholder="carlos.silva@test.com"
                className="border-b border-[var(--gray-500)] py-3 px-3 placeholder-[var(--gray-200)]"
              />
              <label htmlFor="" className="text-[var(--gray-300)] text-xs mt-3">
                Password
              </label>

              <div className="relative w-full mt-4">
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

              <div>
                <div className="flex flex-col gap-1 mt-3">
                  <h2 className="text-sm text-[var(--gray-200)] font-bold">
                    Availability
                  </h2>
                  <p className="text-xs text-[var(--gray-300)]">
                    Business hours defined by the admin.
                  </p>
                </div>
                <div className="mt-4 flex gap-2 mb-4 border-b border-[var(--gray-500)] pb-4">
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    09:00
                  </span>
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    10:00
                  </span>
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    12:00
                  </span>
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    13:00
                  </span>
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    14:00
                  </span>
                  <span className="text-xs text-[var(--gray-400)] border rounded-2xl py-1 px-2">
                    15:00
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="mt-2 bg-[var(--gray-200)] text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </>
      )}

      {/* Div Calls starts here: */}
      <div
        className=" w-full  bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-left px-4 py-4 sm:px-26 overflow-y-auto"
        // onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
      >
        <div className=" ">
          <h1 className="w-full max-w-screen-lg  font-bold text-[20px] sm:text-[24px] text-[var(--blue-dark)]  py-6 ">
            My calls
          </h1>
        </div>
        <div className=" w-full h-screen ">
          {/* Group by in-progress status */}
          {calls.filter((c) => c.status === "in-progress").length > 0 && (
            <div>
              <div className="pb-5">
                <img src={statusInProgress} alt="" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {calls
                  .filter((c) => c.status === "in-progress")
                  .map((call) => (
                    <div
                      key={call.id}
                      className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]"
                    >
                      <div className="">
                        <div className="flex justify-between p-3">
                          <span className="text-[var(--gray-400)] font-bold text-[12px] flex items-center justify-center">
                            {call.id}
                          </span>
                          <div className="flex gap-1">
                            <button
                              className="bg-[var(--gray-500)] p-2 rounded-md"
                              onClick={() =>
                                navigate(`/technician/details/${call.id}`)
                              }
                            >
                              <img
                                src={penEdit}
                                className="w-[14px] h-[14px]"
                                alt=""
                              />
                            </button>
                            <button className="bg-black text-[var(--gray-600)] flex items-center justify-center p-1 px-2 gap-2 rounded-md">
                              <img src={circleClose} alt="" />
                              Close
                            </button>
                          </div>
                        </div>
                        <div className="px-3">
                          <h1 className="text-[var(--gray-100)] font-bold text-[16px]">
                            {call.title}
                          </h1>
                          <p className="text-[var(--gray-100)] text-[12px]">
                            {call.category}
                          </p>
                          <div className="flex border-b border-b-[var(--gray-500)] pt-4 pb-4 justify-between ">
                            <span>
                              {new Date(call.updatedAt).toLocaleDateString()}{" "}
                              {new Date(call.updatedAt).toLocaleTimeString()}
                            </span>
                            <span>${call.total || "0,00"}</span>
                          </div>
                          <div className="flex justify-between mt-4 ">
                            <div className="flex gap-1 items-center  ">
                              <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                                {getInitials(call.user?.name || "")}
                              </div>
                              <span>{call.user?.name || "Unknown"}</span>
                            </div>
                            <img src={mobileStatusInProgress} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Group by open status */}
          {calls.filter((c) => c.status === "open").length > 0 && (
            <div className="mt-6">
              <div className="pb-5">
                <img src={statusOpen} alt="" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {calls
                  .filter((c) => c.status === "open")
                  .map((call) => (
                    <div
                      key={call.id}
                      className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]"
                    >
                      <div className="">
                        <div className="flex justify-between p-3">
                          <span className="text-[var(--gray-400)] font-bold text-[12px] flex items-center justify-center">
                            {call.id}
                          </span>
                          <div className="flex gap-1">
                            <button
                              className="bg-[var(--gray-500)] p-2 rounded-md"
                              onClick={() =>
                                navigate(`/technician/details/${call.id}`)
                              }
                            >
                              <img
                                src={penEdit}
                                className="w-[14px] h-[14px]"
                                alt=""
                              />
                            </button>
                            <button className="bg-black text-[var(--gray-600)] flex items-center justify-center p-1 px-2 gap-2 rounded-md">
                              <img src={circleClose} alt="" />
                              Close
                            </button>
                          </div>
                        </div>
                        <div className="px-3">
                          <h1 className="text-[var(--gray-100)] font-bold text-[16px]">
                            {call.title}
                          </h1>
                          <p className="text-[var(--gray-100)] text-[12px]">
                            {call.category}
                          </p>
                          <div className="flex border-b border-b-[var(--gray-500)] pt-4 pb-4 justify-between ">
                            <span>
                              {new Date(call.updatedAt).toLocaleDateString()}{" "}
                              {new Date(call.updatedAt).toLocaleTimeString()}
                            </span>
                            <span>${call.total || "0,00"}</span>
                          </div>
                          <div className="flex justify-between mt-4 ">
                            <div className="flex gap-1 items-center  ">
                              <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                                {getInitials(call.user?.name || "")}
                              </div>
                              <span>{call.user?.name || "Unknown"}</span>
                            </div>
                            <img src={statusOpen} alt="" className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
