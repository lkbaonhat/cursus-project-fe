import { RootState } from "@/redux/store";

// Selector to get the counter value from the state
export const selectAuthState = (state: RootState) => state.auth;
export const selectAuthStateUsername = (state: RootState) => state.auth.username;
export const selectAuthStateBecomeInstructor = (state: RootState) => state.auth.becomeInstructor;