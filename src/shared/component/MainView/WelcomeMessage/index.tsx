export default function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center text-center justify-center">
      <h1 className="text-[clamp(48px,2.5vw,64px)] font-bold mb-2 text-black whitespace-nowrap">
        00님 반가워요!
      </h1>
      <p className="text-[clamp(16px,2.5vw,24px)] text-zinc-500 whitespace-nowrap">
        1D 12H 3M 만에 들어오셨네요!
      </p>
    </div>
  );
}
