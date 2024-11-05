
        import { useMutation } from "@tanstack/react-query";
        import { useSession } from 'next-auth/react';
        import {UseCases} from "../usecases";

        /**
          * Hook to upload a file to the storage.
          * 
          * @returns {UseMutationResult<boolean, Error, {
          *  key: string;
          * policy: string;
          * signature: string;
          * path: string;
          * file: File;
          * }>}
          * 
          * @example
          * const {mutate, isPending, isError, mutateAsync} = useUploadFileToStorage();
          * 
          * @param {{
          * key: string;
          * policy: string;
          * signature: string;
          * path: string;
          * file: File;
          * }} params - The file upload parameters.
        */

        export function useUploadFileToStorage() {
          const {data: session} = useSession();

          return useMutation<
            { fileId: string } | null,
            Error,
            {
              key: string;
              policy: string;
              signature: string;
              path: string;
              file: File;
            }
          >({
            mutationKey: ['UPLOAD_FILE_TO_STORAGE'],
            mutationFn: async (params) =>
              UseCases.File.uploadFileToStorage({
                variables: params,
                token: session?.token?.idToken,
              }),
          });
        }
    