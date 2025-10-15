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
import statusOpenSvg from "../../assets/icons/icon/TagStatus(open).svg";
import statusInProgresSvg from "../../assets/icons/icon/TagStatus(inprogress).svg";
import statusClosedSvg from "../../assets/icons/icon/TagStatus(closed).svg";
import buttonEditSvg from "../../assets/icons/icon/Button(Edit).svg";

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
              <a href="" className="flex items-center justify-center gap-3">
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

      {/* Div Calls starts here: */}
      <div className=" w-screen bg-[var(--gray-600)] border rounded-tl-[20px] mt-3 flex flex-col items-center">
        <h1 className="w-[90%] h-[44px]  font-bold text-[24px] text-[var(--blue-dark)] px-[48px]  py-[52px] ">
          Calls
        </h1>
        <div className="w-[90%]  px-[48px]  py-[52px]  flex items-center justify-center  ">
          <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full  ">
              <thead className="border border-gray-300 ">
                <tr className="text-[var(--gray-300)] text-[14px]">
                  <th className="p-[14px] text-left">Updated on</th>
                  <th className="p-[14px] text-left">Id</th>
                  <th className="p-[14px] text-left">Title and Service</th>
                  <th className="p-[14px] text-left">Total amount</th>
                  <th className="p-[14px] text-left">Client</th>
                  <th className="p-[14px] text-left">Technician</th>
                  <th className="p-[14px] text-left">Status</th>
                </tr>
              </thead>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr className="">
                  <td>12/04/25 15:50</td>
                  <td>00004</td>
                  <td>
                    <div className="flex flex-col">
                      <strong>Backup is not working</strong>
                      <small>Data recuparation</small>
                    </div>
                  </td>
                  <td>$ 200,00</td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Andre Costa</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <img src={statusOpenSvg} alt="" />
                      <button>
                        <img src={buttonEditSvg} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td>13/04/25 20:56</td>
                  <td>00003</td>
                  <td>
                    <div className="flex flex-col">
                      <strong>Slow net</strong>
                      <small>Net Instation</small>
                    </div>
                  </td>
                  <td>$ 170,00</td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Andre Costa</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <img src={statusOpenSvg} alt="" />
                      <button>
                        <img src={buttonEditSvg} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td>12/04/25 09:56</td>
                  <td>00004</td>
                  <td>
                    <div className="flex flex-col">
                      <strong>Pc does not turn on</strong>
                      <small>Hardware support</small>
                    </div>
                  </td>
                  <td>$ 200,00</td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Julia Maria</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Carlos Silva</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <img src={statusInProgresSvg} alt="" />
                      <button>
                        <img src={buttonEditSvg} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td>10/04/25 10:56</td>
                  <td>00005</td>
                  <td>
                    <div className="flex flex-col">
                      <strong>Instalation of Software</strong>
                      <small>Software support</small>
                    </div>
                  </td>
                  <td>$ 80,00</td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Julia Maria</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Ana Oliveira</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <img src={statusClosedSvg} alt="" />
                      <button>
                        <img src={buttonEditSvg} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody className="border border-gray-200 text-[var(--gray-100)]">
                <tr>
                  <td>11/04/25 10:56</td>
                  <td>00006</td>
                  <td>
                    <div className="flex flex-col">
                      <strong>
                        My phone does not connect with the computer
                      </strong>
                      <small>Software support</small>
                    </div>
                  </td>
                  <td>$ 80,00</td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Suzana Moura</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex ">
                      <img
                        src={avatarSvg}
                        alt=""
                        className="w-[20px] h-[20px]"
                      />
                      <small>Ana Oliveira</small>
                    </div>
                  </td>
                  <td>
                    <div className="flex">
                      <img src={statusClosedSvg} alt="" />
                      <button>
                        <img src={buttonEditSvg} alt="" />
                      </button>
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
