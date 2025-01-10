// hooks to manage user state

import { useQuery } from "@tanstack/react-query";
import classService from "../service/classService";

const useGettingClasses = () => {
  const fetchclasses= async () => {
    const response = await classService.get("get");
    if (response.status === "success") {
      return response.result;
    }
    return response;
  };

  const {
    data: classes,
    isLoading,
    isError,
    error,
    isSuccess
  } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchclasses,
  });
  return { classes, isLoading, isError, error, isSuccess };
};

export default useGettingClasses;
