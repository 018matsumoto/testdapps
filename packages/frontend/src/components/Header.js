function Header({ contractAddress }) {
  return (
    <header className="flex flex-col items-center w-full max-w-2xl mb-12 opacity-70">
      <img src="./contract.png" className="w-32" alt="contract" />
      <p className="text-4xl w-full text-center font-mono mb-4">contract</p>
      <p className="text-xl w-full text-center font-mono">{contractAddress}</p>
    </header>
  );
}

export default Header;