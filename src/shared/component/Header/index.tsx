import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white border-b">
      <div className="w-full h-[120px] pl-[30px] pr-[30px] flex items-center justify-between ">
        <Link href="/" className="flex items-center">
          <Image
            className="dark:invert"
            src="/FocuSSUlogo.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Link>

        <nav className="flex items-center space-x-10">
          <Link
            href="/studylist"
            className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            새로운 스타일 찾기
          </Link>
          <Link
            href="/mypage"
            className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            마이페이지
          </Link>
          <button
            type="button"
            className="px-4 py-2 text-lg font-medium text-white bg-black rounded hover:bg-gray-800 transition-colors"
          >
            Log-Out
          </button>
        </nav>
      </div>
    </header>
  );
}
