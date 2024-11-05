
              import { useMutation, useQueryClient } from "@tanstack/react-query";
              import { useSession } from 'next-auth/react';
              import {UseCases} from "../usecases";
              import {
                  MutationRoleUpdateArgs
              } from '@transtrackdashboard/core';


              
                  /** 
             * Type: MutationRoleUpdateArgs
            {
 *   data: RoleUpdateInput
 *   destroyDetached?: InputMaybe<Scalars['Boolean']['input']>
 *   filter?: InputMaybe<RoleKeyFilter>
 *   force?: InputMaybe<Scalars['Boolean']['input']>
 * }
 * 
 *  RoleUpdateInput = {
 *   apiTokens?: InputMaybe<RolesApiTokensUpdateRelationInput>
 *   authenticationProfiles?: InputMaybe<RolesAuthenticationProfilesUpdateRelationInput>
 *   description?: InputMaybe<Scalars['String']['input']>
 *   id?: InputMaybe<Scalars['ID']['input']>
 *   name?: InputMaybe<Scalars['String']['input']>
 *   permissions?: InputMaybe<PermissionsInput>
 *   users?: InputMaybe<RolesUsersUpdateRelationInput>
 * }
 * 
 * 
 * 
 * export type RolesApiTokensUpdateRelationInput = {
 *   connect?: InputMaybe<Array<ApiTokenKeyFilter>>
 *   disconnect?: InputMaybe<Array<ApiTokenKeyFilter>>
 *   reconnect?: InputMaybe<Array<ApiTokenKeyFilter>>
 *   update?: InputMaybe<Array<InputMaybe<Roles_ApiTokenUpdateInput>>>
 * }
 * 
 * export type RolesAuthenticationProfilesUpdateRelationInput = {
 *   connect?: InputMaybe<Array<AuthenticationProfileKeyFilter>>
 *   create?: InputMaybe<Array<InputMaybe<Roles_AuthenticationProfileCreateInput>>>
 *   disconnect?: InputMaybe<Array<AuthenticationProfileKeyFilter>>
 *   reconnect?: InputMaybe<Array<AuthenticationProfileKeyFilter>>
 *   update?: InputMaybe<Array<InputMaybe<Roles_AuthenticationProfileUpdateInput>>>
 * }
 * 
 * export type PermissionsInput = {
 *   custom?: InputMaybe<PermissionsCustom>
 *   data?: InputMaybe<PermissionsData>
 * }
 * 
 * export type RolesUsersUpdateRelationInput = {
 *   connect?: InputMaybe<Array<UserKeyFilter>>
 *   create?: InputMaybe<Array<InputMaybe<Roles_UserCreateInput>>>
 *   disconnect?: InputMaybe<Array<UserKeyFilter>>
 *   reconnect?: InputMaybe<Array<UserKeyFilter>>
 *   update?: InputMaybe<Array<InputMaybe<Roles_UserUpdateInput>>>
 * }
 * 
 * export type 
 * 
 * 
 * 
 * export type RoleKeyFilter = {
 *   id?: InputMaybe<Scalars['ID']['input']>
 *   name?: InputMaybe<Scalars['String']['input']>
 * }
 * 
 * 
 * 
             */
                
             

              /**
               * Hook to update a Role from the server.
               * @returns {UseMutationResult<boolean, Error, MutationRoleUpdateArgs>}
               * @example
               * const {mutate, isPending, isError, mutateAsync} = useUpdateRole();
               * @param {MutationRoleUpdateArgs} params
              */

              export function useUpdateRole() {
                const {data: session} = useSession();
                const queryClient = useQueryClient();
                

                return useMutation<
                  boolean,
                  Error,
                  MutationRoleUpdateArgs
                >(
                {
                  mutationKey: ['ROLE_UPDATE_MUTATION'],
                  mutationFn: async (params) => UseCases.Role.updateRole({
                    variables: params,
                    token: session?.token?.idToken,
                  }),
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['ROLE_LIST_QUERY'],
                    });
                  },
                }
                );
              }
            