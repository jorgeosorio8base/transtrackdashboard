
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryShipmentArgs,
            IShipmentEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IShipmentEntity

              
          
          import { IPackageEntity } from './iPackageEntity';
import { IClientEntity } from './iClientEntity';

          

           IShipmentEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
Package?: IPackageEntity[];
Origin?: string
      
Destination?: string
      
Priority?: string
      
ClientId?: IClientEntity;
          }
      
            */

          
              /*
            Type: QueryShipmentArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Shipment from the server.
         *
         * @returns {UseQueryResult<IShipmentEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useShipment({id: 'idValue'});
         * 
         * @param {QueryShipmentArgs} variables - The query variables.
        */

        export function useShipment(
              variables: QueryShipmentArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IShipmentEntity | null>(
          {
              queryKey: [
                'SHIPMENT_QUERY', variables
              ],
              queryFn: async () => UseCases.Shipment.getShipment({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    