import { useQuery } from "@tanstack/react-query";
import subjectService from "../service/subjectService";

const useGettingSubjectsResult = () => {
  const gettingSubjects = async () => {
    const response = await subjectService.get("get")
    if (response.status === "success") {
      return response.result;
    }
    throw new Error(response.message || "Failed to fetch user details");
  };

  const {
    data: subjects,
    isLoading,
    isError,
    error,
    isSuccess, status
  } = useQuery({
    queryKey: ["subjects"], 
    queryFn: gettingSubjects,
   
  });

  return { subjects, isLoading, isError, error , isSuccess, status};
};

export default useGettingSubjectsResult;
