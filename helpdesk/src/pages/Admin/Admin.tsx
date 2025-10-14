import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import callsSvg from "../../assets/icons/icon/clipboard-list.svg";
import callsWhiteSvg from "../../assets/icons/icon/clipboard-list-white.svg";
import techniciansSvg from "../../assets/icons/icon/tecnicos.svg";
import clientsSvg from "../../assets/icons/icon/briefcase-business.svg";
import serviceSvg from "../../assets/icons/icon/service.svg";
import avatarSvg from "../../assets/images/Avatar.svg";
import { useState } from "react";

export function Admin() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-screen bg-[var(--gray-100)] flex ">
      <div className="w-[200px] h-screen bg-[var(--gray-100)]   flex flex-col">
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
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all">
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={techniciansSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px] color-[var(--gray-400)] transition-all hover:pink group-hover:invert"
                />
                <span className="text-[var(--gray-400)]">Technicians</span>
              </a>
            </li>
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all">
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={clientsSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px]"
                />
                <span className="text-[var(--gray-400)]">Clients</span>
              </a>
            </li>
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start  ml-2 hover:bg-[var(--blue-dark)] rounded-md transition-all">
              <a href="" className="flex items-center justify-center gap-3">
                <img
                  src={serviceSvg}
                  alt="cliboard icon "
                  className="w-[20px] h-[20px]"
                />
                <span className="text-[var(--gray-400)]">Services</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="h-[70%]  flex justify-center items-end ">
          <div className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4">
            <img src={avatarSvg} alt="" />
            <div className="">
              <span>User Admin</span>
              <p>user.adm@test.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3">
        <h1>Calls</h1>
        <div>table</div>
      </div>
    </div>
  );
}
