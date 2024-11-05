
              import { useMutation, useQueryClient } from "@tanstack/react-query";
              import { useSession } from 'next-auth/react';
              import {UseCases} from "../usecases";
              import {
                  MutationRoleDeleteArgs
              } from '@transtrackdashboard/core';


              
                  /** 
             * Type: MutationRoleDeleteArgs
            {
 *   data?: InputMaybe<RoleDeleteInput>
 *   filter?: InputMaybe<RoleKeyFilter>
 *   force?: InputMaybe<Scalars['Boolean']['input']>
 * }
 * 
 * 
 * 
 * 
 * 
 *  RoleDeleteInput = {
 *   force?: InputMaybe<Scalars['Boolean']['input']>
 *   id?: InputMaybe<Scalars['ID']['input']>
 * }
 * 
 * export type 
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
               * Hook to delete a Role from the server.
               * @returns {UseMutationResult<boolean, Error, MutationRoleDeleteArgs>}
               * @example
               * const {mutate, isPending, isError, mutateAsync} = useDeleteRole();
               * @param {MutationRoleDeleteArgs} params
              */

              export function useDeleteRole() {
                const {data: session} = useSession();
                const queryClient = useQueryClient();
                

                return useMutation<
                  boolean,
                  Error,
                  MutationRoleDeleteArgs
                >(
                {
                  mutationKey: ['ROLE_DELETE_MUTATION'],
                  mutationFn: async (params) => UseCases.Role.deleteRole({
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
            