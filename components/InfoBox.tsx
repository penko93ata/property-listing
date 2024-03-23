import Link from "next/link";
import { twMerge } from "tailwind-merge";

type InfoBoxProps = {
  heading: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    link: string;
    text: React.ReactNode;
    backgroundColor: string;
  };
  children: React.ReactNode;
};

export default function InfoBox({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: InfoBoxProps) {
  return (
    <div className={twMerge(backgroundColor, "p-6 rounded-lg shadow-md")}>
      <h2 className={twMerge(textColor, "text-2xl font-bold")}>{heading}</h2>
      <p className={twMerge(textColor, "mt-2 mb-4")}>{children}</p>
      <Link
        href={buttonInfo.link}
        className={twMerge(buttonInfo.backgroundColor, "inline-block text-white rounded-lg px-4 py-2 hover:opacity-80")}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
}
