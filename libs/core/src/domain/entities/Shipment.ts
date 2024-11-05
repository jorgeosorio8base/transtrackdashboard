
          import { IShipmentEntity, 
        IPackageEntity, IClientEntity,
        
      } from './interfaces';
          import {
            
            Shipment as GQLShipment,
            Package as GQLPackage, Client as GQLClient
          } from '../../definitions/schema';
          

          import { PackageEntity } from './Package';
import { ClientEntity } from './Client';

          export class ShipmentEntity implements IShipmentEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;
private readonly _Package?: GQLPackage[];
private readonly _origin?: string;
private readonly _destination?: string;
private readonly _priority?: string;
private readonly _client_id?: GQLClient;

                  constructor(data: GQLShipment | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;
this._Package = data?.Package?.items || [];
this._origin = data?.origin || undefined;
this._destination = data?.destination || undefined;
this._priority = data?.priority || undefined;
this._client_id = data?.client_id || undefined;
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
                      

                          get Package(): IPackageEntity[] | undefined {
                              return this._Package?.map((item) => new PackageEntity(item)) || undefined;
                          
                        }
                        

                        get Origin(): string | undefined {
                                  return this._origin;
                        };
                      

                        get Destination(): string | undefined {
                                  return this._destination;
                        };
                      

                        get Priority(): string | undefined {
                                  return this._priority;
                        };
                      

                          get ClientId(): IClientEntity | undefined {
                              return new ClientEntity(this._client_id || null);
                          }
                        
          }
      