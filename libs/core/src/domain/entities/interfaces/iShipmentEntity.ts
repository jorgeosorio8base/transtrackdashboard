
          
          import { IPackageEntity } from './iPackageEntity';
import { IClientEntity } from './iClientEntity';

          

          export interface IShipmentEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
Package?: IPackageEntity[];
Origin?: string
      
Destination?: string
      
Priority?: string
      
ClientId?: IClientEntity;
          }
      