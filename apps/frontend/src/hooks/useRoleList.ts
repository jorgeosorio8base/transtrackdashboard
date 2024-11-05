
          import { useQuery } from "@tanstack/react-query";
          import { useSession } from 'next-auth/react';
          import {UseCases} from "../usecases";
          import {       
              QueryRolesListArgs,          
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

           /** 
             * Type: QueryRolesListArgs
            {
 *   after?: InputMaybe<Scalars['String']['input']>
 *   before?: InputMaybe<Scalars['String']['input']>
 *   filter?: InputMaybe<RoleFilter>
 *   first?: InputMaybe<Scalars['Int']['input']>
 *   groupBy?: InputMaybe<RoleGroupBy>
 *   last?: InputMaybe<Scalars['Int']['input']>
 *   orderBy?: InputMaybe<Array<InputMaybe<RoleOrderBy>>>
 *   skip?: InputMaybe<Scalars['Int']['input']>
 *   sort?: InputMaybe<Array<RoleSort>>
 *   withDeleted?: InputMaybe<Scalars['Boolean']['input']>
 * }
 * 
 * 
 * 
 * 
 * 
 *  RoleFilter = {
 *   AND?: InputMaybe<Array<RoleFilter>>
 *   OR?: InputMaybe<Array<RoleFilter>>
 *   _fullText?: InputMaybe<Scalars['String']['input']>
 *   apiTokens?: InputMaybe<ApiTokenRelationFilter>
 *   authenticationProfiles?: InputMaybe<AuthenticationProfileRelationFilter>
 *   createdAt?: InputMaybe<DateTimePredicate>
 *   createdBy?: InputMaybe<UserFilter>
 *   deletedAt?: InputMaybe<IntPredicate>
 *   description?: InputMaybe<StringPredicate>
 *   id?: InputMaybe<IdPredicate>
 *   name?: InputMaybe<StringPredicate>
 *   permissions?: InputMaybe<PermissionRelationFilter>
 *   updatedAt?: InputMaybe<DateTimePredicate>
 *   users?: InputMaybe<UserRelationFilter>
 * }
 * 
 * export type 
 * 
 * export type RoleFilter = {
 *   AND?: InputMaybe<Array<RoleFilter>>
 *   OR?: InputMaybe<Array<RoleFilter>>
 *   _fullText?: InputMaybe<Scalars['String']['input']>
 *   apiTokens?: InputMaybe<ApiTokenRelationFilter>
 *   authenticationProfiles?: InputMaybe<AuthenticationProfileRelationFilter>
 *   createdAt?: InputMaybe<DateTimePredicate>
 *   createdBy?: InputMaybe<UserFilter>
 *   deletedAt?: InputMaybe<IntPredicate>
 *   description?: InputMaybe<StringPredicate>
 *   id?: InputMaybe<IdPredicate>
 *   name?: InputMaybe<StringPredicate>
 *   permissions?: InputMaybe<PermissionRelationFilter>
 *   updatedAt?: InputMaybe<DateTimePredicate>
 *   users?: InputMaybe<UserRelationFilter>
 * }
 * 
 * export type ApiTokenRelationFilter = {
 *   every?: InputMaybe<ApiTokenFilter>
 *   none?: InputMaybe<ApiTokenFilter>
 *   some?: InputMaybe<ApiTokenFilter>
 * }
 * 
 * export type AuthenticationProfileRelationFilter = {
 *   every?: InputMaybe<AuthenticationProfileFilter>
 *   none?: InputMaybe<AuthenticationProfileFilter>
 *   some?: InputMaybe<AuthenticationProfileFilter>
 * }
 * 
 * export type DateTimePredicate = {
 *   equals?: InputMaybe<Scalars['DateTime']['input']>
 *   gt?: InputMaybe<Scalars['DateTime']['input']>
 *   gte?: InputMaybe<Scalars['DateTime']['input']>
 *   in?: InputMaybe<Array<Scalars['DateTime']['input']>>
 *   is_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   is_not_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   lt?: InputMaybe<Scalars['DateTime']['input']>
 *   lte?: InputMaybe<Scalars['DateTime']['input']>
 *   not_equals?: InputMaybe<Scalars['DateTime']['input']>
 *   not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>
 *   relative?: InputMaybe<DateRelativePredicates>
 * }
 * 
 * export type UserFilter = {
 *   AND?: InputMaybe<Array<UserFilter>>
 *   OR?: InputMaybe<Array<UserFilter>>
 *   _fullText?: InputMaybe<Scalars['String']['input']>
 *   avatar?: InputMaybe<FileFilter>
 *   createdAt?: InputMaybe<DateTimePredicate>
 *   createdBy?: InputMaybe<UserFilter>
 *   deletedAt?: InputMaybe<IntPredicate>
 *   email?: InputMaybe<StringPredicate>
 *   firstName?: InputMaybe<StringPredicate>
 *   id?: InputMaybe<IdPredicate>
 *   is8base?: InputMaybe<BoolPredicate>
 *   is_self?: InputMaybe<Scalars['Boolean']['input']>
 *   lastName?: InputMaybe<StringPredicate>
 *   not_self?: InputMaybe<Scalars['Boolean']['input']>
 *   notification?: InputMaybe<NotificationFilter>
 *   origin?: InputMaybe<StringPredicate>
 *   roles?: InputMaybe<RoleRelationFilter>
 *   status?: InputMaybe<StringPredicate>
 *   timezone?: InputMaybe<StringPredicate>
 *   updatedAt?: InputMaybe<DateTimePredicate>
 * }
 * 
 * export type IntPredicate = {
 *   equals?: InputMaybe<Scalars['Int']['input']>
 *   gt?: InputMaybe<Scalars['Int']['input']>
 *   gte?: InputMaybe<Scalars['Int']['input']>
 *   in?: InputMaybe<Array<Scalars['Int']['input']>>
 *   is_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   is_not_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   lt?: InputMaybe<Scalars['Int']['input']>
 *   lte?: InputMaybe<Scalars['Int']['input']>
 *   not_equals?: InputMaybe<Scalars['Int']['input']>
 *   not_in?: InputMaybe<Array<Scalars['Int']['input']>>
 * }
 * 
 * export type StringPredicate = {
 *   contains?: InputMaybe<Scalars['String']['input']>
 *   ends_with?: InputMaybe<Scalars['String']['input']>
 *   equals?: InputMaybe<Scalars['String']['input']>
 *   in?: InputMaybe<Array<Scalars['String']['input']>>
 *   is_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   is_not_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   not_contains?: InputMaybe<Scalars['String']['input']>
 *   not_ends_with?: InputMaybe<Scalars['String']['input']>
 *   not_equals?: InputMaybe<Scalars['String']['input']>
 *   not_in?: InputMaybe<Array<Scalars['String']['input']>>
 *   not_starts_with?: InputMaybe<Scalars['String']['input']>
 *   starts_with?: InputMaybe<Scalars['String']['input']>
 * }
 * 
 * export type IdPredicate = {
 *   contains?: InputMaybe<Scalars['ID']['input']>
 *   ends_with?: InputMaybe<Scalars['ID']['input']>
 *   equals?: InputMaybe<Scalars['ID']['input']>
 *   gt?: InputMaybe<Scalars['ID']['input']>
 *   gte?: InputMaybe<Scalars['ID']['input']>
 *   in?: InputMaybe<Array<Scalars['ID']['input']>>
 *   is_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   is_not_empty?: InputMaybe<Scalars['Boolean']['input']>
 *   lt?: InputMaybe<Scalars['ID']['input']>
 *   lte?: InputMaybe<Scalars['ID']['input']>
 *   not_contains?: InputMaybe<Scalars['ID']['input']>
 *   not_ends_with?: InputMaybe<Scalars['ID']['input']>
 *   not_equals?: InputMaybe<Scalars['ID']['input']>
 *   not_in?: InputMaybe<Array<Scalars['ID']['input']>>
 *   not_starts_with?: InputMaybe<Scalars['ID']['input']>
 *   starts_with?: InputMaybe<Scalars['ID']['input']>
 * }
 * 
 * export type PermissionRelationFilter = {
 *   every?: InputMaybe<PermissionFilter>
 *   none?: InputMaybe<PermissionFilter>
 *   some?: InputMaybe<PermissionFilter>
 * }
 * 
 * export type UserRelationFilter = {
 *   every?: InputMaybe<UserFilter>
 *   none?: InputMaybe<UserFilter>
 *   some?: InputMaybe<UserFilter>
 * }
 * 
 * export type RoleGroupBy = {
 *   first?: InputMaybe<Scalars['Int']['input']>
 *   having?: InputMaybe<Having>
 *   last?: InputMaybe<Scalars['Int']['input']>
 *   query: RoleGroupByQuery
 *   skip?: InputMaybe<Scalars['Int']['input']>
 *   sort?: InputMaybe<Array<GroupBySort>>
 * }
 * 
 * 
 * 
 * export type Having = {
 *   AND?: InputMaybe<Array<Having>>
 *   OR?: InputMaybe<Array<Having>>
 *   alias?: InputMaybe<Scalars['String']['input']>
 *   bigint?: InputMaybe<BigIntPredicateHaving>
 *   bool?: InputMaybe<BoolPredicateHaving>
 *   date?: InputMaybe<DatePredicateHaving>
 *   datetime?: InputMaybe<DateTimePredicateHaving>
 *   float?: InputMaybe<FloatPredicateHaving>
 *   id?: InputMaybe<IdPredicateHaving>
 *   int?: InputMaybe<IntPredicateHaving>
 *   string?: InputMaybe<StringPredicateHaving>
 * }
 * 
 * export type RoleGroupByQuery = {
 *   _group?: InputMaybe<Array<GroupIdentifiersGroupByField>>
 *   apiTokens?: InputMaybe<ApiTokenGroupByQuery>
 *   authenticationProfiles?: InputMaybe<AuthenticationProfileGroupByQuery>
 *   createdAt?: InputMaybe<Array<GroupByField>>
 *   createdBy?: InputMaybe<UserGroupByQuery>
 *   description?: InputMaybe<Array<GroupByField>>
 *   id?: InputMaybe<Array<GroupByField>>
 *   name?: InputMaybe<Array<GroupByField>>
 *   permissions?: InputMaybe<PermissionGroupByQuery>
 *   updatedAt?: InputMaybe<Array<GroupByField>>
 *   users?: InputMaybe<UserGroupByQuery>
 * }
 * 
 * export type GroupBySort = {
 *   alias: Scalars['String']['input']
 *   direction: SortOrder
 * }
 * 
 * export type RoleSort = {
 *   createdAt?: InputMaybe<SortOrder>
 *   createdBy?: InputMaybe<UserSort>
 *   deletedAt?: InputMaybe<SortOrder>
 *   description?: InputMaybe<SortOrder>
 *   id?: InputMaybe<SortOrder>
 *   name?: InputMaybe<SortOrder>
 *   updatedAt?: InputMaybe<SortOrder>
 * }
 * 
 * export type InputMaybe<T> = Maybe<T>
 * 
 * export type UserSort = {
 *   avatar?: InputMaybe<FileSort>
 *   createdAt?: InputMaybe<SortOrder>
 *   createdBy?: InputMaybe<UserSort>
 *   deletedAt?: InputMaybe<SortOrder>
 *   email?: InputMaybe<SortOrder>
 *   firstName?: InputMaybe<SortOrder>
 *   id?: InputMaybe<SortOrder>
 *   is8base?: InputMaybe<SortOrder>
 *   lastName?: InputMaybe<SortOrder>
 *   notification?: InputMaybe<NotificationSort>
 *   origin?: InputMaybe<SortOrder>
 *   status?: InputMaybe<SortOrder>
 *   timezone?: InputMaybe<SortOrder>
 *   updatedAt?: InputMaybe<SortOrder>
 * }
 * 
             */
            

          /**
           * Hook to fetch list of Role from the server.
           * 
           * @returns {UseQueryResult<{items: IRoleEntity[], count: number} | null>}
           * 
           * @example
           * const {data, isError, isLoading, isFetching, refetch} = useRoleList({first: 10});
           * 
           * @param {QueryRolesListArgs} variables - The query variables.
          */

          export function useRoleList(
              variables?: QueryRolesListArgs,
        ) {
              const {data: session} = useSession();
          return useQuery<{
              items: IRoleEntity[];
              count: number;
          } | null>(
          {
              queryKey: [
                'ROLE_LIST_QUERY', variables
              ],
              queryFn: async () => UseCases.Role.getRoleList({
                variables: variables || {},
                token: session?.token?.idToken,
              }),
              enabled: !!session?.token?.idToken,
          });
        }
    