
            import {IUserUseCase, UserUseCase, IFileUseCase, FileUseCase, IRoleUseCase, RoleUseCase, IClientUseCase, ClientUseCase, IPackageUseCase, PackageUseCase, IShipmentUseCase, ShipmentUseCase, IDriverUseCase, DriverUseCase, INotificationUseCase, NotificationUseCase, IStatusUpdateUseCase, StatusUpdateUseCase, IAnalyticUseCase, AnalyticUseCase } from '@transtrackdashboard/core';
            
            export interface IUseCases {
                User: IUserUseCase, File: IFileUseCase, Role: IRoleUseCase, Client: IClientUseCase, Package: IPackageUseCase, Shipment: IShipmentUseCase, Driver: IDriverUseCase, Notification: INotificationUseCase, StatusUpdate: IStatusUpdateUseCase, Analytic: IAnalyticUseCase
            }

            export const UseCases: IUseCases = {
                User: new UserUseCase(), File: new FileUseCase(), Role: new RoleUseCase(), Client: new ClientUseCase(), Package: new PackageUseCase(), Shipment: new ShipmentUseCase(), Driver: new DriverUseCase(), Notification: new NotificationUseCase(), StatusUpdate: new StatusUpdateUseCase(), Analytic: new AnalyticUseCase()
            };
        