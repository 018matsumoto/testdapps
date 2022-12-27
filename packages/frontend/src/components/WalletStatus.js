const WalletStatus = ({ isConnect, balance }) => {
  const Sleep = () => (
    <div className="basis-full text-center text-4xl">
      {balance ? "😲" : "😪"}
    </div>
  )

  const Status = () => (
    <>
      <div className="text-slate-500">balance</div>
      <div className="text-xl font-medium text-black">{balance}</div>
    </>
  )

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex items-center justify-between space-x-4">
      {isConnect ? <Status /> : <Sleep />}
    </div>
  )
}

export default WalletStatus