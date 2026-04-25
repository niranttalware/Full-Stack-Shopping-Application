import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shopping-icon-1.webp";
import FacebookIcon from "../assets/svg/FacebookIcon";
import InstagramIcon from "../assets/svg/InstagramIcon";
import TwitterIcon from "../assets/svg/TwitterIcon";
import VisaIcon from "../assets/svg/VisaIcon";
import MasterCardIcon from "../assets/svg/MasterCardIcon";
import UpiIcon from "../assets/svg/UpiIcon";

/* ------------ Footer Component ------------ */
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topCategories = [
    { name: "Electronics", to: "/main/Electronics" },
    { name: "MensWear", to: "/main/MensWear" },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError(null);
    setSent(true);
    setEmail("");

    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="mt-12 bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-10 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Brand */}
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain drop-shadow-md mt-1"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">MyShop</h3>
              <p className="text-sm text-gray-300">
                Quality products. Trusted delivery.
              </p>
            </div>
          </Link>

          <p className="mt-6 text-gray-400 text-sm">
            Email:{" "}
            <a
              href="mailto:support@myshop.com"
              className="hover:underline text-indigo-300"
            >
              support@myshop.com
            </a>
          </p>

          {/* Social */}
          <div className="flex gap-4 mt-4">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
          </div>
        </div>

        {/* Links */}
        <nav className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              {topCategories.map((c) => (
                <li key={c.name}>
                  <Link to={c.to} className="hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>
                <Link to="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:underline">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:underline">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Policies</h4>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Newsletter + Payments */}
        <div className="md:col-span-3">
          <h4 className="font-semibold mb-3">Stay in the loop</h4>

          <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              placeholder="you@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-gray-900"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Subscribe
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {sent && <p className="text-sm text-green-400">Subscribed!</p>}
          </form>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-gray-300 mb-1">
              We accept
            </h5>

            <div className="flex items-center gap-3">
              <VisaIcon />
              <MasterCardIcon />
              <UpiIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 py-4 text-center mt-[-30px]">
        © {new Date().getFullYear()} MyShop — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
