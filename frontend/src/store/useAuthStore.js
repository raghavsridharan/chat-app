import {create} from 'zustand'
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser : null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoggingIn : false,
    isUpdatingProfile : false,

    checkAuth: async () => {
    try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data });
    } catch (error) {
        if (error.response?.status === 401) {
        set({ authUser: null });
        } else {
        console.error("Error checking authentication:", error);
        }
    } finally {
        set({ isCheckingAuth: false });
    }
    },
    
    signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signed up successfully!");
      return true;
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error(
        "Error signing up: " +
          (error.response?.data?.message || error.message || "An error occurred")
      );
      return false;
    } finally {
      set({ isSigningUp: false });
    }

    },

    logout : async () => { 
        try{
            // ensure credentials are sent by axiosInstance (withCredentials:true)
            const res = await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
            return true;
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(
                "Error logging out: " + (error.response?.data?.message || error.message || "An error occurred")
            );
            return false;
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
            return true;
        } catch (error) {
            console.error("Login error:", error);
            toast.error(
                "Error logging in: " + (error.response?.data?.message || error.message || "An error occurred")
            );
            return false;
        } finally {
            set({ isLoggingIn: false });
        }

    },
    updateProfile : async (data) => {
        set({isUpdatingProfile: true });
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
            return true;

        } catch (error) {
            console.error("Update profile error:", error);
            toast.error(
                "Error updating profile: " + (error.response?.data?.message || error.message || "An error occurred")
            );
            return false;
        }
        finally {
            set({ isUpdatingProfile: false });
        }

    }


  
}));
