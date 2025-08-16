import {create} from 'zustand'
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser : null,
    isCheckingAuth:true,
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
    } catch (error) {
      toast.error(
        "Error signing up: " +
          (error.response?.data?.message || "An error occurred")
      );
    } finally {
      set({ isSigningUp: false });
    }

    },

    logout : async (data) => { 
        try{
            await axiosInstance.post("/auth/logout", data);
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(
                "Error logging out: " + (error.response?.data?.message || "An error occurred")
            );
        }
    },

    login: async (data) => {

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({userAuth : res.data });
            toast.success("Logged in successfully!")}
        catch (error) {
            toast.error(
                "Error logging in: " + (error.response?.data?.message || "An error occurred")
            );
        }

    },
    updateProfile : async (data) => {
        set({isUpdatingProfile: true });
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");

        } catch (error) {
            toast.error(
                "Error updating profile: " + (error.response?.data?.message || "An error occurred")
            );
        }
        finally {
            set({ isUpdatingProfile: false });
        }

    }


  
}));
