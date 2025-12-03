import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import statusInProgress from "../../assets/icons/icon/TagStatus(inprogress).svg";
import statusOpen from "../../assets/icons/icon/TagStatus(open).svg";
import statusClosed from "../../assets/icons/icon/TagStatus(closed).svg";
import penEdit from "../../assets/icons/icon/pen-line.svg";
import circleClose from "../../assets/icons/icon/white-circle.svg";
import userWhite from "../../assets/icons/icon/user-white.svg";
import exitRed from "../../assets/icons/icon/log-out-red.svg";
import buttonXSvg from "../../assets/icons/icon/x.svg";
import tecProfileAvatar from "../../assets/icons/icon/tecProfileAvatar.svg";
import uploadSvg from "../../assets/icons/icon/upload.svg";
import trashSvg from "../../assets/icons/icon/trashRed.svg";

export function Technician() {
  const [isHovered, setIsHovered] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [calls, setCalls] = useState<any[]>([]);
  const navigate = useNavigate();
  const popupRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(() =>
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/calls", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCalls(data);
    } catch (err) {
      console.error("Error fetching calls:", err);
    }
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getStatusIcon = (status?: string) => {
    if (!status) return statusOpen;
    if (status === "closed") return statusClosed;
    if (status === "in-progress" || status === "inprogress")
      return statusInProgress;
    return statusOpen;
  };

  const updateCallStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/calls/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await res.json();
      fetchCalls();
    } catch (e) {
      console.error(e);
      alert("Failed to update status");
    }
  };

  const openProfileModal = () => {
    setProfileName(user.name || "");
    setProfileEmail(user.email || "");
    setCurrentPassword("");
    setNewPassword("");
    setProfileImage(localStorage.getItem("profileImage") || null);
    setIsUserPopupOpen(false);
    setIsProfileModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
  };

  const saveProfile = async () => {
    const updatedUser = { ...user, name: profileName, email: profileEmail };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsProfileModalOpen(false);
    alert("Profile updated successfully!");
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
    if (isUserPopupOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserPopupOpen]);

  // group arrays
  const openCalls = calls.filter((c) => c.status === "open");
  const inProgressCalls = calls.filter(
    (c) => c.status === "in-progress" || c.status === "inprogress"
  );
  const closedCalls = calls.filter((c) => c.status === "closed");

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex flex-col md:flex-row ">
      {/* Sidebar */}
      <div className="hidden md:flex w-[200px] h-screen bg-[var(--gray-100)] flex-col">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full pt-5">
          <ul>
            <li
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-[168px] h-[44px] flex items-center gap-3 pl-5 hover:bg-[var(--blue-dark)] rounded-md transition-all"
            >
              <a
                onClick={() => navigate("/technician")}
                className="flex items-center gap-3"
              >
                <img
                  src={isHovered ? callsWhiteSvg : callsSvg}
                  alt="calls"
                  className="w-[20px] h-[20px]"
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

        <div className="h-[83%] flex justify-center items-end">
          <div
            className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4 cursor-pointer"
            onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
          >
            <div className="w-[32px] h-[32px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{getInitials(user.name)}</span>
              )}
            </div>
            <div>
              <span className="text-[var(--gray-600)] text-[14px]">
                {user.name}
              </span>
              <p className="text-[var(--gray-400)] text-[12px]">{user.email}</p>
            </div>
          </div>

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
                <img src={userWhite} alt="" /> Perfil
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  navigate("/");
                }}
                className="px-4 py-2 text-left text-[var(--feedback-danger)] hover:bg-[var(--gray-200)] flex gap-2"
              >
                <img src={exitRed} alt="" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content - Calls grouped by status */}
      <div className="w-full bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col px-4 py-4 sm:px-26 overflow-y-auto">
        <div>
          <h1 className="w-full max-w-screen-lg font-bold text-[20px] sm:text-[24px] text-[var(--blue-dark)] py-6">
            My calls
          </h1>
        </div>

        <div className="w-full">
          {/* In-Progress */}
          {inProgressCalls.length > 0 && (
            <section className="mb-8">
              <div className="pb-5">
                <img src={statusInProgress} alt="in-progress" />
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                {inProgressCalls.map((call) => (
                  <article
                    key={call.id}
                    className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]"
                  >
                    <div className="p-3 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[var(--gray-400)] font-bold text-[12px]">
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
                              alt="edit"
                              className="w-[14px] h-[14px]"
                            />
                          </button>
                          <button
                            onClick={() => updateCallStatus(call.id, "closed")}
                            className="bg-black text-[var(--gray-600)] flex items-center p-1 px-2 gap-2 rounded-md"
                          >
                            <img src={circleClose} alt="" /> Close
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[var(--gray-100)] font-bold text-[16px]">
                          {call.title}
                        </h3>
                        <p className="text-[var(--gray-100)] text-[12px]">
                          {call.category}
                        </p>
                        <div className="flex border-b border-b-[var(--gray-500)] py-3 justify-between">
                          <span>
                            {new Date(call.updatedAt).toLocaleDateString()}{" "}
                            {new Date(call.updatedAt).toLocaleTimeString()}
                          </span>
                          <span>${call.total || "0,00"}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2">
                            <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                              {getInitials(call.user?.name || "")}
                            </div>
                            <span>{call.user?.name || "Unknown"}</span>
                          </div>
                          <img src={getStatusIcon(call.status)} alt="status" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Open */}
          {openCalls.length > 0 && (
            <section className="mb-8">
              <div className="pb-5">
                <img src={statusOpen} alt="open" />
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                {openCalls.map((call) => (
                  <article
                    key={call.id}
                    className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]"
                  >
                    <div className="p-3 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[var(--gray-400)] font-bold text-[12px]">
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
                              alt="edit"
                              className="w-[14px] h-[14px]"
                            />
                          </button>
                          <button
                            onClick={() =>
                              updateCallStatus(call.id, "in-progress")
                            }
                            className="bg-[var(--gray-500)] text-[var(--gray-600)] flex items-center p-1 px-2 gap-2 rounded-md"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => updateCallStatus(call.id, "closed")}
                            className="bg-black text-[var(--gray-600)] flex items-center p-1 px-2 gap-2 rounded-md"
                          >
                            <img src={circleClose} alt="" /> Close
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[var(--gray-100)] font-bold text-[16px]">
                          {call.title}
                        </h3>
                        <p className="text-[var(--gray-100)] text-[12px]">
                          {call.category}
                        </p>
                        <div className="flex border-b border-b-[var(--gray-500)] py-3 justify-between">
                          <span>
                            {new Date(call.updatedAt).toLocaleDateString()}{" "}
                            {new Date(call.updatedAt).toLocaleTimeString()}
                          </span>
                          <span>${call.total || "0,00"}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2">
                            <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                              {getInitials(call.user?.name || "")}
                            </div>
                            <span>{call.user?.name || "Unknown"}</span>
                          </div>
                          <img src={getStatusIcon(call.status)} alt="status" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Closed */}
          {closedCalls.length > 0 && (
            <section className="mb-8">
              <div className="pb-5">
                <img src={statusClosed} alt="closed" />
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
                {closedCalls.map((call) => (
                  <article
                    key={call.id}
                    className="border w-[346px] h-[210px] rounded-md border-[var(--gray-500)]"
                  >
                    <div className="p-3 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[var(--gray-400)] font-bold text-[12px]">
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
                              alt="edit"
                              className="w-[14px] h-[14px]"
                            />
                          </button>
                          <button
                            onClick={() => updateCallStatus(call.id, "open")}
                            className="bg-[var(--gray-500)] text-[var(--gray-600)] flex items-center p-1 px-2 gap-2 rounded-md"
                          >
                            Reopen
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[var(--gray-100)] font-bold text-[16px]">
                          {call.title}
                        </h3>
                        <p className="text-[var(--gray-100)] text-[12px]">
                          {call.category}
                        </p>
                        <div className="flex border-b border-b-[var(--gray-500)] py-3 justify-between">
                          <span>
                            {new Date(call.updatedAt).toLocaleDateString()}{" "}
                            {new Date(call.updatedAt).toLocaleTimeString()}
                          </span>
                          <span>${call.total || "0,00"}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2">
                            <div className="w-[20px] h-[20px] rounded-full bg-[var(--blue-dark)] flex items-center justify-center text-white text-[11px]">
                              {getInitials(call.user?.name || "")}
                            </div>
                            <span>{call.user?.name || "Unknown"}</span>
                          </div>
                          <img src={getStatusIcon(call.status)} alt="status" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Profile modal */}
      {isProfileModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[440px] bg-[var(--gray-600)] rounded-md shadow-xl border border-[var(--gray-400)] z-50 p-4">
            <div className="flex items-center justify-between border-b border-[var(--gray-500)] pb-4">
              <span className="font-bold">Perfil</span>
              <img
                src={buttonXSvg}
                alt=""
                className="w-[18px] h-[18px] cursor-pointer"
                onClick={() => setIsProfileModalOpen(false)}
              />
            </div>
            <div className="mt-4">
              <div className="flex gap-3 items-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-[64px] h-[64px] rounded-full object-cover"
                  />
                ) : (
                  <img src={tecProfileAvatar} alt="" />
                )}

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="profileImageInput"
                    className="flex items-center bg-[var(--gray-500)] p-1 rounded-md gap-1 cursor-pointer"
                  >
                    <img src={uploadSvg} alt="" className="w-[12px] h-[12px]" />
                    <span className="text-xs">New Image</span>
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={deleteImage}
                    className="bg-[var(--gray-500)] p-1 rounded-md"
                  >
                    <img src={trashSvg} alt="" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-[var(--gray-300)] text-xs">NAME</label>
                <input
                  type="text"
                  placeholder="Carlos Silva"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-3 mt-1 bg-transparent"
                />
                <label className="text-[var(--gray-300)] text-xs mt-3 block">
                  E-MAIL
                </label>
                <input
                  type="email"
                  placeholder="carlos.silva@test.com"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full border-b border-[var(--gray-500)] py-3 mt-1 bg-transparent"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={saveProfile}
                  className="bg-[var(--gray-200)] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
