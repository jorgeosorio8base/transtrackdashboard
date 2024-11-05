
          
          import { IUserEntity } from './iUserEntity';
import { IClientEntity } from './iClientEntity';

          

          export interface INotificationEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      
Content?: string
      
SentAt?: string
      
User?: IUserEntity;
Clients?: IClientEntity;
          }
      