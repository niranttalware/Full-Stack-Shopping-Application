// src/store/useAuthStore.ts
import { create } from "zustand";
import toast from "react-hot-toast";

interface AuthUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  city?: string;
  role?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  signup: (user: AuthUser) => Promise<boolean>;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  loadUser: () => void;
}

const API_URL = "${process.env.REACT_APP_API_URL}/api/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  // ✅ Signup — calls backend
  signup: async (user) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          city: user.city,
        }),
      });

      if (res.ok) {
        toast.success("✅ Signup successful! Please login.", {
          position: "top-center",
          style: { marginTop: "60px" },
        });
        return true;
      } else {
        const data = await res.json();
        toast.error(data.message || "Signup failed", {
          position: "top-center",
          style: { marginTop: "60px" },
        });
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Server error during signup", {
        position: "top-center",
        style: { marginTop: "60px" },
      });
      return false;
    }
  },

  // ✅ Login — calls backend
  login: async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Invalid credentials", {
          position: "top-center",
          style: { marginTop: "50px" },
        });
        return false;
      }

      const data = await res.json();

      // Save token + user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token });

      toast.success("✅ Logged in successfully!", {
        position: "top-center",
        style: { marginTop: "90px" },
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error during login", {
        position: "top-center",
        style: { marginTop: "90px" },
      });
      return false;
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // ✅ Load user
  loadUser: () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      set({ user: JSON.parse(storedUser), token, loading: false });
    } else {
      set({ loading: false });
    }
  },
}));
