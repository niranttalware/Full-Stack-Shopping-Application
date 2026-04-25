import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

const FooterPageLayout = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 animate-fadeIn">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto flex items-center gap-2 text-gray-600 mb-4">
        <Home size={18} />
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-800">{title}</span>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mb-6 border border-gray-200 flex items-center gap-3">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full shadow">
          <Icon size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 border border-gray-200 space-y-4">
        {children}
      </div>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>
    </div>
  );
};

export default FooterPageLayout;
