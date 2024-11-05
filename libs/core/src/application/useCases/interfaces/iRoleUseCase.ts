
        import {
            QueryRoleArgs,
            QueryRolesListArgs,
            MutationRoleCreateArgs, MutationRoleDeleteArgs, MutationRoleUpdateArgs,
            
        } from '../../../definitions/schema';
        import {RoleEntity } from '../../../domain';
        import {IRepositoryParams} from '../../../infrastructure';

        export interface IRoleUseCase {
            getRole(params: IRepositoryParams<QueryRoleArgs>): Promise<RoleEntity | null>;
            getRoleList(params: IRepositoryParams<QueryRolesListArgs>): Promise<{
                count: number;
                items: Array<RoleEntity>;
            }>;
            createRole(params: IRepositoryParams<MutationRoleCreateArgs>): Promise<boolean>;
deleteRole(params: IRepositoryParams<MutationRoleDeleteArgs>): Promise<boolean>;
updateRole(params: IRepositoryParams<MutationRoleUpdateArgs>): Promise<boolean>;
              
        }
    