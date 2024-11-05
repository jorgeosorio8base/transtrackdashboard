
          import { IUserEntity, IFileEntity,
        IRoleEntity, INotificationEntity,
        UserFieldStatusEnum, UserFieldOriginEnum
      } from './interfaces';
          import {
            File as GQLFile,
            User as GQLUser,
            Role as GQLRole, Notification as GQLNotification
          } from '../../definitions/schema';
          import { FileEntity } from './File';

          import { RoleEntity } from './Role';
import { NotificationEntity } from './Notification';

          export class UserEntity implements IUserEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;

private readonly _email?: string;
private readonly _status?: UserFieldStatusEnum;
private readonly _origin?: UserFieldOriginEnum;
private readonly _is8base?: boolean;
private readonly _firstName?: string;
private readonly _lastName?: string;
private readonly _timezone?: string;
private readonly _avatar?: GQLFile;
private readonly _roles?: GQLRole[];
private readonly _notification?: GQLNotification;

                  constructor(data: GQLUser | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;

this._email = data?.email || undefined;
this._status = data?.status as UserFieldStatusEnum || undefined;
this._origin = data?.origin as UserFieldOriginEnum || undefined;
this._is8base = data?.is8base || undefined;
this._firstName = data?.firstName || undefined;
this._lastName = data?.lastName || undefined;
this._timezone = data?.timezone || undefined;
this._avatar = data?.avatar || undefined;
this._roles = data?.roles?.items || [];
this._notification = data?.notification || undefined;
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
                      


                        get Email(): string | undefined {
                                  return this._email;
                        };
                      

                          get Status(): UserFieldStatusEnum | undefined {
                              return this._status;
                          }
                        

                          get Origin(): UserFieldOriginEnum | undefined {
                              return this._origin;
                          }
                        

                          get Is8Base(): boolean | undefined {
                              return this._is8base;
                          }
                        

                        get FirstName(): string | undefined {
                                  return this._firstName;
                        };
                      

                        get LastName(): string | undefined {
                                  return this._lastName;
                        };
                      

                        get Timezone(): string | undefined {
                                  return this._timezone;
                        };
                      

                          get Avatar(): IFileEntity | undefined {
                              return new FileEntity(this._avatar);
                          }
                        

                          get Roles(): IRoleEntity[] | undefined {
                              return this._roles?.map((item) => new RoleEntity(item)) || undefined;
                          
                        }
                        

                          get Notification(): INotificationEntity | undefined {
                              return new NotificationEntity(this._notification || null);
                          }
                        
          }
      