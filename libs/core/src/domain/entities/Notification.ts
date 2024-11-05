
          import { INotificationEntity, 
        IUserEntity, IClientEntity,
        
      } from './interfaces';
          import {
            
            Notification as GQLNotification,
            User as GQLUser, Client as GQLClient
          } from '../../definitions/schema';
          

          import { UserEntity } from './User';
import { ClientEntity } from './Client';

          export class NotificationEntity implements INotificationEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;
private readonly _content?: string;
private readonly _sent_at?: string;
private readonly _userID?: GQLUser;
private readonly _clients?: GQLClient;

                  constructor(data: GQLNotification | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;
this._content = data?.content || undefined;
this._sent_at = data?.sent_at || undefined;
this._userID = data?.userID || undefined;
this._clients = data?.clients || undefined;
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
                      

                        get Content(): string | undefined {
                                  return this._content;
                        };
                      

                        get SentAt(): string | undefined {
                                  return this._sent_at;
                        };
                      

                          get User(): IUserEntity | undefined {
                              return new UserEntity(this._userID || null);
                          }
                        

                          get Clients(): IClientEntity | undefined {
                              return new ClientEntity(this._clients || null);
                          }
                        
          }
      