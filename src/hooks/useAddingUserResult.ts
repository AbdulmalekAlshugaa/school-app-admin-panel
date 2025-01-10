import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../service/usersService";

const useAddingUserResult = () => {
  const queryClient = useQueryClient();
  const addingUserResult = async (data: any) => {
    const response = await usersService.post("/addResult", data);
    if (response.status === "success") {
      return response.result;
    }
    return response;
  };

  const {
    data: addingResult,
    isPending,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: addingUserResult,
    onSuccess: () => {
      console.log("User added successfully");
      queryClient.invalidateQueries({ queryKey: ["userResult"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    addingResult,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
    isSuccess,
    mutate,
  };
};

export default useAddingUserResult;
