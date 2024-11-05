
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryStatusUpdateArgs,
            IStatusUpdateEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IStatusUpdateEntity

              
          
          import { IPackageEntity } from './iPackageEntity';

          

           IStatusUpdateEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
Status?: string
      
Timestamp?: string
      
PackageId?: IPackageEntity;
          }
      
            */

          
              /*
            Type: QueryStatusUpdateArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch StatusUpdate from the server.
         *
         * @returns {UseQueryResult<IStatusUpdateEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useStatusUpdate({id: 'idValue'});
         * 
         * @param {QueryStatusUpdateArgs} variables - The query variables.
        */

        export function useStatusUpdate(
              variables: QueryStatusUpdateArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IStatusUpdateEntity | null>(
          {
              queryKey: [
                'STATUSUPDATE_QUERY', variables
              ],
              queryFn: async () => UseCases.StatusUpdate.getStatusUpdate({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    