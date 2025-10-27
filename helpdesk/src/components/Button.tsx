import plusSvg from "../assets/icons/icon/plus.svg";

interface ButtonProps {
  onClick?: () => void;
}

export function Button({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex gap-1 bg-black text-[var(--gray-600)] py-[11px] px-[16px] rounded-md "
    >
      <img src={plusSvg} alt="white plus icon" />
      <span className="hidden sm:inline">New</span>
    </button>
  );
}
