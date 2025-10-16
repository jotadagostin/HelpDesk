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
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import buttonEditSvg from "../../assets/icons/icon/Button(Edit).svg";

export function Tec() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

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
              <a
                href=""
                className="flex items-center justify-center gap-3"
                onClick={() => navigate("/services")}
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
          <div className="flex items-center gap-2 border-t border-t-[var(--gray-300)] py-5 px-4">
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
        </div>
      </div>

      {/* Div Tecs starts here: */}
      <div className=" w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center">
        <div className="w-[90%] flex items-center gap-3 ">
          <h1 className="w-[90%] h-[44px]  font-bold text-[24px] text-[var(--blue-dark)] px-[48px]  py-[52px] ">
            Technicians
          </h1>
          <Button />
        </div>
        <div className="w-[90%]  px-[48px]  py-[52px]  flex items-center justify-center  ">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full ">
              <thead className="border border-gray-300 ">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left">Name</th>
                  <th className="p-[14px] text-left">E-mail</th>
                  <th className="p-[14px] text-left">Available</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Carlos Silva</small>
                    </div>
                  </td>
                  <td>carlos.silve@test.com</td>
                  <td className="px-2 py-4">
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          08:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          09:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          10:00
                        </div>
                      </div>
                      <div className="">
                        <img src={buttonEditSvg} alt="" className="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Ana Oliveria</small>
                    </div>
                  </td>
                  <td>ana.oliveira@test.com</td>
                  <td className="px-2 py-4">
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          08:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          15:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          16:00
                        </div>
                      </div>
                      <div className="">
                        <img src={buttonEditSvg} alt="" className="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Cintia lucia</small>
                    </div>
                  </td>
                  <td>cintia.lucia@test.com</td>
                  <td className="px-2 py-4">
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          08:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          11:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          18:00
                        </div>
                      </div>
                      <div className="">
                        <img src={buttonEditSvg} alt="" className="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)] ">
                <tr className="">
                  <td className="px-2 py-4">
                    <div className="flex gap-2 ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small className="font-bold">Marcos Alves</small>
                    </div>
                  </td>
                  <td>marcos.alves@test.com</td>
                  <td className="px-2 py-4">
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          08:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          09:00
                        </div>
                        <div className="text-[12px] flex items-center text-[var(--gray-400)] border  rounded-4xl px-3 py-1 text-sm font-normal">
                          10:00
                        </div>
                      </div>
                      <div className="">
                        <img src={buttonEditSvg} alt="" className="" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
