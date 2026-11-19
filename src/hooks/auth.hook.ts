import { adminLogin, adminLogout, getMe } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: adminLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: adminLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
