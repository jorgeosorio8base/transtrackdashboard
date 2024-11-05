import { Card, CardHeader, CardBody, CircularProgress, Link, Button, Chip } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { PackageTrackingComponentProps } from './';
import { IPackageEntity, IStatusUpdateEntity } from '@transtrackdashboard/core';

export function PackageTrackingComponent({
  activePackage,
  packages,
  totalPackages,
  statusUpdates,
  totalStatusUpdates,
  isLoadingPackage,
  isLoadingPackages,
  isLoadingStatusUpdates,
  mapState,
  onMapStateChange,
  onPackageSelect,
  onMapViewToggle,
  onTimelineExpand,
  onRefreshData
}: PackageTrackingComponentProps) {
  return (
    <main className="grid grid-cols-12 gap-4 p-4">
      <section className="col-span-12">
        <div className="flex flex-col gap-4 w-full p-4 bg-[hsl(var(--app-background-50))] rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[hsl(var(--app-foreground-900))]">
              Package Tracking
            </h1>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              isLoading={isLoadingPackage}
              onClick={onRefreshData}
            >
              <Icon
                icon="hugeicons:package-process"
                className="text-[hsl(var(--app-foreground-600))] w-5 h-5"
              />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              icon="hugeicons:package-moving"
              className="text-[hsl(var(--app-primary-500))] w-6 h-6"
            />
            <div className="flex flex-col">
              <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                Tracking Number
              </span>
              {isLoadingPackage ? (
                <div className="h-4 w-32 bg-[hsl(var(--app-background-200))] rounded animate-pulse" />
              ) : activePackage ? (
                <span className="text-base font-semibold text-[hsl(var(--app-foreground-900))]">
                  {activePackage?.id}
                </span>
              ) : (
                <span className="text-sm text-[hsl(var(--app-foreground-400))]">
                  No package selected
                </span>
              )}
            </div>
            {activePackage && (
              <Chip
                size="sm"
                variant="flat"
                color="primary"
                className="ml-auto"
              >
                {activePackage.status}
              </Chip>
            )}
          </div>
        </div>
      </section>

      <section className="col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
          <div className="PackageTrackingActiveContent">
            <div className="PackageTrackingActiveList space-y-2">
              {isLoadingPackages ? (
                <div className="flex justify-center p-4">
                  <CircularProgress size="sm" aria-label="Loading packages" />
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center p-4 text-[hsl(var(--app-foreground-500))]">
                  No active packages found
                </div>
              ) : (
                packages.map((pkg) => (
                  <Link
                    key={pkg.id}
                    className={`block p-4 rounded-lg border border-[hsl(var(--app-border))] hover:bg-[hsl(var(--app-background-100))] ${activePackage?.id === pkg.id ? 'bg-[hsl(var(--app-background-100))]' : ''}`}
                    onClick={() => onPackageSelect(pkg.id ?? '')}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        icon="hugeicons:package-moving" 
                        className="text-[hsl(var(--app-primary))] text-xl"
                      />
                      <span className="font-medium">{pkg.id}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="PackageTrackingDetailsContent">
            <Card className="PackageTrackingDetailsCard mb-4">
              <CardHeader className="PackageTrackingDetailsHeader">
                {isLoadingPackage ? (
                  <CircularProgress size="sm" aria-label="Loading package details" />
                ) : activePackage ? (
                  <span className="PackageTrackingPackageId font-semibold">
                    Package {activePackage?.id}
                  </span>
                ) : (
                  <span className="text-[hsl(var(--app-foreground-500))]">
                    Select a package to view details
                  </span>
                )}
              </CardHeader>
              {activePackage && (
                <CardBody className="PackageTrackingDetailsBody space-y-4">
                  <div className="PackageTrackingDetailsOrigin flex items-center gap-2">
                    <Icon 
                      icon="hugeicons:location-01" 
                      className="text-[hsl(var(--app-primary))] text-xl"
                    />
                    <span className="font-medium">Origin:</span>
                    <span>{activePackage.origin}</span>
                  </div>
                  <div className="PackageTrackingDetailsDestination flex items-center gap-2">
                    <Icon 
                      icon="hugeicons:location-02" 
                      className="text-[hsl(var(--app-primary))] text-xl"
                    />
                    <span className="font-medium">Destination:</span>
                    <span>{activePackage.destination}</span>
                  </div>
                </CardBody>
              )}
            </Card>

            <Card className="PackageTrackingTimelineCard">
              <CardHeader className="PackageTrackingTimelineHeader">
                <span className="PackageTrackingTimelineTitle font-semibold">
                  Tracking History
                </span>
              </CardHeader>
              <CardBody className="PackageTrackingTimelineBody">
                {isLoadingStatusUpdates ? (
                  <div className="flex justify-center p-4">
                    <CircularProgress size="sm" aria-label="Loading status updates" />
                  </div>
                ) : statusUpdates.length === 0 ? (
                  <div className="text-center p-4 text-[hsl(var(--app-foreground-500))]">
                    No status updates available
                  </div>
                ) : (
                  <div className="space-y-4">
                    {statusUpdates.map((update) => (
                      <div key={update.id} className="PackageTrackingTimelineItem flex gap-4">
                        <div className="PackageTrackingTimelineIcon">
                          <Icon 
                            icon="hugeicons:package-delivered" 
                            className="text-[hsl(var(--app-primary))] text-xl"
                          />
                        </div>
                        <div className="PackageTrackingTimelineContent flex-1">
                          <span className="PackageTrackingTimelineLocation block font-medium">
                            {update.status}
                          </span>
                          <span className="PackageTrackingTimelineTime text-sm text-[hsl(var(--app-foreground-500))]">
                            {new Date(update.timestamp ?? '').toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
