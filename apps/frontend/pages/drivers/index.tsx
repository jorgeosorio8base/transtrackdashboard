import { useAlert, useLoading, useDriverList, useShipmentList, useCreateNotification } from '@/src/hooks';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DriverSort, ShipmentSort, SortOrder, ShipmentPriorityEnum, DriverStatusEnum, IDriverEntity, IShipmentEntity, IPackageEntity, IClientEntity } from '@transtrackdashboard/core';

export interface DriverAvailabilityStatus {
  driverId: string;
  status: typeof DriverStatusEnum[keyof typeof DriverStatusEnum];
  lastUpdate: Date;
}

export interface PerformanceMetric {
  driverId: string;
  deliverySuccessRate: number;
  onTimeDeliveryRate: number;
  averageDeliveryTime: number;
}

export interface DriverAssignmentsDashboardComponentProps {
  driversData: {
    items: IDriverEntity[];
    count: number;
  } | null;
  shipmentsData: {
    items: IShipmentEntity[];
    count: number;
  } | null;
  driverAvailability: DriverAvailabilityStatus[];
  performanceMetrics: PerformanceMetric[];
  isLoading: boolean;
  handleAssignShipment: (driverId: string, shipmentId: string) => Promise<void>;
  handleUpdateDriverStatus: (driverId: string, status: typeof DriverStatusEnum[keyof typeof DriverStatusEnum]) => Promise<void>;
  handleOptimizeRoute: (driverId: string) => Promise<void>;
  handleRefreshData: () => void;
  sortOrder: DriverSort[];
  handleSortOrder: (sort: DriverSort[]) => void;
  handleShipmentSort: (sort: ShipmentSort[]) => void;
}

