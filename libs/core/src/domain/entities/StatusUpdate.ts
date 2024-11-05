
          import { IStatusUpdateEntity, 
        IPackageEntity,
        
      } from './interfaces';
          import {
            
            StatusUpdate as GQLStatusUpdate,
            Package as GQLPackage
          } from '../../definitions/schema';
          

          import { PackageEntity } from './Package';

          export class StatusUpdateEntity implements IStatusUpdateEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;
private readonly _status?: string;
private readonly _timestamp?: string;
private readonly _package_id?: GQLPackage;

                  constructor(data: GQLStatusUpdate | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;
this._status = data?.status || undefined;
this._timestamp = data?.timestamp || undefined;
this._package_id = data?.package_id || undefined;
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
                      

                        get Status(): string | undefined {
                                  return this._status;
                        };
                      

                        get Timestamp(): string | undefined {
                                  return this._timestamp;
                        };
                      

                          get PackageId(): IPackageEntity | undefined {
                              return new PackageEntity(this._package_id || null);
                          }
                        
          }
      