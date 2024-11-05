
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryRoleArgs,
            IRoleEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IRoleEntity

              
          
          import { IUserEntity } from './iUserEntity';
import { IUserEntity } from './iUserEntity';

          

           IRoleEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
CreatedBy?: IUserEntity;
Name?: string
      
Description?: string
      
Users?: IUserEntity[];



          }
      
            */

          
              /*
            Type: QueryRoleArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Role from the server.
         *
         * @returns {UseQueryResult<IRoleEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useRole({id: 'idValue'});
         * 
         * @param {QueryRoleArgs} variables - The query variables.
        */

        export function useRole(
              variables: QueryRoleArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IRoleEntity | null>(
          {
              queryKey: [
                'ROLE_QUERY', variables
              ],
              queryFn: async () => UseCases.Role.getRole({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    