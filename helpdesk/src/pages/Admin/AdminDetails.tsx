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
import { useNavigate, useParams } from "react-router";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import clockSvg from "../../assets/icons/icon/clock-2.svg";
import checkSvg from "../../assets/icons/icon/circle-check-big.svg";
import statusOpenSvg from "../../assets/icons/icon/TagStatus(open).svg";
import statusInProgressSvg from "../../assets/icons/icon/TagStatus(inprogress).svg";
import statusClosedSvg from "../../assets/icons/icon/TagStatus(closed).svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export type CallDetailsType = {
  id: string | number;
  title: string;
  category: string;
  description?: string;
  total?: string;
  updatedAt: string;
  createdAt?: string;
  status: "open" | "in-progress" | "closed";
  user?: {
    name: string;
    email?: string;
  };
  technician?: {
    id?: string;
    name: string;
    email?: string;
  };
  additionalServices?: Array<{
    service: string;
    price: number;
  }>;
};

export function CallsDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [call, setCall] = useState<CallDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<
    "open" | "in-progress" | "closed" | null
  >(null);
  const [saving, setSaving] = useState(false);
  const [technicianName, setTechnicianName] = useState<string>("");
  const [newService, setNewService] = useState({ service: "", price: "" });
  const [isAddingService, setIsAddingService] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 📌 Função para buscar os detalhes da call
  const fetchCallDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found - Please login again");
      }

      if (!id) {
        throw new Error("No call ID provided");
      }

      console.log("Fetching call details for ID:", id);

      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch call details: ${res.status}`);
      }

      const data = await res.json();
      console.log("Call details fetched:", data);
      setCall(data);
      setEditStatus(data.status);
      setTechnicianName(data.technician?.name || "");
    } catch (err) {
      console.error("Error fetching call details:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load call details"
      );
    } finally {
      setLoading(false);
    }
  };

  // 📌 Função para atualizar o técnico responsável
  const updateTechnician = async (name: string) => {
    if (!name) return;
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technicianName: name }),
      });

      if (!res.ok) {
        throw new Error("Failed to update technician");
      }

      const updatedCall = await res.json();
      setCall(updatedCall);
      setTechnicianName(name);
    } catch (err) {
      console.error("Error updating technician:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update technician"
      );
    } finally {
      setSaving(false);
    }
  };

  // 📌 Função para adicionar serviço adicional
  const addAdditionalService = async () => {
    if (!newService.service.trim() || !newService.price) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const updatedServices = [
        ...(call?.additionalServices || []),
        { service: newService.service, price: parseFloat(newService.price) },
      ];

      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ additionalServices: updatedServices }),
      });

      if (!res.ok) {
        throw new Error("Failed to add service");
      }

      const updatedCall = await res.json();
      setCall(updatedCall);
      setNewService({ service: "", price: "" });
      setIsAddingService(false);
    } catch (err) {
      console.error("Error adding service:", err);
      setError(err instanceof Error ? err.message : "Failed to add service");
    } finally {
      setSaving(false);
    }
  };

  // 📌 Função para remover serviço adicional
  const removeAdditionalService = async (index: number) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const updatedServices = (call?.additionalServices || []).filter(
        (_, i) => i !== index
      );

      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ additionalServices: updatedServices }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove service");
      }

      const updatedCall = await res.json();
      setCall(updatedCall);
    } catch (err) {
      console.error("Error removing service:", err);
      setError(err instanceof Error ? err.message : "Failed to remove service");
    } finally {
      setSaving(false);
    }
  };

  // 📌 Função para atualizar o status
  const updateStatus = async (newStatus: "open" | "in-progress" | "closed") => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const updatedCall = await res.json();
      setCall(updatedCall);
      setEditStatus(newStatus);
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

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

  useEffect(() => {
    fetchCallDetails();
  }, [id]);

  const getInitials = (fullName: string) => {
    if (!fullName) return "";

    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return statusOpenSvg;
      case "in-progress":
        return statusInProgressSvg;
      case "closed":
        return statusClosedSvg;
      default:
        return statusOpenSvg;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("pt-BR") +
      " " +
      date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    );
  };

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

          {/* Buttons - Status Update */}
          <div className="flex flex-row gap-2 text-[var(--gray-100)]">
            <button
              onClick={() => updateStatus("in-progress")}
              disabled={saving}
              className="flex items-center bg-gray-300 rounded p-3 gap-2 w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto disabled:opacity-50"
            >
              <img src={clockSvg} alt="" />
              <span className="font-bold text-[14px] text-center">
                In attendance
              </span>
            </button>
            <button
              onClick={() => updateStatus("closed")}
              disabled={saving}
              className="flex items-center bg-gray-300 rounded p-3 gap-2 font-bold text-[14px] w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto disabled:opacity-50"
            >
              <img src={checkSvg} alt="" />
              <span className="font-bold">Closed</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full max-w-[1200px] text-center py-8 text-[var(--gray-400)]">
            Loading call details...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="w-full max-w-[1200px] text-center py-8 text-[var(--feedback-danger)]">
            Error: {error}
          </div>
        )}

        {/* Call Details and Technician Info */}
        {call && (
          <div className="flex flex-col lg:flex-row w-full max-w-[1200px] gap-6 justify-center items-stretch mt-6">
            {/* Call Details Card */}
            <div className="border rounded border-[var(--gray-500)] w-full lg:w-[800px] p-5">
              <div className="flex justify-between mb-5">
                <div>
                  <span className="text-[var(--gray-300)] text-[12px]">
                    {String(call.id).slice(0, 5).toUpperCase()}
                  </span>
                  <h3 className="text-[var(--gray-200)] text-[16px] font-bold">
                    {call.title}
                  </h3>
                </div>
                <img
                  src={getStatusIcon(call.status)}
                  alt=""
                  className="w-[64px] h-[64px]"
                />
              </div>

              <div className="mb-5">
                <span className="text-[var(--gray-400)] text-[12px]">
                  Description
                </span>
                <p className="text-[var(--gray-200)] text-[14px]">
                  {call.description || "No description provided"}
                </p>
              </div>

              <div className="mb-5">
                <span className="text-[var(--gray-400)] text-[12px]">
                  Category
                </span>
                <p className="text-[var(--gray-200)] text-[14px]">
                  {call.category}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-10 sm:gap-20 mb-5">
                <div>
                  <span className="text-[var(--gray-400)] text-[12px]">
                    Created at
                  </span>
                  <p className="text-[var(--gray-200)] text-[14px]">
                    {formatDate(call.createdAt || "")}
                  </p>
                </div>
                <div>
                  <span className="text-[var(--gray-400)] text-[12px]">
                    Updated at
                  </span>
                  <p className="text-[var(--gray-200)] text-[14px]">
                    {formatDate(call.updatedAt)}
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
                    {call.user?.name || "Unknown"}
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
                <input
                  type="text"
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  onBlur={() => updateTechnician(technicianName)}
                  disabled={saving}
                  placeholder="Enter technician name"
                  className="w-full mt-2 p-2 bg-[var(--gray-500)] text-[var(--gray-200)] rounded border border-[var(--gray-400)] disabled:opacity-50"
                />
                {call.technician && (
                  <div className="flex gap-2 items-center mt-3">
                    <div className="w-[32px] h-[32px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white font-bold">
                      {getInitials(technicianName)}
                    </div>
                    <div>
                      <p className="text-[var(--gray-200)] text-[14px]">
                        {call.technician.name}
                      </p>
                      <small className="text-[var(--gray-300)]">
                        {call.technician.email || ""}
                      </small>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 mb-5">
                <span className="text-[var(--gray-400)] text-[12px]">
                  Prices
                </span>
                <div className="flex justify-between">
                  <p className="text-[var(--gray-200)] text-[14px]">
                    Base price
                  </p>
                  <p className="text-[var(--gray-200)] text-[14px]">
                    ${call.total || "0,00"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--gray-400)] text-[12px]">
                    Additional Services
                  </span>
                  <button
                    onClick={() => setIsAddingService(!isAddingService)}
                    className="text-[var(--blue-dark)] text-xs font-bold hover:underline"
                    disabled={saving}
                  >
                    + Add
                  </button>
                </div>

                {/* Add Service Form */}
                {isAddingService && (
                  <div className="flex flex-col gap-2 p-3 bg-[var(--gray-500)] rounded mb-3">
                    <input
                      type="text"
                      placeholder="Service name"
                      value={newService.service}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          service: e.target.value,
                        })
                      }
                      className="p-2 bg-[var(--gray-600)] text-[var(--gray-200)] rounded border border-[var(--gray-400)] text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({ ...newService, price: e.target.value })
                      }
                      step="0.01"
                      className="p-2 bg-[var(--gray-600)] text-[var(--gray-200)] rounded border border-[var(--gray-400)] text-xs"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={addAdditionalService}
                        disabled={saving}
                        className="flex-1 p-1 bg-[var(--blue-dark)] text-white rounded text-xs font-bold hover:opacity-80 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsAddingService(false)}
                        className="flex-1 p-1 bg-[var(--gray-400)] text-white rounded text-xs font-bold hover:opacity-80"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Services List */}
                {call.additionalServices &&
                call.additionalServices.length > 0 ? (
                  call.additionalServices.map((service, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 bg-[var(--gray-500)] rounded"
                    >
                      <div>
                        <p className="text-[var(--gray-200)] text-[14px]">
                          {service.service}
                        </p>
                        <p className="text-[var(--gray-300)] text-[12px]">
                          ${service.price?.toFixed(2) || "0.00"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAdditionalService(idx)}
                        disabled={saving}
                        className="text-[var(--feedback-danger)] hover:underline text-xs disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-[var(--gray-300)] text-[12px]">
                    No additional services
                  </p>
                )}

                <div className="flex justify-between border-t border-[var(--gray-500)] pt-3 mt-3">
                  <span className="text-[var(--gray-200)] text-[14px] font-bold">
                    Total
                  </span>
                  <span className="text-[var(--gray-200)] text-[14px] font-bold">
                    ${call.total || "0,00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Div Callsdetails ends here. */}
    </div>
  );
}
