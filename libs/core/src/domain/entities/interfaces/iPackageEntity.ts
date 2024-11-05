
          
          import { IShipmentEntity } from './iShipmentEntity';
import { IStatusUpdateEntity } from './iStatusUpdateEntity';

          

          export interface IPackageEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
TrackingNumber?: string
      
Status?: string
      
Location?: string
      
ShipmentId?: IShipmentEntity;
StatusUpdate?: IStatusUpdateEntity[];
          }
      