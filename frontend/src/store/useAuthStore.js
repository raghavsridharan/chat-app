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

<<<<<<< HEAD
    },
    
    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
              const res = await axiosInstance.post("/auth/signup", data);
              set({ authUser: res.data });
              toast.success("Signed up successfully!");
        } catch (error) {
              toast.error("Error signing up: " +(error.response?.data?.message || "An error occurred")
          );
        } finally {
          set({ isSigningUp: false });
        }
=======
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
>>>>>>> 68fc96f (fixed create acc bug)
  },
}));
