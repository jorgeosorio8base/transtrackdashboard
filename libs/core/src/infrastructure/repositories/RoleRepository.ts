
        import {IRepositoryParams, IRoleRepository} from './interfaces';
        import {Http, IHttp} from '../http';
        import { gql } from 'graphql-request';
        import {Environment} from '../../environment';
        import {
            Role,
            QueryRoleArgs,
            QueryRolesListArgs,
            RoleListResponse,
            MutationRoleCreateArgs, MutationRoleDeleteArgs, MutationRoleUpdateArgs,
            SuccessResponse,
            
        } from '../../definitions/schema';

        export class RoleRepository implements IRoleRepository {
            private readonly http: IHttp;

            constructor() {
                this.http = new Http();
            }
            
            
          async getRole(
            params: IRepositoryParams<QueryRoleArgs>
          ): Promise<Role | null> {
            return this.http.requestGraphQL<{
                role: Role
            }>({
                url: Environment.BACKEND_API_URL,
                requestDocument:
                    gql`
                      query GET_ROLE(
                        $id: ID
$name: String
                      ) {
                          role(
                            id: $id
name: $name
                          ) {  
                              id
createdAt
updatedAt
createdBy {
        
        id
createdAt
updatedAt

email
status
origin
is8base
firstName
lastName
timezone
avatar {
          id
          downloadUrl
      }


        
      }
name
description
users {
        items {
        id
createdAt
updatedAt

email
status
origin
is8base
firstName
lastName
timezone
avatar {
          id
          downloadUrl
      }


        } count
      }



                          }
                      }
                    `
                  ,
                  token: params.token,
                variables: params.variables,
            })?.then((response) => response.role)?.catch(() => null);
        }

            
        async getRolesList(params: IRepositoryParams<QueryRolesListArgs>): Promise<RoleListResponse> {
                return this.http.requestGraphQL<{
                    rolesList: RoleListResponse
                }>({
                    url: Environment.BACKEND_API_URL,
                    requestDocument:
                        gql`
                            query GET_ROLES (
                                  $first: Int
                                  $skip: Int
                                  $filter: RoleFilter
                                  $sort: [RoleSort!]
                            ) {
                                rolesList (
                                  first: $first
                                  skip: $skip
                                  filter: $filter
                                  sort: $sort
                                ) {
                                    items {
                                      id
createdAt
updatedAt
createdBy {
        
        id
createdAt
updatedAt

email
status
origin
is8base
firstName
lastName
timezone
avatar {
          id
          downloadUrl
      }


        
      }
name
description
users {
        items {
        id
createdAt
updatedAt

email
status
origin
is8base
firstName
lastName
timezone
avatar {
          id
          downloadUrl
      }


        } count
      }



                                    }
                                    count
                            }
                        }
                      `,
                      token: params.token,
                    variables: params.variables,
                })
                ?.then((response) => response.rolesList);
            }

            
                    async createRole(params: IRepositoryParams<MutationRoleCreateArgs>): Promise<Role | null> {
                        return this.http.requestGraphQL<{
                          roleCreate: Role
                        }>({
                            url: Environment.BACKEND_API_URL,
                            requestDocument:
                                gql`
                                    mutation CREATE_ROLE (
                                      $data: RoleCreateInput!
                                    ) {
                                         roleCreate (
                                          data: $data
                                        ) {
                                            id
                                        }
                                    }
                                `,
                            token: params.token,
                            variables: params.variables,
                        })?.then((response) => response.roleCreate)?.catch(() => null);
                  }
                

                    async deleteRole(params: IRepositoryParams<MutationRoleDeleteArgs>): Promise<SuccessResponse | null> {
                        return this.http.requestGraphQL<SuccessResponse>({
                            url: Environment.BACKEND_API_URL,
                            requestDocument:
                                gql`
                                    mutation DELETE_ROLE (
                                      $data: RoleDeleteInput!
                                      $filter: RoleKeyFilter
                                      $force: Boolean
                                    ) {
                                        roleDelete (
                                          data: $data
                                          filter: $filter
                                          force: $force
                                        ) {
                                            success
                                        }
                                    }
                                `,
                            token: params.token,
                            variables: params.variables,
                        })?.catch(() => null);
                }
                  

                    async updateRole(params: IRepositoryParams<MutationRoleUpdateArgs>): Promise<Role | null> {
                        return this.http.requestGraphQL<{
                          roleUpdate: Role
                        }>({
                            url: Environment.BACKEND_API_URL,
                            requestDocument:
                                gql`
                                    mutation UPDATE_ROLE (
                                      $data: RoleUpdateInput!
                                    ) {
                                         roleUpdate (
                                          data: $data
                                        ) {
                                            id
                                        }
                                    }
                                `,
                            token: params.token,
                            variables: params.variables,
                        })?.then((response) => response.roleUpdate)?.catch(() => null);
                  }
                

            
        }
      