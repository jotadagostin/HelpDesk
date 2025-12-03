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
import buttonDeleteSvg from "../../assets/icons/icon/trashButton.svg";
import bigAvagarSvg from "../../assets/icons/icon/bigAvatar.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export type ClientType = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export function Clients() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientType>({
    id: "",
    name: "",
    email: "",
  });
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 📌 Função para buscar clientes
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found - Please login again");
      }

      const res = await fetch("http://localhost:3000/api/users?role=CLIENT", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch clients: ${res.status}`);
      }

      const data = await res.json();
      // Filtra apenas clientes com role CLIENT
      const clientsList = Array.isArray(data)
        ? data.filter((user: ClientType) => user.role === "CLIENT")
        : [];
      // Merge any local edits saved in localStorage (client_<id>)
      const merged = clientsList.map((c) => getClientData(c));
      setClients(merged);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError(err instanceof Error ? err.message : "Failed to load clients");
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
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

  const getClientData = (client: ClientType) => {
    const edited = localStorage.getItem(`client_${client.id}`);
    if (edited) {
      try {
        return JSON.parse(edited) as ClientType;
      } catch (err) {
        console.error("Error parsing client from localStorage:", err);
      }
    }
    return client;
  };

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row">
      {/* ===== Sidebar e Navbar ===== */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[var(--gray-100)]">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 z-50 w-[200px] h-full bg-[var(--gray-100)] shadow-lg flex flex-col">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[var(--gray-600)] hover:text-[var(--blue-dark)]"
              >
                ✕
              </button>
            </div>

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

        <div className="w-[200px] h-[44px] flex items-center">
          <img src={adminMenuSvg} alt="" />
        </div>

        <div>
          <img
            src={avatarSvg}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* ===== Sidebar Desktop ===== */}
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)] flex-col">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full justify-center items-center pt-5">
          <ul>
            {[
              {
                label: "Calls",
                path: "/admin",
                icon: callsSvg,
                iconWhite: callsWhiteSvg,
              },
              {
                label: "Technicians",
                path: "/admin/tec",
                icon: techniciansSvg,
                iconWhite: techiciansWhiteSvg,
              },
              {
                label: "Clients",
                path: "/admin/clients",
                icon: clientsSvg,
                iconWhite: clientsWhiteSvg,
              },
              {
                label: "Services",
                path: "/admin/services",
                icon: serviceSvg,
                iconWhite: servicesWhiteSvg,
              },
            ].map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
              >
                <a
                  href="#"
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={isHovered ? item.iconWhite : item.icon}
                    alt={item.label}
                    className="w-[20px] h-[20px]"
                  />
                  <span
                    className={
                      isHovered ? "text-white" : "text-[var(--gray-400)]"
                    }
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

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

      {/* ===== Clients Content ===== */}
      <div className="w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center">
        <div className="w-[90%] flex items-center gap-3">
          <h1 className="w-[90%] font-bold text-[24px] text-[var(--blue-dark)] px-[48px] py-[52px]">
            Clients
          </h1>
        </div>

        <div className="w-[90%] px-[48px] py-[52px] flex items-center justify-center">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="border border-gray-300">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left">Name</th>
                  <th className="p-[14px] text-left">E-mail</th>
                  <th className="p-[14px] text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-[14px] text-center text-[var(--gray-400)]"
                    >
                      Loading clients...
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
                ) : clients && clients.length > 0 ? (
                  clients.map((client: ClientType) => (
                    <tr key={client.id}>
                      <td className="px-2 py-4">
                        <div className="flex gap-2">
                          <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-xs font-bold">
                            {getInitials(getClientData(client).name)}
                          </div>
                          <small className="font-bold">
                            {getClientData(client).name}
                          </small>
                        </div>
                      </td>
                      <td>{getClientData(client).email}</td>
                      <td className="text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setIsEditOpen(true);
                            }}
                          >
                            <img src={buttonEditSvg} alt="Edit" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setIsDeleteOpen(true);
                            }}
                          >
                            <img src={buttonDeleteSvg} alt="Delete" />
                          </button>
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
                      No clients found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ======== POP-UP DE EDIÇÃO ======== */}
      {isEditOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="bg-[var(--gray-600)] w-[440px] h-[404px] rounded-lg p-6 shadow-lg flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[var(--blue-dark)] text-xl font-bold">
                  Client
                </h2>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-[var(--gray-100)] hover:text-[var(--blue-dark)]"
                >
                  ✕
                </button>
              </div>
              <div className="mb-5">
                <div className="w-[48px] h-[48px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-xl font-bold">
                  {getInitials(getClientData(selectedClient).name)}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[var(--gray-400)] mb-1">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={selectedClient.name}
                    onChange={(e) =>
                      setSelectedClient((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="border border-[var(--gray-400)] rounded px-3 py-2 text-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-dark)]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-[var(--gray-400)] mb-1">
                    E-MAIL
                  </label>
                  <input
                    type="email"
                    value={selectedClient.email}
                    onChange={(e) =>
                      setSelectedClient((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="border border-[var(--gray-400)] rounded px-3 py-2 text-[var(--gray-100)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-dark)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {/* <button
                onClick={() => setIsEditOpen(false)}
                className="bg-gray-300 text-[var(--gray-600)] px-4 py-2 rounded font-bold hover:bg-gray-400 transition"
              >
                Cancel
              </button> */}
              <button
                onClick={() => {
                  if (selectedClient && selectedClient.id) {
                    // persist to localStorage so UI can show changes without backend
                    localStorage.setItem(
                      `client_${selectedClient.id}`,
                      JSON.stringify(selectedClient)
                    );
                    setClients((prev) =>
                      prev.map((c) =>
                        c.id === selectedClient.id ? selectedClient : c
                      )
                    );
                  }
                  setIsEditOpen(false);
                }}
                className="bg-[var(--gray-200)] text-white px-4 py-2 rounded font-bold hover:opacity-90 transition w-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== POP-UP DE EXCLUSÃO ======== */}
      {isDeleteOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setIsDeleteOpen(false)}
        >
          <div
            className="bg-[var(--gray-600)] w-[440px] h-[404px] rounded-lg p-6 shadow-lg flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-b-[var(--gray-500)]">
              <h2 className="text-[var(--gray-200)] text-xl font-bold">
                Excluir cliente
              </h2>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="text-[var(--gray-100)] hover:text-[var(--blue-dark)]"
              >
                ✕
              </button>
            </div>

            {/* Corpo */}
            <div className="text-[var(--gray-100)] text-sm flex flex-col gap-3">
              <p className="text-[16px]">
                Do you really want to delete{" "}
                <span className="font-bold text-[var(--gray-200)]">
                  {selectedClient.name}
                </span>
                ?
              </p>
              <p className="text-[16px]">
                Deleting this will remove all tickets for this customer and this
                action cannot be undone.
              </p>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="bg-gray-300 text-[var(--gray-600)] px-4 py-2 rounded font-bold hover:bg-gray-400 transition w-screen"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedClient && selectedClient.id) {
                    localStorage.removeItem(`client_${selectedClient.id}`);
                    setClients((prev) =>
                      prev.filter((c) => c.id !== selectedClient.id)
                    );
                  }
                  setIsDeleteOpen(false);
                }}
                className="bg-[var(--gray-200)] text-white px-4 py-2 rounded font-bold hover:opacity-90 transition w-screen"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
