import { useQuery } from "@tanstack/react-query";
import usersService from "../service/usersService";

const useGettingUserResult = (userId: string) => {
  const gettingUserDetails = async ({ queryKey }: { queryKey: [string, string] }) => {
    const [, id] = queryKey; // Extract userId from queryKey
    const response = await usersService.get(id);
    if (response.status === "success") {
      return response.result;
    }
    throw new Error(response.message || "Failed to fetch user details");
  };

  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess, status

  } = useQuery({
    queryKey: ["userResult", userId], // Include userId in the queryKey
    queryFn: gettingUserDetails,
    enabled: !!userId, // Ensures query only runs if userId is provided
  });

  return { user, isLoading, isError, error , isSuccess, status};
};

export default useGettingUserResult;
