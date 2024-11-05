import { Card, CardBody, CardFooter, CardHeader, Link, Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { HomeComponentProps } from './';

export function HomeComponent({
  dataState,
  isLoading,
  quickStats,
  onFilterChange,
  onRefresh,
  onNextPage
}: HomeComponentProps) {
  return (
    <main className="grid grid-cols-12 gap-6 p-6">
      <section className="col-span-12 p-4">
        <header className='w-full flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-[hsl(var(--app-foreground-900))]'>
              Welcome to TransTrack Dashboard
            </h1>
            <Button onClick={onRefresh} isLoading={isLoading}>
              <Icon icon="mdi:refresh" />
              Refresh Data
            </Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <section className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold text-[hsl(var(--app-foreground-800))]'>
                Client Management
              </h2>
              <p className='text-[hsl(var(--app-foreground-600))]'>
                Manage and track client information, shipping preferences, and historical data.
              </p>
              <Link 
                href='/manage-clients'
                className='text-[hsl(var(--app-primary))] hover:text-[hsl(var(--app-primary-600))] flex items-center gap-2'
                onClick={() => onFilterChange('client')}
              >
                <Icon icon='hugeicons:user-list' width={20} height={20} />
                Manage Clients
              </Link>
            </section>
            <section className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold text-[hsl(var(--app-foreground-800))]'>
                Package Tracking
              </h2>
              <p className='text-[hsl(var(--app-foreground-600))]'>
                Real-time visibility into package location and status from origin to destination.
              </p>
              <Link 
                href='/track-packages'
                className='text-[hsl(var(--app-primary))] hover:text-[hsl(var(--app-primary-600))] flex items-center gap-2'
                onClick={() => onFilterChange('package')}
              >
                <Icon icon='hugeicons:user-search-01' width={20} height={20} />
                Track Packages
              </Link>
            </section>
            <section className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold text-[hsl(var(--app-foreground-800))]'>
                Status Updates
              </h2>
              <p className='text-[hsl(var(--app-foreground-600))]'>
                Seamlessly update package status, including delays, exceptions, and confirmations.
              </p>
              <Link 
                href='/update-status'
                className='text-[hsl(var(--app-primary))] hover:text-[hsl(var(--app-primary-600))] flex items-center gap-2'
                onClick={() => onFilterChange('statusUpdate')}
              >
                <Icon icon='hugeicons:user-status' width={20} height={20} />
                Update Status
              </Link>
            </section>
          </div>
        </header>
      </section>

      <section className="col-span-12 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                  Active Clients
                </span>
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-[hsl(var(--app-foreground-100/20))]" />
                ) : (
                  <span className="text-2xl font-semibold text-[hsl(var(--app-foreground-900))]">
                    {quickStats.totalClients}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-[hsl(var(--app-primary-100/20))]">
                <Icon 
                  icon="hugeicons:chart-increase" 
                  className="w-6 h-6 text-[hsl(var(--app-primary-500))]" 
                />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                  Packages in Transit
                </span>
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-[hsl(var(--app-foreground-100/20))]" />
                ) : (
                  <span className="text-2xl font-semibold text-[hsl(var(--app-foreground-900))]">
                    {quickStats.totalPackages}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-[hsl(var(--app-secondary-100/20))]">
                <Icon 
                  icon="hugeicons:chart-line-data-02" 
                  className="w-6 h-6 text-[hsl(var(--app-secondary-500))]" 
                />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                  On-Time Deliveries
                </span>
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-[hsl(var(--app-foreground-100/20))]" />
                ) : (
                  <span className="text-2xl font-semibold text-[hsl(var(--app-foreground-900))]">
                    {quickStats.totalStatusUpdates}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-[hsl(var(--app-success-100/20))]">
                <Icon 
                  icon="hugeicons:chart-column" 
                  className="w-6 h-6 text-[hsl(var(--app-success-500))]" 
                />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                  Customer Satisfaction
                </span>
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-[hsl(var(--app-foreground-100/20))]" />
                ) : (
                  <span className="text-2xl font-semibold text-[hsl(var(--app-foreground-900))]">
                    {quickStats.totalAnalytics}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-[hsl(var(--app-warning-100/20))]">
                <Icon 
                  icon="hugeicons:chart-radar" 
                  className="w-6 h-6 text-[hsl(var(--app-warning-500))]" 
                />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardBody className="flex flex-row items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                  Notifications
                </span>
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-[hsl(var(--app-foreground-100/20))]" />
                ) : (
                  <span className="text-2xl font-semibold text-[hsl(var(--app-foreground-900))]">
                    {quickStats.totalNotifications}
                  </span>
                )}
              </div>
              <div className="p-3 rounded-full bg-[hsl(var(--app-info-100/20))]">
                <Icon 
                  icon="hugeicons:bell" 
                  className="w-6 h-6 text-[hsl(var(--app-info-500))]" 
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="col-span-12 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardHeader className="flex gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--app-primary-100))]">
                <Icon 
                  icon="hugeicons:user-multiple" 
                  className="text-[hsl(var(--app-primary-500))] w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--app-foreground-900))]">
                Client Management
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-[hsl(var(--app-foreground-700))]">
                Manage and track client information, shipping preferences, and historical data.
              </p>
              {dataState.clients && (
                <p className="mt-2 text-sm text-[hsl(var(--app-foreground-600))]">
                  Total Clients: {dataState.clients.count}
                </p>
              )}
            </CardBody>
            <CardFooter>
              <Link 
                href="/clients" 
                className="text-[hsl(var(--app-primary-500))] hover:text-[hsl(var(--app-primary-600))] transition-colors"
                onClick={() => onNextPage('client')}
              >
                Manage Clients
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardHeader className="flex gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--app-success-100))]">
                <Icon 
                  icon="hugeicons:package" 
                  className="text-[hsl(var(--app-success-500))] w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--app-foreground-900))]">
                Package Tracking
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-[hsl(var(--app-foreground-700))]">
                Real-time visibility into package location and status from origin to destination.
              </p>
              {dataState.packages && (
                <p className="mt-2 text-sm text-[hsl(var(--app-foreground-600))]">
                  Packages in Transit: {dataState.packages.count}
                </p>
              )}
            </CardBody>
            <CardFooter>
              <Link 
                href="/packages" 
                className="text-[hsl(var(--app-success-500))] hover:text-[hsl(var(--app-success-600))] transition-colors"
                onClick={() => onNextPage('package')}
              >
                Track Packages
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-[hsl(var(--app-background-50))] border border-[hsl(var(--app-foreground-100/20))] rounded-lg h-full">
            <CardHeader className="flex gap-3">
              <div className="p-2 rounded-lg bg-[hsl(var(--app-warning-100))]">
                <Icon 
                  icon="hugeicons:notification-status" 
                  className="text-[hsl(var(--app-warning-500))] w-6 h-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-[hsl(var(--app-foreground-900))]">
                Status Updates
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-[hsl(var(--app-foreground-700))]">
                Seamlessly update package status, including delays, exceptions, and confirmations.
              </p>
              {dataState.statusUpdates && (
                <p className="mt-2 text-sm text-[hsl(var(--app-foreground-600))]">
                  Recent Updates: {dataState.statusUpdates.count}
                </p>
              )}
            </CardBody>
            <CardFooter>
              <Link 
                href="/status-updates" 
                className="text-[hsl(var(--app-warning-500))] hover:text-[hsl(var(--app-warning-600))] transition-colors"
                onClick={() => onNextPage('statusUpdate')}
              >
                Update Status
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
