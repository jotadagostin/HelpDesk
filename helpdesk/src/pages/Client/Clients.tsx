import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { useState, useRef, useEffect } from "react";
import { Notification } from "../../components/Notification";
import { useLocation, useNavigate } from "react-router";
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
import uploadSvg from "../../assets/icons/icon/upload.svg";
import trashSvg from "../../assets/icons/icon/trashRed.svg";

export type CallType = {
  id: string;
  title: string;
  category: string;
  total?: string;
  updatedAt: string;
  technicianName?: string;
  status: "open" | "in-progress" | "closed";
  user?: string;
};

export function Clients() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [calls, setCalls] = useState<CallType[]>([]);

  // Profile edit states
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.newCall) {
      // When returning from newcall, refetch to get the latest calls
      fetchCalls();
      // Clear the navigation state to avoid re-running this effect
      navigate("/clients", { replace: true });
    }
  }, [location.state?.newCall]);

  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 📌 Função fetchCalls disponível para todos os useEffects
  const fetchCalls = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3000/api/calls", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCalls(data);
  };

  // UseEffect inicial para carregar os calls
  useEffect(() => {
    fetchCalls();
  }, []);

  // UseEffect para atualizar calls ao voltar de outra página
  useEffect(() => {
    if (location.state?.refresh) {
      fetchCalls(); // chama novamente a API
    }
  }, [location.state]);

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

  const openProfileModal = () => {
    setProfileName(user.name || "");
    setProfileEmail(user.email || "");
    setIsUserPopupOpen(false);
    setIsProfileModalOpen(true);
  };

  const saveProfile = async () => {
    // TODO: Save profile to API
    const updatedUser = {
      ...user,
      name: profileName,
      email: profileEmail,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsProfileModalOpen(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        localStorage.setItem("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <div className="w-8 h-8 rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white">
            {getInitials(user.name)}
          </div>
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
            {/* <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" /> */}

            <div className="w-[32px] h-[32px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white ">
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
                onClick={() => openProfileModal()}
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[440px] max-h-[90vh] overflow-y-auto bg-[var(--gray-600)] rounded-md shadow-xl border border-[var(--gray-400)] z-50 flex flex-col p-6">
            <div className="flex items-center justify-between border-b border-[var(--gray-500)] pb-4 mb-4">
              <span className="font-bold text-md text-[var(--gray-200)]">
                Edit Profile
              </span>
              <img
                src={buttonXSvg}
                alt="Close"
                className="w-[18px] h-[18px] cursor-pointer hover:opacity-70"
                onClick={() => setIsProfileModalOpen(false)}
              />
            </div>

            {/* Profile Image */}
            <div className="flex gap-3 mb-6">
              <div className="w-[60px] h-[60px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-2xl font-bold">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(profileName || user.name)
                )}
              </div>
              <div className="flex flex-col gap-2 justify-center">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-1 bg-[var(--gray-500)] hover:bg-[var(--gray-400)] p-2 rounded-md cursor-pointer transition"
                >
                  <img
                    src={uploadSvg}
                    alt="Upload"
                    className="w-[12px] h-[12px]"
                  />
                  <span className="text-xs text-[var(--gray-100)]">Upload</span>
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {profileImage && (
                  <button
                    onClick={() => {
                      setProfileImage(null);
                      localStorage.removeItem("profileImage");
                    }}
                    className="flex items-center gap-1 bg-[var(--gray-500)] hover:bg-[var(--feedback-danger)] p-2 rounded-md transition"
                  >
                    <img
                      src={trashSvg}
                      alt="Delete"
                      className="w-[12px] h-[12px]"
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <label className="text-[var(--gray-300)] text-xs font-bold block mb-2">
                NAME
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Your name"
                className="border-b border-[var(--gray-500)] bg-transparent text-[var(--gray-100)] py-2 px-2 w-full focus:outline-none focus:border-[var(--gray-400)] transition"
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="text-[var(--gray-300)] text-xs font-bold block mb-2">
                E-MAIL
              </label>
              <input
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="border-b border-[var(--gray-500)] bg-transparent text-[var(--gray-100)] py-2 px-2 w-full focus:outline-none focus:border-[var(--gray-400)] transition"
              />
            </div>

            {/* Current Password */}
            <div className="mb-6">
              <label className="text-[var(--gray-300)] text-xs font-bold block mb-2">
                CURRENT PASSWORD
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="border-b border-[var(--gray-500)] bg-transparent text-[var(--gray-100)] py-2 px-2 w-full focus:outline-none focus:border-[var(--gray-400)] transition"
              />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label className="text-[var(--gray-300)] text-xs font-bold block mb-2">
                NEW PASSWORD
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="border-b border-[var(--gray-500)] bg-transparent text-[var(--gray-100)] py-2 px-2 w-full focus:outline-none focus:border-[var(--gray-400)] transition"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={() => saveProfile()}
              className="mt-6 bg-[var(--gray-200)] hover:bg-[var(--gray-300)] text-white px-4 py-2 rounded font-bold transition w-full"
            >
              Save Changes
            </button>
          </div>
        </>
      )}

      {/* Div Calls starts here: */}
      <div className=" w-full  bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-left px-4 py-4 sm:px-26">
        <h1 className="w-full max-w-screen-lg  font-bold text-[20px] sm:text-[24px] text-[var(--blue-dark)] px-4  py-6">
          Calls
        </h1>
        {location.state?.message && (
          <Notification
            message={String(location.state.message)}
            duration={3000}
          />
        )}
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
              {/* <tbody className="border border-gray-200 text-[var(--gray-100)] ">
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
              </tbody> */}
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                {calls.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-[var(--gray-300)]"
                    >
                      No calls found.
                    </td>
                  </tr>
                ) : (
                  calls.map((call: any) => (
                    <tr key={call.id}>
                      <td className="p-[14px]">
                        {new Date(call.updatedAt).toLocaleDateString()}{" "}
                        {new Date(call.updatedAt)
                          .toLocaleTimeString()
                          .slice(0, 5)}
                      </td>

                      <td className="p-[14px] hidden md:table-cell">
                        {call.id}
                      </td>

                      <td className="p-[14px]">
                        <div className="flex flex-col">
                          <strong>{call.title}</strong>
                          <small>{call.category}</small>
                        </div>
                      </td>

                      <td className="p-[14px] hidden md:table-cell">
                        ${call.total || "0,00"}
                      </td>

                      <td className="p-[14px] hidden md:table-cell">
                        <div className="flex gap-2 items-center">
                          <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                            {getInitials(call.user?.name || user.name)}
                          </div>
                          <small>{call.user?.name || user.name}</small>
                        </div>
                      </td>

                      <td className="p-[14px] hidden md:table-cell">
                        <div className="flex gap-2 items-center">
                          {call.technicianName ? (
                            <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[12px]">
                              {getInitials(call.technicianName)}
                            </div>
                          ) : (
                            <img
                              src={avatarSvg}
                              className="w-[20px] h-[20px]"
                            />
                          )}
                          <small>{call.technicianName || "-"}</small>
                        </div>
                      </td>

                      <td>
                        <div className="flex justify-between p-2">
                          <img
                            src={
                              call.status === "open"
                                ? statusOpenSvg
                                : call.status === "in-progress"
                                ? statusInProgresSvg
                                : statusClosedSvg
                            }
                            alt=""
                            className="hidden md:block"
                          />

                          <img
                            src={
                              call.status === "open"
                                ? statusOpenMobile
                                : call.status === "in-progress"
                                ? statusInProgressMobile
                                : statusClosedMobile
                            }
                            alt=""
                            className="block md:hidden"
                          />

                          <button
                            onClick={() =>
                              navigate(`/clients/details/${call.id}`)
                            }
                          >
                            <img src={buttonEditSvg} alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
