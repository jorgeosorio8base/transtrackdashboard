import { useAlert, useLoading, useClientList, usePackageList, useStatusUpdateList, useAnalyticList, useNotificationList } from '@/src/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IClientEntity, IPackageEntity, IStatusUpdateEntity, IAnalyticEntity, INotificationEntity, ClientFilter, PackageFilter, StatusUpdateFilter, AnalyticFilter, NotificationFilter, SortOrder, IShipmentEntity, ClientSort, PackageSort, StatusUpdateSort, AnalyticSort, NotificationSort } from '@transtrackdashboard/core';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';

export type FilterTypes = 'client' | 'package' | 'statusUpdate' | 'analytic' | 'notification';

export interface RelationFilter {
  Shipment?: {
    AND?: ShipmentFilter[];
    OR?: ShipmentFilter[];
  };
  clientsNotifications?: {
    AND?: NotificationFilter[];
    OR?: NotificationFilter[];
  };
}

export interface HomeFilters {
  client: ClientFilter & RelationFilter;
  package: PackageFilter;
  statusUpdate: StatusUpdateFilter;
  analytic: AnalyticFilter;
  notification: NotificationFilter;
}

export interface HomeDataState {
  clients: {
    items: Array<IClientEntity & {
      Shipment?: IShipmentEntity;
      clientsNotifications?: INotificationEntity;
    }>;
    count: number;
    lastCursor?: string;
  } | null;
  packages: {
    items: IPackageEntity[];
    count: number;
    lastCursor?: string;
  } | null;
  statusUpdates: {
    items: IStatusUpdateEntity[];
    count: number;
    lastCursor?: string;
  } | null;
  analytics: {
    items: IAnalyticEntity[];
    count: number;
    lastCursor?: string;
  } | null;
  notifications: {
    items: INotificationEntity[];
    count: number;
    lastCursor?: string;
  } | null;
}

export interface PaginationState {
  first: number;
  after: string | null;
}

export interface HomeQuickStats {
  totalClients: number;
  totalPackages: number;
  totalStatusUpdates: number;
  totalAnalytics: number;
  totalNotifications: number;
}

export interface HomeComponentProps {
  dataState: HomeDataState;
  isLoading: boolean;
  quickStats: HomeQuickStats;
  filters: HomeFilters;
  onFilterChange: (filterType: FilterTypes, newFilter: HomeFilters[FilterTypes]) => void;
  onRefresh: () => void;
  onNextPage: (type: FilterTypes) => void;
  onError: (type: FilterTypes, error: Error) => void;
}

