import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export default function UseShowToast() {
  const toast = useToast();

  const showToast = useCallback(
    (
      title: string,
      description: any,
      status: any
    ) => {
      toast({
        title,
        description,
        status,
        duration: 2000,
        isClosable: true,
      });
    },
    [toast]
  );
  return showToast;
}
