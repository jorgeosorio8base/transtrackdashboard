
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryClientArgs,
            IClientEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IClientEntity

              
          
          import { IShipmentEntity } from './iShipmentEntity';
import { INotificationEntity } from './iNotificationEntity';

          

           IClientEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
CompanyName?: string
      
PrimaryContact?: string
      
Address?: string
      
PhoneNumber?: string
      
Email?: string
      
PreferredShippingMethods?: string
      
SpecialHandlingInstructions?: string
      
Shipment?: IShipmentEntity;
ClientsNotifications?: INotificationEntity;
          }
      
            */

          
              /*
            Type: QueryClientArgs
            {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Client from the server.
         *
         * @returns {UseQueryResult<IClientEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useClient({id: 'idValue'});
         * 
         * @param {QueryClientArgs} variables - The query variables.
        */

        export function useClient(
              variables: QueryClientArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IClientEntity | null>(
          {
              queryKey: [
                'CLIENT_QUERY', variables
              ],
              queryFn: async () => UseCases.Client.getClient({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    