function Layout({ children}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-full h-screen bg-slate-100">
      {children}
    </div>
  );
}

export default Layout;