
          import { IPackageEntity, 
        IShipmentEntity, IStatusUpdateEntity,
        
      } from './interfaces';
          import {
            
            Package as GQLPackage,
            Shipment as GQLShipment, StatusUpdate as GQLStatusUpdate
          } from '../../definitions/schema';
          

          import { ShipmentEntity } from './Shipment';
import { StatusUpdateEntity } from './StatusUpdate';

          export class PackageEntity implements IPackageEntity {
                private readonly _id?: string;
private readonly _createdAt?: string;
private readonly _updatedAt?: string;
private readonly _tracking_number?: string;
private readonly _status?: string;
private readonly _location?: string;
private readonly _shipment_id?: GQLShipment;
private readonly _StatusUpdate?: GQLStatusUpdate[];

                  constructor(data: GQLPackage | null) {
                      this._id = data?.id || undefined;
this._createdAt = data?.createdAt || undefined;
this._updatedAt = data?.updatedAt || undefined;
this._tracking_number = data?.tracking_number || undefined;
this._status = data?.status || undefined;
this._location = data?.location || undefined;
this._shipment_id = data?.shipment_id || undefined;
this._StatusUpdate = data?.StatusUpdate?.items || [];
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
                      

                        get TrackingNumber(): string | undefined {
                                  return this._tracking_number;
                        };
                      

                        get Status(): string | undefined {
                                  return this._status;
                        };
                      

                        get Location(): string | undefined {
                                  return this._location;
                        };
                      

                          get ShipmentId(): IShipmentEntity | undefined {
                              return new ShipmentEntity(this._shipment_id || null);
                          }
                        

                          get StatusUpdate(): IStatusUpdateEntity[] | undefined {
                              return this._StatusUpdate?.map((item) => new StatusUpdateEntity(item)) || undefined;
                          
                        }
                        
          }
      