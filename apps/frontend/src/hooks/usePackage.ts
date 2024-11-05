
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryPackageArgs,
            IPackageEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IPackageEntity

              
          
          import { IShipmentEntity } from './iShipmentEntity';
import { IStatusUpdateEntity } from './iStatusUpdateEntity';

          

           IPackageEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
TrackingNumber?: string
      
Status?: string
      
Location?: string
      
ShipmentId?: IShipmentEntity;
StatusUpdate?: IStatusUpdateEntity[];
          }
      
            */

          
              /*
            Type: QueryPackageArgs
            {
  id?: InputMaybe<Scalars['ID']['input']>
  tracking_number?: InputMaybe<Scalars['String']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch Package from the server.
         *
         * @returns {UseQueryResult<IPackageEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = usePackage({id: 'idValue'});
         * 
         * @param {QueryPackageArgs} variables - The query variables.
        */

        export function usePackage(
              variables: QueryPackageArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IPackageEntity | null>(
          {
              queryKey: [
                'PACKAGE_QUERY', variables
              ],
              queryFn: async () => UseCases.Package.getPackage({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    