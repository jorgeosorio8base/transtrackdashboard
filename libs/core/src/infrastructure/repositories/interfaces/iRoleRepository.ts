
        import {
            Role,
            QueryRoleArgs,
            QueryRolesListArgs,
            RoleListResponse,
            MutationRoleCreateArgs, MutationRoleDeleteArgs, MutationRoleUpdateArgs,
            SuccessResponse,
            
        } from '../../../definitions/schema';
        import {IRepositoryParams} from './iRepositoryParams';

        export interface IRoleRepository {
            getRole(params: IRepositoryParams<QueryRoleArgs>): Promise<Role | null>;
            getRolesList(params: IRepositoryParams<QueryRolesListArgs>): Promise<RoleListResponse>;
            createRole(params: IRepositoryParams<MutationRoleCreateArgs>): Promise<Role | null>;
deleteRole(params: IRepositoryParams<MutationRoleDeleteArgs>): Promise<SuccessResponse | null>;
updateRole(params: IRepositoryParams<MutationRoleUpdateArgs>): Promise<Role | null>;
            
          }
      