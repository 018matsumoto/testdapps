function Header({ contractAddress }) {
  return (
    <header className="flex flex-col items-center w-full max-w-2xl my-12 opacity-70">
      <img src="./contract.png" className="w-32 mb-2" alt="contract" />
      <h1 className="text-4xl w-full text-center font-mono mb-4">contract</h1>
      <p className="text-xl w-full text-center font-mono text-ellipsis overflow-hidden">{contractAddress}</p>
    </header>
  );
}

export default Header;