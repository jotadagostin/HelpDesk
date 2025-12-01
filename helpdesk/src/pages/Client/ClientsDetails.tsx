import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import arrowSvg from "../../assets/icons/icon/arrow-left.svg";
import clockSvg from "../../assets/icons/icon/clock-2.svg";
import checkSvg from "../../assets/icons/icon/circle-check-big.svg";
import statusOpen from "../../assets/icons/icon/TagStatus(aberto).svg";
import plusSvg from "../../assets/icons/icon/plusGraySvg.svg";
import plusWhiteSvg from "../../assets/icons/icon/plus.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";

export function ClientsDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // editable call state
  const [callTitle, setCallTitle] = useState("");
  const [callDescription, setCallDescription] = useState("");
  const [callCategory, setCallCategory] = useState("");
  const [callTotal, setCallTotal] = useState<string>("");
  const [callTechnician, setCallTechnician] = useState<string>("");
  const [additionalServices, setAdditionalServices] = useState<
    Array<{ name: string; price: number }>
  >([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState<string>("");
  const [loading, setLoading] = useState(false);

  //  get the user in the localstorage:
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

  // category info with default base prices
  const CATEGORY_INFO: Record<string, { label: string; price: number }> = {
    "data-recover": { label: "Data Recover", price: 200.0 },
    backup: { label: "Backup", price: 150.0 },
    internet: { label: "Internet", price: 100.0 },
    others: { label: "Others", price: 50.0 },
  };

  // load call details when id is present
  useEffect(() => {
    async function loadCall() {
      if (!id) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load call");
        const data = await res.json();
        setCallTitle(data.title || "");
        setCallDescription(data.description || "");
        setCallCategory(data.category || "");
        setCallTotal(
          data.total != null
            ? String(data.total)
            : String(CATEGORY_INFO[data.category]?.price ?? 0)
        );
        setCallTechnician(data.technicianName ?? "");
        setAdditionalServices(data.additionalServices || []);
      } catch (e) {
        console.error("Error loading call:", e);
      } finally {
        setLoading(false);
      }
    }

    loadCall();
  }, [id]);

  // Auto-update callTotal when additionalServices or category changes
  useEffect(() => {
    const basePrice = CATEGORY_INFO[callCategory]?.price ?? 0;
    const additionalTotal = additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );
    const newTotal = basePrice + additionalTotal;
    setCallTotal(String(newTotal));
  }, [additionalServices, callCategory]);

  // computed base price for current category
  const basePrice = CATEGORY_INFO[callCategory]?.price ?? 0;

  // Calculate additional services total
  const additionalServicesTotal = additionalServices.reduce(
    (sum, service) => sum + service.price,
    0
  );

  // Calculate total including base and additional
  const calculatedTotal = basePrice + additionalServicesTotal;

  const handleAddService = () => {
    if (!newServiceName || !newServicePrice) return;
    setAdditionalServices([
      ...additionalServices,
      { name: newServiceName, price: Number(newServicePrice) },
    ]);
    setNewServiceName("");
    setNewServicePrice("");
  };

  const handleRemoveService = (index: number) => {
    setAdditionalServices(additionalServices.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: callTitle,
          description: callDescription,
          category: callCategory,
          total: callTotal !== "" ? Number(callTotal) : null,
          technicianName: callTechnician,
          additionalServices: additionalServices,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      await res.json();
      navigate("/clients", { state: { refresh: true } });
    } catch (e) {
      console.error("Error saving call:", e);
      alert("Failed to save call");
    }
  };

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row ">
      {/* ========== MOBILE HEADER ========== */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden bg-[var(--gray-100)]">
        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 z-50 w-[200px] h-full bg-[var(--gray-100)] shadow-lg flex flex-col">
            {/* Botão fechar */}
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
                    navigate("/clients/newcall");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <img src={plusSvg} alt="Create Call" className="w-5 h-5" />
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

        {/* Logo */}
        <div className="w-[200px] h-[44px] flex items-center">
          <img src={adminMenuSvg} alt="Logo" />
        </div>

        {/* Avatar */}
        <div>
          <img
            src={avatarSvg}
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* ========== DESKTOP SIDEBAR ========== */}
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)] flex-col">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full justify-center items-center pt-5">
          <ul>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients")}
              >
                <img
                  src={isHovered ? callsWhiteSvg : callsSvg}
                  alt="Calls icon"
                  className="w-[20px] h-[20px] transition-all"
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
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/clients/newcall")}
              >
                <img
                  src={isHovered ? plusWhiteSvg : plusSvg}
                  alt="Create call icon"
                  className="w-[20px] h-[20px] transition-all"
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

        <div className="h-[80%]  flex justify-center items-end">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
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
                  navigate("/clients");
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
            <button className="flex items-center bg-gray-300 rounded p-3 gap-2 w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto ">
              <img src={clockSvg} alt="" />
              <span className="font-bold text-[14px] text-center">
                In attendance
              </span>
            </button>
            <button
              onClick={async () => {
                if (!id) return;
                const confirmClose = window.confirm(
                  "Are you sure you want to mark this call as closed?"
                );
                if (!confirmClose) return;
                setLoading(true);
                try {
                  const token = localStorage.getItem("token");
                  const res = await fetch(
                    `http://localhost:3000/api/calls/${id}`,
                    {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({ status: "closed" }),
                    }
                  );
                  if (!res.ok) throw new Error("Failed to close call");
                  // navigate back and ask list to refresh
                  navigate("/clients", {
                    state: {
                      refresh: true,
                      message: "Call closed successfully",
                    },
                  });
                } catch (e) {
                  console.error("Error closing call:", e);
                  alert("Failed to close call");
                } finally {
                  setLoading(false);
                }
              }}
              className="flex items-center bg-gray-300 rounded p-3 gap-2 font-bold text-[14px] w-[173px] h-[40px] justify-center sm:w-auto sm:h-auto "
            >
              <img src={checkSvg} alt="" />
              <span className="font-bold">Closed</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center bg-[var(--blue-dark)] rounded p-3 gap-2 font-bold text-[14px] text-white w-[120px] h-[40px] justify-center sm:w-auto sm:h-auto"
            >
              Save
            </button>
          </div>
        </div>

        {/* Call Details and Technician Info */}
        <div className="flex flex-col lg:flex-row w-full max-w-[1200px] gap-6 justify-center items-stretch mt-6">
          {/* Call Details Card */}
          <div className="border rounded border-[var(--gray-500)] w-full lg:w-[800px] p-5">
            <div className="flex justify-between mb-5">
              <div className="w-full">
                <span className="text-[var(--gray-300)] text-[12px]">
                  #{id}
                </span>
                <input
                  value={callTitle}
                  onChange={(e) => setCallTitle(e.target.value)}
                  className="w-full text-[var(--gray-200)] text-[16px] font-bold bg-transparent border-b border-[var(--gray-500)] py-1"
                />
              </div>
              <img src={statusOpen} alt="" />
            </div>

            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">
                Description
              </span>
              <textarea
                value={callDescription}
                onChange={(e) => setCallDescription(e.target.value)}
                className="text-[var(--gray-200)] text-[14px] w-full bg-transparent border-b border-[var(--gray-500)] py-2 px-1 resize-none"
                rows={4}
              />
            </div>

            <div className="mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">
                Category
              </span>
              <select
                value={callCategory}
                onChange={(e) => setCallCategory(e.target.value)}
                className="text-[var(--gray-200)] text-[14px] w-full bg-transparent border-b border-[var(--gray-500)] py-1"
              >
                <option value="">Select a category</option>
                <option value="data-recover">Data Recover</option>
                <option value="backup">Backup</option>
                <option value="internet">Internet</option>
                <option value="others">Others</option>
              </select>
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
              <span className="text-[var(--gray-400)] text-[12px]">Client</span>
              <div className="flex gap-2 items-center">
                <img src={avatarSvg} alt="" className="w-[20px] h-[20px]" />
                <p className="text-[var(--gray-200)] text-[14px]">
                  {user?.name}
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
              <div className="flex gap-2 items-center mt-2">
                <img src={avatarSvg} alt="" className="w-[32px] h-[32px]" />
                <div>
                  <input
                    value={callTechnician}
                    onChange={(e) => setCallTechnician(e.target.value)}
                    placeholder="Technician name"
                    className="text-[var(--gray-200)] text-[14px] bg-transparent border-b border-[var(--gray-500)] py-1 px-1"
                  />
                  <small className="text-[var(--gray-300)]">
                    {/* email not available in call payload */}
                  </small>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              <span className="text-[var(--gray-400)] text-[12px]">Prices</span>
              <div className="flex justify-between">
                <p className="text-[var(--gray-200)] text-[14px]">Base price</p>
                <p className="text-[var(--gray-200)] text-[14px]">
                  {basePrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[var(--gray-400)] text-[12px]">
                Additional
              </span>

              {/* List of additional services */}
              {additionalServices.length > 0 && (
                <div className="space-y-2 mb-3">
                  {additionalServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p className="text-[var(--gray-200)] text-[14px]">
                        {service.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-[var(--gray-200)] text-[14px]">
                          {service.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3">
                <label className="text-[var(--gray-400)] text-[12px]">
                  Total
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={callTotal}
                  onChange={(e) => setCallTotal(e.target.value)}
                  className="w-full text-[var(--gray-200)] text-[14px] bg-transparent border-b border-[var(--gray-500)] py-1 mt-2"
                />
                <div className="flex justify-between border-t border-[var(--gray-500)] pt-3 mt-3">
                  <span className="text-[var(--gray-200)] text-[14px] font-bold">
                    Total
                  </span>
                  <span className="text-[var(--gray-200)] text-[14px] font-bold">
                    {callTotal && Number(callTotal)
                      ? Number(callTotal).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : calculatedTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Div Callsdetails ends here. */}
    </div>
  );
}
