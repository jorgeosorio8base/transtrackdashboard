
        import {IRoleUseCase} from './interfaces';
        import {RoleEntity} from '../../domain';
        import {
            QueryRoleArgs,
            QueryRolesListArgs,
            MutationRoleCreateArgs, MutationRoleDeleteArgs, MutationRoleUpdateArgs,
            
        } from '../../definitions/schema';
        import {IRoleRepository, RoleRepository, IRepositoryParams} from '../../infrastructure';

        export class RoleUseCase implements IRoleUseCase {
              private readonly repository: IRoleRepository;
              private readonly errorCatcher: (error: unknown, methodName: string) => never;

              constructor() {
                    this.repository = new RoleRepository();
                    this.errorCatcher = (
                      error: unknown,
                      methodName: string,
                    ) => {
                        if (error instanceof Error) {
                            throw new Error(error.message);
                        }
                        
                        if (typeof error === 'string') {
                            throw new Error(error);
                        }

                        throw new Error(`An error occurred trying to ${methodName}`);
                    };
              }

            async getRole(params: IRepositoryParams<QueryRoleArgs>): Promise<RoleEntity | null> {
                        try {
                            return this.repository.getRole(params)
                            .then((result) => new RoleEntity(result))
                            .catch((err) => this.errorCatcher(err, 'getRole'));
                        } catch (error) {
                            this.errorCatcher(error, 'getRole');
                        }
            }

            async getRoleList(params: IRepositoryParams<QueryRolesListArgs>): Promise<{
                count: number;
                items: Array<RoleEntity>;
                }> {
                try {
                    return this.repository.getRolesList(params)
                    .then((result) => {
                        return {
                            count: result?.count || 0,
                            items: result?.items?.map((item) => new RoleEntity(item)) || [],
                        };
                    })
                    .catch((err) => this.errorCatcher(err, 'getRolesList'));
                } catch (error) {
                    this.errorCatcher(error, 'getRolesList');
                }
            }

            async createRole(params: IRepositoryParams<MutationRoleCreateArgs>): Promise<boolean> {
                        try {
                            return this.repository.createRole(params)
                            .then((result) => !!result?.id)
                            .catch((err) => this.errorCatcher(err, 'createRole'));
                        } catch (error) {
                            this.errorCatcher(error, 'createRole');
                        }
                    }

                    async deleteRole(params: IRepositoryParams<MutationRoleDeleteArgs>): Promise<boolean> {
                        try {
                            return this.repository.deleteRole(params)
                            .then((result) => !!result?.success)
                            .catch((err) => this.errorCatcher(err, 'deleteRole'));
                        } catch (error) {
                            this.errorCatcher(error, 'deleteRole');
                        }
                    }
                  
async updateRole(params: IRepositoryParams<MutationRoleUpdateArgs>): Promise<boolean> {
                        try {
                            return this.repository.updateRole(params)
                            .then((result) => !!result?.id)
                            .catch((err) => this.errorCatcher(err, 'updateRole'));
                        } catch (error) {
                            this.errorCatcher(error, 'updateRole');
                        }
                    }

              
            }
    