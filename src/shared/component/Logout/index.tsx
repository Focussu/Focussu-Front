export default function logOut() {
  const LogOutFn = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={() => LogOutFn()}
        type="button"
        className="px-4 py-2 text-lg font-medium text-white bg-black rounded hover:bg-gray-800 transition-colors"
      >
        Log-Out
      </button>
    </>
  );
}
