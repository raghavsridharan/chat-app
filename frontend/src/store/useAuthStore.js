import {create} from 'zustand'
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser : null,
    isCheckingAuth:true,
    isLoggingIn : false,
    isUpdatingProfile : false,

    checkAuth : async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser : res.data})
        } catch (error) {
            console.error("Error checking authentication:", error);
        }
        finally { 
            set({isCheckingAuth : false})
        }

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
  },
}));
