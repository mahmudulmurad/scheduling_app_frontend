// AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getRequest } from "service";
import { profile_url } from "api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  isActive: string;
  myEmployees: User[];
}

export const defaulUser: User = {
  _id: "",
  email: "",
  gender: "",
  isActive: "",
  name: "",
  phone: "",
  role: "",
  myEmployees: [],
};

interface AuthContextValue {
  token: string | null;
  user: User;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  refetchProfile: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue>({
  token: null,
  user: defaulUser,
  logout: () => {},
  setUser: () => {},
  refetchProfile: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(defaulUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const response = await getRequest<User>(profile_url);
          setUser(response.payload);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const refetchProfile = async () => {
    try {
      const response = await getRequest<User>(profile_url);
      setUser(response.payload);
      toast.success("Profile successfully refetched");
    } catch (error) {
      toast.error("Error refetching profile");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout successfull");
    navigate("/auth/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ token, user, logout, setUser, refetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
