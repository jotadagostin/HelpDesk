import adminMenuSvg from "../../assets/images/NavHeaderAdmin.svg";
import techniciansSvg from "../../assets/icons/icon/tecnicos.svg";
import clientSvg from "../../assets/icons/icon/clipboard-list.svg";
import serviceSvg from "../../assets/icons/icon/service.svg";
import avatarSvg from "../../assets/images/Avatar.svg";

export function Admin() {
  return (
    <div className="w-[] h-screen bg-[var(--gray-100)] flex">
      <div className="w-[200px] h-screen bg-[var(--gray-100)] mt-3">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav className="w-full  justify-center items-center">
          <ul className="">
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start">
              <img
                src={serviceSvg}
                alt="cliboard icon"
                className="w-[20px] h-[20px] "
              />
              <span className="text-[var(--gray-400)]">Calls</span>
            </li>
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start">
              <img
                src={techniciansSvg}
                alt="cliboard icon "
                className="w-[20px] h-[20px] color-[var(--gray-400)]"
              />
              <span className="text-[var(--gray-400)]">Technicians</span>
            </li>
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start">
              <img
                src={clientSvg}
                alt="cliboard icon "
                className="w-[20px] h-[20px]"
              />
              <span className="text-[var(--gray-400)]">Clients</span>
            </li>
            <li className="w-[168px] h-[44px] flex items-center gap-3 pl-5 justify-start">
              <img
                src={serviceSvg}
                alt="cliboard icon "
                className="w-[20px] h-[20px]"
              />
              <span className="text-[var(--gray-400)]">Services</span>
            </li>
          </ul>
        </nav>
        <div className="flex">
          <img src={avatarSvg} alt="" />
          <div>
            <span>User Admin</span>
            <p>user.adm.test.com</p>
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
