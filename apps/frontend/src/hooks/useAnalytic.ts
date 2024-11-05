
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryAnalyticArgs,
            IAnalyticEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IAnalyticEntity

              
          
          

          

           IAnalyticEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
ReportName?: string
      
Data?: Record<string, any>
      
GeneratedAt?: string
      
          }
      
            */

          
              /*
            Type: QueryAnalyticArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Analytic from the server.
         *
         * @returns {UseQueryResult<IAnalyticEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useAnalytic({id: 'idValue'});
         * 
         * @param {QueryAnalyticArgs} variables - The query variables.
        */

        export function useAnalytic(
              variables: QueryAnalyticArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IAnalyticEntity | null>(
          {
              queryKey: [
                'ANALYTIC_QUERY', variables
              ],
              queryFn: async () => UseCases.Analytic.getAnalytic({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    