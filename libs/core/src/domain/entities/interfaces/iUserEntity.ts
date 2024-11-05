
          import { IFileEntity } from './iFileEntity';
          import { IRoleEntity } from './iRoleEntity';
import { INotificationEntity } from './iNotificationEntity';

          export enum UserFieldStatusEnum {
            ACTIVE = 'active',INACTIVE = 'inactive',INVITATIONPENDING = 'invitationPending'
        }
export enum UserFieldOriginEnum {
            ADMINISTRATION = 'administration',INVITATION = 'invitation',SELFREGISTRATION = 'selfRegistration'
        }

          export interface IUserEntity {
              Id?: string
      
CreatedAt?: string
      
UpdatedAt?: string
      

Email?: string
      
Status?: UserFieldStatusEnum;
Origin?: UserFieldOriginEnum;
Is8Base?: boolean;
FirstName?: string
      
LastName?: string
      
Timezone?: string
      
Avatar?: IFileEntity;
Roles?: IRoleEntity[];
Notification?: INotificationEntity;
          }
      