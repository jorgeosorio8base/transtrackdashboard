
          
          import { IShipmentEntity } from './iShipmentEntity';
import { INotificationEntity } from './iNotificationEntity';

          

          export interface IClientEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
CompanyName?: string
      
PrimaryContact?: string
      
Address?: string
      
PhoneNumber?: string
      
Email?: string
      
PreferredShippingMethods?: string
      
SpecialHandlingInstructions?: string
      
Shipment?: IShipmentEntity;
ClientsNotifications?: INotificationEntity;
          }
      