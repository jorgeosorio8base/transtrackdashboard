import { usePackage, usePackageList, useStatusUpdateList, useAlert, useLoading } from '@/src/hooks';
import { IPackageEntity, IStatusUpdateEntity, QueryPackagesListArgs, QueryStatusUpdatesListArgs, PackageSort, PackageFilter, StatusUpdateSort, StatusUpdateFilter, SortOrder } from '@transtrackdashboard/core';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

export interface PackageTrackingMapState {
  isExpanded: boolean;
  center: { lat: number; lng: number };
  zoom: number;
}

export interface PackageTrackingComponentProps {
  activePackage: IPackageEntity | null;
  packages: IPackageEntity[];
  totalPackages: number;
  statusUpdates: IStatusUpdateEntity[];
  totalStatusUpdates: number;
  isLoadingPackage: boolean;
  isLoadingPackages: boolean;
  isLoadingStatusUpdates: boolean;
  mapState: PackageTrackingMapState;
  onMapStateChange: (state: PackageTrackingMapState) => void;
  onPackageSelect: (packageId: string) => void;
  onMapViewToggle: () => void;
  onTimelineExpand: () => void;
  onRefreshData: () => void;
}

export default function PackageTrackingPresenter() {
  const router = useRouter();
  const { packageId } = router.query as { packageId?: string };
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();

  const [mapState, setMapState] = useState<PackageTrackingMapState>({
    isExpanded: false,
    center: { lat: 0, lng: 0 },
    zoom: 10
  });

  const [packagesPagination, setPackagesPagination] = useState<{ first: number; skip: number }>({
    first: 10,
    skip: 0
  });

  const [statusUpdatesPagination, setStatusUpdatesPagination] = useState<{ first: number; skip: number }>({
    first: 10,
    skip: 0
  });

  const packagesSort = useMemo<PackageSort[]>(
    () => [{ updatedAt: SortOrder.Desc }],
    []
  );

  const statusUpdatesSort = useMemo<StatusUpdateSort[]>(
    () => [{ timestamp: SortOrder.Desc }, { createdAt: SortOrder.Desc }],
    []
  );

  const { data: packageData, isLoading: isLoadingPackage, error: packageError } = usePackage(
    packageId ? { id: packageId } : null
  );

  const { data: packagesData, isLoading: isLoadingPackages, refetch: refetchPackages, error: packagesError } = usePackageList({
    first: packagesPagination.first,
    skip: packagesPagination.skip,
    withDeleted: false,
    sort: packagesSort
  });

  const statusUpdatesFilter = useMemo<StatusUpdateFilter>(
    () => ({
      package_id: packageId ? { equals: packageId } : undefined
    }),
    [packageId]
  );

  const { data: statusUpdatesData, isLoading: isLoadingStatusUpdates, refetch: refetchStatusUpdates, error: statusUpdatesError } = useStatusUpdateList({
    filter: statusUpdatesFilter,
    sort: statusUpdatesSort,
    first: statusUpdatesPagination.first,
    skip: statusUpdatesPagination.skip
  });

  const isLoading = useMemo(
    () => isLoadingPackage || isLoadingPackages || isLoadingStatusUpdates,
    [isLoadingPackage, isLoadingPackages, isLoadingStatusUpdates]
  );

  const errors = useMemo(
    () => ({
      packageError,
      packagesError,
      statusUpdatesError,
      hasErrors: Boolean(packageError || packagesError || statusUpdatesError)
    }),
    [packageError, packagesError, statusUpdatesError]
  );

  const handlePackageSelect = useCallback(
    (packageId: string) => {
      router.push(`/packages/tracking/${packageId}`);
    },
    [router]
  );

  const handleMapStateChange = useCallback(
    (newState: PackageTrackingMapState) => {
      setMapState(newState);
    },
    []
  );

  const handleMapViewToggle = useCallback(
    () => {
      setMapState((prev) => ({ ...prev, isExpanded: !prev.isExpanded }));
    },
    []
  );

  const handleTimelineExpand = useCallback(
    () => {
      setStatusUpdatesPagination((prev) => ({
        ...prev,
        first: prev.first + 10
      }));
    },
    []
  );

  const handleRefreshData = useCallback(
    async () => {
      try {
        showLoading();
        await Promise.all([refetchPackages(), refetchStatusUpdates()]);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while refreshing data.';

        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.Top
        });
      } finally {
        hideLoading();
      }
    },
    [refetchPackages, refetchStatusUpdates, showAlert, showLoading, hideLoading]
  );

  useEffect(() => {
    if (isLoading) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [isLoading, showLoading, hideLoading]);

  useEffect(() => {
    if (errors.hasErrors) {
      showAlert({
        title: 'Error',
        message: 'Failed to load required data',
        severity: AlertSeverityEnum.Error,
        placement: AlertPlacementEnum.Top
      });
    }
  }, [errors.hasErrors, showAlert]);

  useEffect(() => {
    if (
      packageData?.location?.latitude?.toString() &&
      packageData?.location?.longitude?.toString() &&
      packageData?.location?.latitude != null &&
      packageData?.location?.longitude != null
    ) {
      setMapState((prev) => ({
        ...prev,
        center: {
          lat: packageData.location.latitude,
          lng: packageData.location.longitude
        }
      }));
    }
  }, [packageData]);

    return (
    <PackageTrackingComponent
      activePackage={packageData}
      packages={packagesData?.items ?? []}
      totalPackages={packagesData?.total ?? 0}
      statusUpdates={statusUpdatesData?.items ?? []}
      totalStatusUpdates={statusUpdatesData?.total ?? 0}
      isLoadingPackage={isLoadingPackage}
      isLoadingPackages={isLoadingPackages}
      isLoadingStatusUpdates={isLoadingStatusUpdates}
      mapState={mapState}
      onMapStateChange={handleMapStateChange}
      onPackageSelect={handlePackageSelect}
      onMapViewToggle={handleMapViewToggle}
      onTimelineExpand={handleTimelineExpand}
      onRefreshData={handleRefreshData}
    />
  );
}

PackageTrackingPresenter.layout = 'AppLayout';