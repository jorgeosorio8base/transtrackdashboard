
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryNotificationArgs,
            INotificationEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: INotificationEntity

              
          
          import { IUserEntity } from './iUserEntity';
import { IClientEntity } from './iClientEntity';

          

           INotificationEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
Content?: string
      
SentAt?: string
      
User?: IUserEntity;
Clients?: IClientEntity;
          }
      
            */

          
              /*
            Type: QueryNotificationArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Notification from the server.
         *
         * @returns {UseQueryResult<INotificationEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useNotification({id: 'idValue'});
         * 
         * @param {QueryNotificationArgs} variables - The query variables.
        */

        export function useNotification(
              variables: QueryNotificationArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<INotificationEntity | null>(
          {
              queryKey: [
                'NOTIFICATION_QUERY', variables
              ],
              queryFn: async () => UseCases.Notification.getNotification({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    