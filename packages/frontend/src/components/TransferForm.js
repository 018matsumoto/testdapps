function TransferForm({ isConnect, address, handleClickTransfer }) {
  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center justify-between space-x-4">
      <div>
        <input className="" />
      </div>
      <div>
        <button
          className="bg-slate-400 text-white rounded-lg shadow-lg w-32 p-2 hover:bg-sky-400 duration-100"
          onClick={handleClickTransfer}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default TransferForm;
