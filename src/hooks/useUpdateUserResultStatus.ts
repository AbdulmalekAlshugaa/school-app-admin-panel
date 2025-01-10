import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../service/usersService";

const useUpdateUserResultStatus = () => {
  const queryClient = useQueryClient();
  const updateUserResult = async (data: any) => {
    const updateResultRes = await usersService.put("updateResult", data);
    if (updateResultRes.status === "success") {
      return updateResultRes.result;
    }
    return updateResultRes;
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
    mutationFn: updateUserResult,
    onSuccess: () => {
      console.log("User update successfully");
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

export default useUpdateUserResultStatus;
