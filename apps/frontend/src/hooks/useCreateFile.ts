
       import { useMutation } from "@tanstack/react-query";
       import { useSession } from 'next-auth/react';
       import { FileCreateInput, IFileEntity } from '@transtrackdashboard/core';
       import {UseCases} from "../usecases";

        /**
          * Hook to create a file.
          * 
          * @returns {UseMutationResult<IFileEntity | null, Error, FileCreateInput>}
          * 
          * @example
          * const {mutate, isPending, isError, mutateAsync} = useCreateFile();
          * 
          * @param {FileCreateInput} params - The file creation parameters.
        */

        export function useCreateFile() {
          const {data: session} = useSession();

          return useMutation<IFileEntity | null, Error, FileCreateInput>({
            mutationKey: ['CREATE_FILE'],
            mutationFn: async (params) =>
              UseCases.File.createFile({
                variables: params,
                token: session?.token?.idToken,
              }),
          }); 
        }
    