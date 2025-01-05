import { useMutation, useQueryClient } from "@tanstack/react-query";
import subjectService from "../service/subjectService";

const useAddingSubject = () => {
  const queryClient = useQueryClient();
  const addingSubjectResult = async (data: any) => {
    const response = await subjectService.post("/create", data);
    if (response.status === "success") {
      return response.result;
    }
    return response;
  };

  const {
    data: addingSubject,
    isPending,
    error,
    isError,
    isIdle,
    isPaused,
    isSuccess:isSuccessAdding,
    mutate,
  } = useMutation({
    mutationFn: addingSubjectResult,
    onSuccess: () => {
      console.log("subjects added successfully");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    addingSubject,
    error,
    isError,
    isIdle,
    isPending,
    isPaused,
  isSuccessAdding,
    mutate,
  };
};

export default useAddingSubject;
