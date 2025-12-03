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
import blockSvg from "../../assets/icons/icon/ban.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export type ServiceType = {
  id: string;
  title: string;
  value: number;
  isActive: boolean;
};

export function Services() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [newServiceTitle, setNewServiceTitle] = useState("");
  const [newServiceValue, setNewServiceValue] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );
  const [editTitle, setEditTitle] = useState("");
  const [editValue, setEditValue] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  // 🔥 get the user in the localstorage:
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 📌 Initialize services from localStorage or defaults
  const initializeServices = () => {
    const saved = localStorage.getItem("services");
    if (saved) {
      try {
        setServices(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading services:", err);
        setServices(getDefaultServices());
      }
    } else {
      setServices(getDefaultServices());
    }
  };

  const getDefaultServices = (): ServiceType[] => [
    { id: "1", title: "Net Installation", value: 190, isActive: true },
    { id: "2", title: "Recover Data", value: 200, isActive: false },
    { id: "3", title: "Hardware Support", value: 140, isActive: true },
    { id: "4", title: "Software Support", value: 200, isActive: true },
  ];

  useEffect(() => {
    initializeServices();
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

  const saveServices = (updatedServices: ServiceType[]) => {
    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices));
  };

  const toggleServiceStatus = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    saveServices(updated);
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
  };

  const addNewService = () => {
    if (!newServiceTitle.trim() || !newServiceValue) return;

    const newService: ServiceType = {
      id: Date.now().toString(),
      title: newServiceTitle,
      value: parseFloat(newServiceValue),
      isActive: true,
    };

    saveServices([...services, newService]);
    setNewServiceTitle("");
    setNewServiceValue("");
    setIsNewOpen(false);
  };

  const openEditModal = (service: ServiceType) => {
    setSelectedService(service);
    setEditTitle(service.title);
    setEditValue(service.value.toString());
    setIsEditOpen(true);
  };

  const saveEditedService = () => {
    if (!selectedService || !editTitle.trim() || !editValue) return;

    const updated = services.map((s) =>
      s.id === selectedService.id
        ? { ...s, title: editTitle, value: parseFloat(editValue) }
        : s
    );

    saveServices(updated);
    setIsEditOpen(false);
    setSelectedService(null);
    setEditTitle("");
    setEditValue("");
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
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/admin/tec")}
              >
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

        <div className="h-[70%]  flex justify-center items-end ">
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

      {/* Div Services starts here: */}
      <div className=" w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center">
        <div className="w-[90%] flex items-center gap-3 ">
          <h1 className="w-[90%] h-[44px]  font-bold text-[24px] text-[var(--blue-dark)] px-[48px]  py-[52px] ">
            Services
          </h1>
          <Button onClick={() => setIsNewOpen(true)} />
        </div>
        <div className="w-[90%]  px-[48px]  py-[52px]  flex items-center justify-center  ">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full ">
              <thead className="border border-gray-300  ">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left w-[35%]">Title</th>
                  <th className="p-[14px] text-left w-[35%]">Value</th>
                  <th className="p-[14px] text-left  flex justify-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id} className="">
                      <td className="px-2 py-4">
                        <div className="flex gap-2 ">
                          <small className="font-bold">{service.title}</small>
                        </div>
                      </td>
                      <td>${service.value.toFixed(2)}</td>
                      <div className="flex items-center justify-end pr-[18px] gap-3  h-[50px]  ">
                        <span
                          className={`flex mr-9 text-[12px] font-bold py-1 px-2 rounded-2xl ${
                            service.isActive
                              ? "text-[var(--feedback-done)] bg-[var(--feedback-bg)]"
                              : "text-[var(--feedback-danger)] bg-[var(--feedback-danger-bg)]"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                        <button
                          onClick={() => toggleServiceStatus(service.id)}
                          className="hover:opacity-70 transition"
                        >
                          <img src={blockSvg} alt="" />
                        </button>
                        <small className="text-[var(--gray-300)] text-[12px]">
                          {service.isActive ? "Deactivate" : "Activate"}
                        </small>
                        <button
                          onClick={() => openEditModal(service)}
                          className="hover:opacity-70 transition"
                        >
                          <img src={buttonEditSvg} alt="" />
                        </button>
                      </div>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-[14px] text-center text-[var(--gray-400)]"
                    >
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ✅ Modal edit open*/}
      {isEditOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[440px] h-[336px] rounded-xl p-6 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-md font-bold text-[var(--gray-200)]">
                Edit Service
              </h2>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-[var(--gray-400)] hover:text-[var(--gray-300)] transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[var(--gray-300)] text-[16px]">
                Title
              </label>
              <input
                type="text"
                placeholder="Name of the service"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:border-[var(--gray-400)] outline-none text-[var(--gray-300)] text-[16px]"
              />
              <label className="text-[var(--gray-300)] text-[16px]">
                Value
              </label>
              <input
                type="number"
                placeholder="Value"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:border-[var(--gray-400)] outline-none text-[var(--gray-300)] text-[16px]"
              />
            </div>
            <div className="flex justify-end gap-3 mt-auto">
              <button
                onClick={saveEditedService}
                className="px-4 py-2 rounded-md bg-[var(--gray-200)] text-white hover:bg-[var(--gray-300)] transition-all w-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ✅ Modal new open*/}
      {isNewOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[440px] h-[336px] rounded-xl p-6 flex flex-col gap-4 shadow-lg">
            <h2 className="text-xl font-semibold text-[var(--blue-dark)]">
              {/* ✅ Modal fica aqui, antes do fechamento final do container principal */}
              {isNewOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                  <div className="bg-white w-[440px] h-[336px] rounded-xl p-6 flex flex-col gap-4 shadow-lg">
                    <div className="flex justify-between items-center">
                      <h2 className="text-md font-bold text-[var(--gray-200)]">
                        Service registration
                      </h2>
                      <button
                        onClick={() => setIsNewOpen(false)}
                        className="text-[var(--gray-400)] hover:text-[var(--gray-300)] transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="title"
                        className="text-[var(--gray-300)] text-[16px]"
                      >
                        Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Name of the service"
                        value={newServiceTitle}
                        onChange={(e) => setNewServiceTitle(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:border-[var(--gray-400)] outline-none text-[var(--gray-300)] text-[16px]"
                      />
                      <label
                        htmlFor="value"
                        className="text-[var(--gray-300)] text-[16px]"
                      >
                        Value
                      </label>
                      <input
                        id="value"
                        type="number"
                        placeholder="Value"
                        value={newServiceValue}
                        onChange={(e) => setNewServiceValue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:border-[var(--gray-400)] outline-none text-[var(--gray-300)] text-[16px]"
                      />
                    </div>
                    <div className="flex justify-end gap-3 mt-auto">
                      <button
                        onClick={addNewService}
                        className="px-4 py-2 rounded-md bg-[var(--gray-200)] text-white hover:bg-[var(--gray-300)] transition-all w-full"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
