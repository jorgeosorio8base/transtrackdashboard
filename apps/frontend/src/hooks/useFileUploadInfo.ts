
       import { useQuery } from "@tanstack/react-query";
       import { useSession } from 'next-auth/react';
       import {UseCases} from "../usecases";
       import { FileUploadInfoResponse } from '@transtrackdashboard/core';

        /**
          * Hook to get the file upload information.
          * 
          * @returns {UseQueryResult<FileUploadInfoResponse | null>}
          * 
          * @example
          * const {data, isError, isLoading, isFetching, refetch} = useFileUploadInfo();
          * 
          * @typedef {Object} FileUploadInfo
        */

        export function useFileUploadInfo() {
          const {data: session} = useSession();

          return useQuery<FileUploadInfoResponse | null>({
            queryKey: ['FILE_UPLOAD_INFO'],
            queryFn: async () =>
              UseCases.File.getFileUploadInfo({
                token: session?.token?.idToken,
                variables: undefined,
              }),
            enabled: !!session?.token?.idToken,
          });
        }
    