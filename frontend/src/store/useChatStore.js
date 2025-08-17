import {create} from 'zustand'
import { axiosInstance } from "../lib/axios";
import { toast } from 'react-hot-toast';

export const useChatStore = create((set) => ({
    messages: [],
    users :[],
    selectedUser: null,
    isMessagesLoading: false,
    isUsersLoading: false,

    getUsers : async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/user");
            set({ users: res.data });
        } catch (error) {
            toast.error("Error fetching users: " + (error.response?.data?.message || "An error occurred"));
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages : async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error("Error fetching users: " + (error.response?.data?.message || "An error occurred"));
        } finally {
            set({ isMessagesLoading: false });
        }
    }

}));
