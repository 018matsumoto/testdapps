function WalletForm({ isConnect, address, handleClickConnect }) {
  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex items-center justify-between space-x-4">
      <div>{isConnect ? "🦊" : "💤"}</div>
      <div className="text-ellipsis overflow-hidden max-w-full">
        {address ?? "..."}
      </div>
      <div>
        <button
          className="bg-slate-400 text-white rounded-lg shadow-lg w-32 p-2 hover:bg-sky-400 duration-100"
          onClick={handleClickConnect}
        >
          {isConnect ? "Disconnect" : "Connect ?"}
        </button>
      </div>
    </div>
  );
}

export default WalletForm;
