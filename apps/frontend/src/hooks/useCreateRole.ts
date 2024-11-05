
              import { useMutation, useQueryClient } from "@tanstack/react-query";
              import { useSession } from 'next-auth/react';
              import {UseCases} from "../usecases";
              import {
                  MutationRoleCreateArgs
              } from '@transtrackdashboard/core';


              
                  /** 
             * Type: MutationRoleCreateArgs
            {
 *   data: RoleCreateInput
 * }
 * 
 *  RoleCreateInput = {
 *   apiTokens?: InputMaybe<RolesApiTokensRelationInput>
 *   authenticationProfiles?: InputMaybe<RolesAuthenticationProfilesRelationInput>
 *   description?: InputMaybe<Scalars['String']['input']>
 *   name: Scalars['String']['input']
 *   permissions?: InputMaybe<PermissionsInput>
 *   users?: InputMaybe<RolesUsersRelationInput>
 * }
 * 
 * 
 * 
 * export type RolesApiTokensRelationInput = {
 *   connect?: InputMaybe<Array<ApiTokenKeyFilter>>
 * }
 * 
 * export type RolesAuthenticationProfilesRelationInput = {
 *   connect?: InputMaybe<Array<AuthenticationProfileKeyFilter>>
 *   create?: InputMaybe<Array<InputMaybe<Roles_AuthenticationProfileCreateInput>>>
 * }
 * 
 * export type PermissionsInput = {
 *   custom?: InputMaybe<PermissionsCustom>
 *   data?: InputMaybe<PermissionsData>
 * }
 * 
 * export type RolesUsersRelationInput = {
 *   connect?: InputMaybe<Array<UserKeyFilter>>
 *   create?: InputMaybe<Array<InputMaybe<Roles_UserCreateInput>>>
 * }
 * 
             */
                
             

              /**
               * Hook to create a Role from the server.
               * @returns {UseMutationResult<boolean, Error, MutationRoleCreateArgs>}
               * @example
               * const {mutate, isPending, isError, mutateAsync} = useCreateRole();
               * @param {MutationRoleCreateArgs} params
              */

              export function useCreateRole() {
                const {data: session} = useSession();
                const queryClient = useQueryClient();
                

                return useMutation<
                  boolean,
                  Error,
                  MutationRoleCreateArgs
                >(
                {
                  mutationKey: ['ROLE_CREATE_MUTATION'],
                  mutationFn: async (params) => UseCases.Role.createRole({
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
            