export default function DriverAssignmentsDashboardPresenter() {
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();
  
  const [sortOrder, setSortOrder] = useState<DriverSort[]>([{ availability_status: SortOrder.Asc }]);
  const [shipmentSort, setShipmentSort] = useState<ShipmentSort[]>([{ priority: SortOrder.Desc }]);
  const [driverAvailability, setDriverAvailability] = useState<DriverAvailabilityStatus[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  
  const [driversDataState, setDriversDataState] = useState<{
    items: IDriverEntity[];
    count: number;
  } | null>(null);
  
  const [shipmentsDataState, setShipmentsDataState] = useState<{
    items: IShipmentEntity[];
    count: number;
  } | null>(null);
  
  const driversFilter = useMemo(() => ({
    AND: [
      { availability_status: { equals: DriverStatusEnum.Available } }
    ]
  }), []);
  
  const shipmentsFilter = useMemo(() => ({
    OR: [
      { priority: { equals: ShipmentPriorityEnum.High } },
      { priority: { equals: ShipmentPriorityEnum.Urgent } }
    ]
  }), []);
  
  const { data: driversData, isLoading: driversLoading, isError: driversError } = useDriverList({
    filter: driversFilter,
    sort: sortOrder
  });
  
  const { data: shipmentsData, isLoading: shipmentsLoading, isError: shipmentsError, refetch: refetchShipments } = useShipmentList({
    filter: shipmentsFilter,
    sort: shipmentSort
  });
  
  const { mutate: createNotification, isPending: isCreatingNotification } = useCreateNotification();
  
  useEffect(() => {
    if (driversLoading || shipmentsLoading || isCreatingNotification) {
      showLoading();
    } else {
      hideLoading();
      
      if (driversError || shipmentsError) {
        showAlert({
          title: 'Error',
          message: 'An error occurred while fetching data.',
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight
        });
      }
    }
  }, [driversLoading, shipmentsLoading, isCreatingNotification, driversError, shipmentsError, hideLoading, showAlert, showLoading]);
  
  useEffect(() => {
    if (driversData) {
      setDriversDataState({
        items: driversData.items || [],
        count: driversData.count || 0
      });
    }
  }, [driversData]);
  
  useEffect(() => {
    if (shipmentsData) {
      setShipmentsDataState({
        items: shipmentsData.items || [],
        count: shipmentsData.count || 0
      });
    }
  }, [shipmentsData]);
  
  const handleAssignShipment = useCallback(
    async (driverId: string, shipmentId: string) => {
      try {
        const driver = driversDataState?.items.find(d => d.Id === driverId);
        const shipment = shipmentsDataState?.items.find(s => s.Id === shipmentId);
        
        if (!driver || !shipment) {
          showAlert({
            title: 'Error',
            message: 'Invalid driver or shipment selection.',
            severity: AlertSeverityEnum.Error,
            placement: AlertPlacementEnum.TopRight
          });
          return;
        }
        
        createNotification(
          {
            content: `Shipment ${shipmentId} has been assigned to driver ${driver.name}`,
            sent_at: new Date().toISOString()
          },
          {
            onSuccess: () => {
              showAlert({
                title: 'Success',
                message: 'Shipment assigned successfully.',
                severity: AlertSeverityEnum.Success,
                placement: AlertPlacementEnum.TopRight
              });
              refetchShipments();
            },
            onError: (error) => {
              const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
              showAlert({
                title: 'Error',
                message: errorMessage,
                severity: AlertSeverityEnum.Error,
                placement: AlertPlacementEnum.TopRight
              });
            }
          }
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight
        });
      }
    },
    [driversDataState, shipmentsDataState, createNotification, refetchShipments, showAlert]
  );
  
  const handleUpdateDriverStatus = useCallback(
    async (driverId: string, status: typeof DriverStatusEnum[keyof typeof DriverStatusEnum]) => {
      try {
        const updatedAvailability = driverAvailability.map(availability =>
          availability.driverId === driverId
            ? { ...availability, status, lastUpdate: new Date() }
            : availability
        );
        
        setDriverAvailability(updatedAvailability);
        
        showAlert({
          title: 'Success',
          message: 'Driver status updated successfully.',
          severity: AlertSeverityEnum.Success,
          placement: AlertPlacementEnum.TopRight
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight
        });
      }
    },
    [driverAvailability, showAlert]
  );
  
  const handleOptimizeRoute = useCallback(
    async (driverId: string) => {
      try {
        const driver = driversDataState?.items.find(d => d.Id === driverId);
        
        if (!driver) {
          showAlert({
            title: 'Error',
            message: 'Invalid driver selection.',
            severity: AlertSeverityEnum.Error,
            placement: AlertPlacementEnum.TopRight
          });
          return;
        }
        
        createNotification(
          {
            content: `Route optimization initiated for driver ${driver.name}`,
            sent_at: new Date().toISOString()
          },
          {
            onSuccess: () => {
              showAlert({
                title: 'Success',
                message: 'Route optimization completed.',
                severity: AlertSeverityEnum.Success,
                placement: AlertPlacementEnum.TopRight
              });
            },
            onError: (error) => {
              const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
              showAlert({
                title: 'Error',
                message: errorMessage,
                severity: AlertSeverityEnum.Error,
                placement: AlertPlacementEnum.TopRight
              });
            }
          }
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight
        });
      }
    },
    [driversDataState, createNotification, showAlert]
  );
  
  const handleSortOrder = useCallback((sort: DriverSort[]) => {
    setSortOrder(sort);
  }, []);
  
  const handleShipmentSort = useCallback((sort: ShipmentSort[]) => {
    setShipmentSort(sort);
  }, []);
  
  const handleRefreshData = useCallback(() => {
    refetchShipments();
  }, [refetchShipments]);
  
  return (
  <DriverAssignmentsDashboardComponent
    driversData={driversDataState}
    shipmentsData={shipmentsDataState}
    driverAvailability={driverAvailability}
    performanceMetrics={performanceMetrics}
    isLoading={driversLoading || shipmentsLoading || isCreatingNotification}
    handleAssignShipment={handleAssignShipment}
    handleUpdateDriverStatus={handleUpdateDriverStatus}
    handleOptimizeRoute={handleOptimizeRoute}
    handleRefreshData={handleRefreshData}
    sortOrder={sortOrder}
    handleSortOrder={handleSortOrder}
    handleShipmentSort={handleShipmentSort}
  />
);;
}