import { Card, CardHeader, CardBody, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Chip, Button, CircularProgress, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { DriverAssignmentsDashboardComponentProps } from './';
import { DriverSort, ShipmentSort, DriverStatusEnum, ShipmentPriorityEnum, SortOrder } from '@transtrackdashboard/core';

const getStatusColor = (status: typeof DriverStatusEnum[keyof typeof DriverStatusEnum]) => {
  switch (status) {
    case DriverStatusEnum.Available:
      return 'success';
    case DriverStatusEnum.OnBreak:
      return 'warning';
    default:
      return 'default';
  };
};

const getPriorityColor = (priority: typeof ShipmentPriorityEnum[keyof typeof ShipmentPriorityEnum]) => {
  switch (priority) {
    case ShipmentPriorityEnum.High:
      return 'danger';
    case ShipmentPriorityEnum.Urgent:
      return 'warning';
    default:
      return 'default';
  };
};

export function DriverAssignmentsDashboardComponent({
  driversData,
  shipmentsData,
  driverAvailability,
  performanceMetrics,
  isLoading,
  handleAssignShipment,
  handleUpdateDriverStatus,
  handleOptimizeRoute,
  handleRefreshData,
  sortOrder,
  handleSortOrder,
  handleShipmentSort
}: DriverAssignmentsDashboardComponentProps) {
  return (
    <main className="grid grid-cols-12 gap-4 p-4">
      <header className="col-span-12 flex justify-between items-center w-full p-4 bg-[hsl(var(--app-background-50))] border-b border-[hsl(var(--app-foreground-100))]">
        <h1 className="text-2xl font-bold text-[hsl(var(--app-foreground-900))]">
          Driver Assignments Dashboard
        </h1>
        <ButtonGroup>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Icon icon="hugeicons:refresh" width={20} />}
            isLoading={isLoading}
            onClick={handleRefreshData}
          >
            Refresh
          </Button>
        </ButtonGroup>
      </header>

      {isLoading ? (
        <div className="col-span-12 flex items-center justify-center min-h-[400px]">
          <CircularProgress size="lg" label="Loading data..." />
        </div>
      ) : (
        <>
          <Card className="col-span-12 md:col-span-4 h-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex gap-3">
                <Icon icon="hugeicons:delivery-truck-01" className="text-2xl" />
                <h3 className="text-xl font-semibold">Drivers</h3>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light">Sort</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort drivers"
                  onAction={(key) => handleSortOrder([{ [key as keyof typeof sortOrder[0]]: sortOrder[0][key as keyof typeof sortOrder[0]] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc }])}
                >
                  <DropdownItem key="name">Name</DropdownItem>
                  <DropdownItem key="availability_status">Status</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              {driversData?.items.map((driver) => (
                <div key={driver.Id} className="flex justify-between items-center mb-2 p-2 border-b last:border-b-0">
                  <span className="font-medium">{driver.name}</span>
                  <Dropdown>
                    <DropdownTrigger>
                      <Chip
                        color={getStatusColor(driverAvailability.find(d => d.driverId === driver.Id)?.status || DriverStatusEnum.Available)}
                        size="sm"
                      >
                        {driverAvailability.find(d => d.driverId === driver.Id)?.status || 'Available'}
                      </Chip>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Update driver status"
                      onAction={(key) => handleUpdateDriverStatus(driver.Id, key as DriverStatusEnum)}
                    >
                      <DropdownItem key={DriverStatusEnum.Available}>Available</DropdownItem>
                      <DropdownItem key={DriverStatusEnum.OnBreak}>On Break</DropdownItem>
                      <DropdownItem key={DriverStatusEnum.Assigned}>Assigned</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="col-span-12 md:col-span-8 h-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex gap-3">
                <Icon icon="hugeicons:delivery-box-01" className="text-2xl" />
                <h3 className="text-xl font-semibold">Unassigned Shipments</h3>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light">Sort</Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Sort shipments"
                  onAction={(key) => handleShipmentSort([{ [key as keyof typeof sortOrder[0]]: sortOrder[0][key as keyof typeof sortOrder[0]] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc }])}
                >
                  <DropdownItem key="Id">ID</DropdownItem>
                  <DropdownItem key="Destination">Destination</DropdownItem>
                  <DropdownItem key="Priority">Priority</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <Table aria-label="Unassigned shipments table">
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>DESTINATION</TableColumn>
                  <TableColumn>PRIORITY</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {shipmentsData?.items.map((shipment) => (
                    <TableRow key={shipment.Id}>
                      <TableCell>{shipment.Id}</TableCell>
                      <TableCell>{shipment.Destination || 'Unknown'}</TableCell>
                      <TableCell>
                        <Chip
                          color={getPriorityColor(shipment.Priority as ShipmentPriorityEnum)}
                          size="sm"
                        >
                          {shipment.Priority}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button size="sm" color="primary" variant="flat">Assign</Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Assign shipment"
                            onAction={(driverId) => handleAssignShipment(driverId as string, shipment.Id || '')}
                          >
                            {driversData?.items.map((driver) => (
                              <DropdownItem key={driver.Id}>{driver.name}</DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          <Card className="col-span-12">
            <CardHeader>
              <h3 className="text-xl font-semibold">Performance Metrics</h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <Table aria-label="Driver performance metrics">
                  <TableHeader>
                    <TableColumn>DRIVER</TableColumn>
                    <TableColumn>DELIVERY SUCCESS RATE</TableColumn>
                    <TableColumn>ON-TIME DELIVERY RATE</TableColumn>
                    <TableColumn>AVERAGE DELIVERY TIME</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {performanceMetrics.map((metric) => (
                      <TableRow key={metric.driverId}>
                        <TableCell>{driversData?.items.find(d => d.Id === metric.driverId)?.name ?? 'Unknown Driver'}</TableCell>
                        <TableCell>{((metric.deliverySuccessRate ?? 0) * 100).toFixed(2)}%</TableCell>
                        <TableCell>{((metric.onTimeDeliveryRate ?? 0) * 100).toFixed(2)}%</TableCell>
                        <TableCell>{(metric.averageDeliveryTime ?? 0).toFixed(2)} minutes</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-12">
            <CardHeader>
              <h3 className="text-xl font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardBody className="flex gap-4">
              <Button
                color="primary"
                startContent={<Icon icon="hugeicons:delivery-tracking-01" />}
                onClick={() => handleOptimizeRoute(driversData?.items[0]?.Id ?? '')}
              >
                Optimize Routes
              </Button>
              <Button
                color="secondary"
                startContent={<Icon icon="hugeicons:delivery-sent-01" />}
                onClick={handleRefreshData}
              >
                Send Notifications
              </Button>
            </CardBody>
          </Card>
        </>
      )}
    </main>
  );
}
