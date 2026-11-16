import apiClient from "@/lib/apiClient";
import {
  LoginPayload,
  VerifyAccountPayload,
} from "@/types";

export function adminLogin(payload: LoginPayload) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient("/auth/verify-otp", { method: "POST", body: payload });
}

export function adminLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/auth/me");
}

