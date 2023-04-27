function Notify({ message }) {
  return (
    <>
      {message && (
        <div className="absolute top-0">
          <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="text-xl text-center mr-4">✖</div>
            <div className="text-xl w-full font-mono">{message}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notify;
