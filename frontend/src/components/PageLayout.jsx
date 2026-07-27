const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
      {children}
    </div>
  );
};

export default PageLayout;