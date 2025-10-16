import plusSvg from "../assets/icons/icon/plus.svg";

export function Button() {
  return (
    <button className="flex gap-1 bg-black text-[var(--gray-600)] py-[11px] px-[16px] rounded-md ">
      <img src={plusSvg} alt="white plus icon" />
      New
    </button>
  );
}
