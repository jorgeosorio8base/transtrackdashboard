
          import { IRoleEntity, 
        IUserEntity,
        
      } from './interfaces';
          import {
            
            Role as GQLRole,
            User as GQLUser
          } from '../../definitions/schema';
          

          import { UserEntity } from './User';

          export class RoleEntity implements IRoleEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;
private readonly _createdBy?: GQLUser;
private readonly _name?: string;
private readonly _description?: string;
private readonly _users?: GQLUser[];




                  constructor(data: GQLRole | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;
this._createdBy = data?.createdBy || undefined;
this._name = data?.name || undefined;
this._description = data?.description || undefined;
this._users = data?.users?.items || [];



                  }

                  
                        get Id(): string | undefined {
                                  return this._id;
                        };
                      

                        get CreatedAt(): string | undefined {
                                  return this._createdAt;
                        };
                      

                        get UpdatedAt(): string | undefined {
                                  return this._updatedAt;
                        };
                      

                          get CreatedBy(): IUserEntity | undefined {
                              return new UserEntity(this._createdBy || null);
                          }
                        

                        get Name(): string | undefined {
                                  return this._name;
                        };
                      

                        get Description(): string | undefined {
                                  return this._description;
                        };
                      

                          get Users(): IUserEntity[] | undefined {
                              return this._users?.map((item) => new UserEntity(item)) || undefined;
                          
                        }
                        



          }
      