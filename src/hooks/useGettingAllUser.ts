// hooks to manage user state

import { useQuery } from "@tanstack/react-query";
import usersService from "../service/usersService";

const useGettingAllUser = () => {
  const fetchUsers = async () => {
    const response = await usersService.getAll("/getAll");
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
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return { users, isLoading, isError, error };
};

export default useGettingAllUser;