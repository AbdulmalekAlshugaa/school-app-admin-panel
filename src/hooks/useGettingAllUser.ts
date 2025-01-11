// hooks to manage user state

import { useQuery } from "@tanstack/react-query";
import usersService from "../service/usersService";

const useGettingAllUser = () => {
  const fetchUsers = async () => {
    const response = await usersService.getAll("/getAll");
    console.log("response", response);
    if (response.status === "success") {
      return response.result;
    }
    return response;
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return { users, isLoading, isError, error, isSuccess };
};

export default useGettingAllUser;
