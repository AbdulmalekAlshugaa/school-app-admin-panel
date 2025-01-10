import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../service/authService";
type loginRequest = {
  username:string, 
  password:string
}
const useLogin = () => {
  const queryClient = useQueryClient();
  const loginUserResult = async (data: loginRequest) => {
    const response = await authService.post("/login", data);
    if (response.status === "success") {
      return response;
    }
    return response;
  };

  const {
    data,
    isPending,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: loginUserResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    data,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    mutate,
  };
};

export default useLogin;
