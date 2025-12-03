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
import { Button } from "../../components/Button";
import buttonEditSvg from "../../assets/icons/icon/Button(Edit).svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export type TechnicianType = {
  id: string;
  name: string;
  email: string;
  role?: string;
  availableTimes?: string[];
};

export function Tec() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAvailableTimes, setNewAvailableTimes] = useState("");
  const [technicians, setTechnicians] = useState<TechnicianType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 📌 Função para buscar técnicos
  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found - Please login again");
      }

      const res = await fetch("http://localhost:3000/api/users?role=TEC", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch technicians: ${res.status}`);
      }

      const data = await res.json();
      // Filtra apenas técnicos com role TEC
      const apiTechs = Array.isArray(data)
        ? data.filter((user: TechnicianType) => user.role === "TEC")
        : [];

      // merge local added technicians stored in localStorage under 'local_technicians'
      const local = localStorage.getItem("local_technicians");
      let localTechs: TechnicianType[] = [];
      if (local) {
        try {
          localTechs = JSON.parse(local);
        } catch (err) {
          console.error("Error parsing local technicians", err);
        }
      }

      // Combine local technicians (newly added) before API ones
      const combined = [...localTechs, ...apiTechs];
      setTechnicians(combined);
    } catch (err) {
      console.error("Error fetching technicians:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load technicians"
      );
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
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

  const getInitials = (fullName: string) => {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getTechnicianData = (tech: TechnicianType) => {
    const edited = localStorage.getItem(`technician_${tech.id}`);
    if (edited) {
      try {
        return JSON.parse(edited);
      } catch (err) {
        console.error("Error parsing:", err);
      }
    }
    return tech;
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
                    navigate("/admin/tec");
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
                    navigate("/admin/clients");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={clientsSvg} alt="Clients" className="w-5 h-5" />
                  <span className="text-[var(--gray-400)]">Clients</span>
                </li>
                <li
                  className="flex items-center gap-3 p-2 rounded hover:bg-[var(--blue-dark)]"
                  onClick={() => {
                    navigate("/admin/services");
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
                onClick={() => navigate("/admin/clients")}
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
                onClick={() => navigate("/admin/services")}
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

      <div className="w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center min-h-screen md:min-h-auto">
        <div className="w-[90%] flex items-center h-[10%] justify-start ">
          <h1 className="w-[90%] h-[44px] font-bold text-[24px] text-[var(--blue-dark)] px-4 py-6 md:px-[48px] md:py-[52px] flex items-center">
            Technicians
          </h1>
          <Button onClick={() => setIsAddModalOpen(true)} />
        </div>
        <div className=" w-[90%] px-4 py-6 md:px-[48px] md:py-[52px] flex items-center justify-center">
          {/* Container com scroll horizontal no mobile */}
          <div className="w-full border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[600px] md:min-w-full table-auto">
              <thead className="border border-gray-300">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left hidden md:table-cell">E-mail</th>
                  <th className="p-3 text-left">Available</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-[14px] text-center text-[var(--gray-400)]"
                    >
                      Loading technicians...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-[14px] text-center text-[var(--feedback-danger)]"
                    >
                      Error: {error}
                    </td>
                  </tr>
                ) : technicians && technicians.length > 0 ? (
                  technicians.map((tech: TechnicianType) => (
                    <tr key={tech.id}>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-xs font-bold">
                            {getInitials(getTechnicianData(tech).name)}
                          </div>
                          <small className="font-bold text-sm">
                            {getTechnicianData(tech).name}
                          </small>
                        </div>
                      </td>
                      <td className="hidden md:table-cell text-sm">
                        {getTechnicianData(tech).email}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1">
                            {tech.availableTimes &&
                            tech.availableTimes.length > 0 ? (
                              tech.availableTimes.map((time, idx) => (
                                <div
                                  key={idx}
                                  className="text-[10px] flex items-center text-[var(--gray-400)] border rounded-full px-2 py-0.5 font-normal"
                                >
                                  {time}
                                </div>
                              ))
                            ) : (
                              <small className="text-[var(--gray-400)]">
                                No times available
                              </small>
                            )}
                          </div>
                          <div>
                            <button>
                              <img
                                src={buttonEditSvg}
                                alt="Edit"
                                className="w-5 h-5"
                                onClick={() =>
                                  navigate(`/admin/tecprofile/${tech.id}`)
                                }
                              />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-[14px] text-center text-[var(--gray-400)]"
                    >
                      No technicians found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add Technician Modal */}
        {isAddModalOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[520px] bg-[var(--gray-600)] rounded-md shadow-xl border border-[var(--gray-400)] z-50 p-6">
              <div className="flex items-center justify-between border-b border-[var(--gray-500)] pb-3">
                <span className="font-bold">Add Technician</span>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-[var(--gray-300)]"
                >
                  X
                </button>
              </div>

              <div className="mt-4">
                <label className="text-[var(--gray-300)] text-xs">NAME</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-2 mt-1 bg-transparent"
                  placeholder="Full name"
                />

                <label className="text-[var(--gray-300)] text-xs mt-3 block">
                  E-MAIL
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-2 mt-1 bg-transparent"
                  placeholder="email@example.com"
                />

                <label className="text-[var(--gray-300)] text-xs mt-3 block">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-2 mt-1 bg-transparent"
                  placeholder="password"
                />

                <label className="text-[var(--gray-300)] text-xs mt-3 block">
                  Available Times (comma separated)
                </label>
                <input
                  type="text"
                  value={newAvailableTimes}
                  onChange={(e) => setNewAvailableTimes(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-2 mt-1 bg-transparent"
                  placeholder="09:00, 14:00"
                />

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setIsAddModalOpen(false)}
                    className="bg-[var(--gray-200)] text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      // basic validation
                      if (!newName || !newEmail) {
                        alert("Name and email are required");
                        return;
                      }

                      // create local technician and persist in localStorage
                      const id = Date.now().toString();
                      const localTech: TechnicianType = {
                        id,
                        name: newName,
                        email: newEmail,
                        role: "TEC",
                        availableTimes: newAvailableTimes
                          ? newAvailableTimes.split(",").map((s) => s.trim())
                          : [],
                      };

                      const stored = localStorage.getItem("local_technicians");
                      let arr: TechnicianType[] = [];
                      if (stored) {
                        try {
                          arr = JSON.parse(stored);
                        } catch (e) {
                          console.error(e);
                          arr = [];
                        }
                      }
                      arr.unshift(localTech);
                      localStorage.setItem(
                        "local_technicians",
                        JSON.stringify(arr)
                      );

                      // update state to show new technician immediately
                      setTechnicians((prev) => [localTech, ...prev]);

                      // reset form and close
                      setNewName("");
                      setNewEmail("");
                      setNewPassword("");
                      setNewAvailableTimes("");
                      setIsAddModalOpen(false);
                    }}
                    className="bg-black text-[var(--gray-100)] px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