export default function HomePresenter() {
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();
  
  const [filters, setFilters] = useState<HomeFilters>({
    client: {},
    package: {},
    statusUpdate: {},
    analytic: {},
    notification: {}
  });

  const [dataState, setDataState] = useState<HomeDataState>({
    clients: null,
    packages: null,
    statusUpdates: null,
    analytics: null,
    notifications: null
  });

  const [pagination, setPagination] = useState<Record<FilterTypes, PaginationState>>({
    client: { first: 10, after: null },
    package: { first: 10, after: null },
    statusUpdate: { first: 10, after: null },
    analytic: { first: 10, after: null },
    notification: { first: 10, after: null }
  });

  const { data: clientsData, isLoading: clientsLoading, isError: clientsError, error: clientsErrorData } = useClientList({
    first: pagination.client.first,
    after: pagination.client.after,
    sort: [{ createdAt: SortOrder.Desc }] as ClientSort[],
    filter: filters.client
  });

  const { data: packagesData, isLoading: packagesLoading, isError: packagesError, error: packagesErrorData } = usePackageList({
    first: pagination.package.first,
    after: pagination.package.after,
    sort: [{ id: SortOrder.Desc }] as PackageSort[],
    filter: filters.package
  });

  const { data: statusUpdatesData, isLoading: statusUpdatesLoading, isError: statusUpdatesError, error: statusUpdatesErrorData } = useStatusUpdateList({
    first: pagination.statusUpdate.first,
    after: pagination.statusUpdate.after,
    sort: [{ id: SortOrder.Desc }] as StatusUpdateSort[],
    filter: filters.statusUpdate
  });

  const { data: analyticsData, isLoading: analyticsLoading, isError: analyticsError, error: analyticsErrorData } = useAnalyticList({
    first: pagination.analytic.first,
    after: pagination.analytic.after,
    sort: [{ id: SortOrder.Desc }] as AnalyticSort[],
    filter: filters.analytic
  });

  const { data: notificationsData, isLoading: notificationsLoading, isError: notificationsError, error: notificationsErrorData } = useNotificationList({
    first: pagination.notification.first,
    after: pagination.notification.after,
    sort: [{ id: SortOrder.Desc }] as NotificationSort[],
    filter: filters.notification
  });

  const handleFilterChange = useCallback((filterType: FilterTypes, newFilter: HomeFilters[FilterTypes]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newFilter
    }));
    setPagination(prev => ({
      ...prev,
      [filterType]: { first: 10, after: null }
    }));
  }, []);

  const handleNextPage = useCallback((type: FilterTypes) => {
    const currentData = dataState[type];
    if (currentData?.items.length && currentData.lastCursor) {
      setPagination(prev => ({
        ...prev,
        [type]: { ...prev[type], after: currentData.lastCursor }
      }));
    }
  }, [dataState]);

  const handleError = useCallback((type: FilterTypes, error: Error) => {
    const errorMessages: Record<FilterTypes, string> = {
      client: 'Error loading client data',
      package: 'Error loading package data',
      statusUpdate: 'Error loading status updates',
      analytic: 'Error loading analytics',
      notification: 'Error loading notifications'
    };

    showAlert({
      title: 'Error',
      message: `${errorMessages[type]}: ${error.message}`,
      severity: AlertSeverityEnum.Error,
      placement: AlertPlacementEnum.Top
    });
  }, [showAlert]);

  useEffect(() => {
    if (clientsError && clientsErrorData) handleError('client', clientsErrorData);
    if (packagesError && packagesErrorData) handleError('package', packagesErrorData);
    if (statusUpdatesError && statusUpdatesErrorData) handleError('statusUpdate', statusUpdatesErrorData);
    if (analyticsError && analyticsErrorData) handleError('analytic', analyticsErrorData);
    if (notificationsError && notificationsErrorData) handleError('notification', notificationsErrorData);
  }, [
    clientsError, clientsErrorData,
    packagesError, packagesErrorData,
    statusUpdatesError, statusUpdatesErrorData,
    analyticsError, analyticsErrorData,
    notificationsError, notificationsErrorData,
    handleError
  ]);

  const isLoading = useMemo(
    () =>
      clientsLoading ||
      packagesLoading ||
      statusUpdatesLoading ||
      analyticsLoading ||
      notificationsLoading,
    [clientsLoading, packagesLoading, statusUpdatesLoading, analyticsLoading, notificationsLoading]
  );

  const quickStats = useMemo(
    () => ({
      totalClients: dataState.clients?.count || 0,
      totalPackages: dataState.packages?.count || 0,
      totalStatusUpdates: dataState.statusUpdates?.count || 0,
      totalAnalytics: dataState.analytics?.count || 0,
      totalNotifications: dataState.notifications?.count || 0
    }),
    [dataState]
  );

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    setDataState({
      clients: clientsData ? {
        items: clientsData.items,
        count: clientsData.count,
        lastCursor: clientsData.items[clientsData.items.length - 1]?.Id
      } : null,
      packages: packagesData ? {
        items: packagesData.items,
        count: packagesData.count,
        lastCursor: packagesData.items[packagesData.items.length - 1]?.Id
      } : null,
      statusUpdates: statusUpdatesData ? {
        items: statusUpdatesData.items,
        count: statusUpdatesData.count,
        lastCursor: statusUpdatesData.items[statusUpdatesData.items.length - 1]?.Id
      } : null,
      analytics: analyticsData ? {
        items: analyticsData.items,
        count: analyticsData.count,
        lastCursor: analyticsData.items[analyticsData.items.length - 1]?.Id
      } : null,
      notifications: notificationsData ? {
        items: notificationsData.items,
        count: notificationsData.count,
        lastCursor: notificationsData.items[notificationsData.items.length - 1]?.Id
      } : null
    });
  }, [clientsData, packagesData, statusUpdatesData, analyticsData, notificationsData]);

  return (
  <HomeComponent
    dataState={dataState}
    isLoading={isLoading}
    quickStats={quickStats}
    filters={filters}
    onFilterChange={handleFilterChange}
    onRefresh={() => {
      setPagination({
        client: { first: 10, after: null },
        package: { first: 10, after: null },
        statusUpdate: { first: 10, after: null },
        analytic: { first: 10, after: null },
        notification: { first: 10, after: null }
      });
    }}
    onNextPage={handleNextPage}
    onError={handleError}
  />
);
}

HomePresenter.layout = 'AppLayout';