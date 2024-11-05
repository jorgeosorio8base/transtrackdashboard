
            import { useQuery, useQueryClient } from "@tanstack/react-query";
            import { useSession } from 'next-auth/react';
            import {UseCases} from "../usecases";
            import {
            QueryUserArgs,
            IUserEntity,
        } from '@transtrackdashboard/core';

            /*
              Type: IUserEntity

              
          import { IFileEntity } from './iFileEntity';
          import { IRoleEntity } from './iRoleEntity';
import { INotificationEntity } from './iNotificationEntity';

          export enum UserFieldStatusEnum {
            ACTIVE = 'active',INACTIVE = 'inactive',INVITATIONPENDING = 'invitationPending'
        }
export enum UserFieldOriginEnum {
            ADMINISTRATION = 'administration',INVITATION = 'invitation',SELFREGISTRATION = 'selfRegistration'
        }

           IUserEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      

Email?: string
      
Status?: UserFieldStatusEnum;
Origin?: UserFieldOriginEnum;
Is8Base?: boolean;
FirstName?: string
      
LastName?: string
      
Timezone?: string
      
Avatar?: IFileEntity;
Roles?: IRoleEntity[];
Notification?: INotificationEntity;
          }
      
            */

          
              /*
            Type: QueryUserArgs
            {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>
}




          */
            

        /**
         * Hook to fetch User from the server.
         *
         * @returns {UseQueryResult<IUserEntity | null>}
         * 
         * @example
         * const {data, isError, isLoading, isFetching, refetch} = useUser({id: 'idValue'});
         * 
         * @param {QueryUserArgs} variables - The query variables.
        */

        export function useUser(
              variables: QueryUserArgs,
        ) {
          const {data: session} = useSession();
          return useQuery<IUserEntity | null>(
          {
              queryKey: [
                'USER_QUERY', variables
              ],
              queryFn: async () => UseCases.User.getUser({
                variables,
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    