import adminMenuSvg from "../assets/images/NavHeaderAdmin.svg";
import clipBoardSvg from "../assets/icons/icon/clipboard-list.svg";
import techniciansSvg from "../assets/icons/icon/tecnicos.svg";
import clientSvg from "../assets/icons/icon/briefcase-business.svg";
import serviceSvg from "../assets/icons/icon/service.svg";
import avatarSvg from "../assets/images/Avatar.svg";

export function Admin() {
  return (
    <div className="w-[] h-screen bg-[var(--gray-100)] flex">
      <div className="w-[200px] h-screen bg-[var(--gray-100)] mt-3">
        <img src={adminMenuSvg} alt="HelpDesk logo" />
        <nav>
          <ul>
            <li className="flex">
              <img src={clipBoardSvg} alt="cliboard icon" />
              <span>Calls</span>
            </li>
            <li className="flex">
              <img src={techniciansSvg} alt="cliboard icon" />
              <span>Technicians</span>
            </li>
            <li className="flex">
              <img src={clientSvg} alt="cliboard icon" />
              <span>Clients</span>
            </li>
            <li className="flex">
              <img src={serviceSvg} alt="cliboard icon" />
              <span>Services</span>
            </li>
          </ul>
        </nav>
        <div>
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
