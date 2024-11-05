import { Card, CardHeader, CardBody, CircularProgress, Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsDashboardComponentProps, DateRangeType, ExportFormat } from './';
import { IAnalyticEntity } from '@transtrackdashboard/core';

export function AnalyticsDashboardComponent({
  analyticsData,
  isLoading,
  isError,
  dateRange,
  dateRangeType,
  exportFormat,
  handleDateRangeChange,
  handleExportReport,
  formatMetricValue,
  calculatePercentageChange
}: AnalyticsDashboardComponentProps) {
  return (
    <main className="grid grid-cols-12 gap-4 p-4">
      <section className="col-span-12">
        <div className="flex justify-between items-center w-full mb-6 gap-4">
          <h1 className="text-2xl font-bold text-[hsl(var(--app-foreground-900))]">
            Analytics Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <ButtonGroup variant="flat" radius="sm">
              <Button
                size="sm"
                className={dateRangeType === DateRangeType.LAST_7_DAYS ? 'bg-[hsl(var(--app-primary-100))]' : ''}
                onClick={() => handleDateRangeChange(DateRangeType.LAST_7_DAYS)}
              >
                Last 7 Days
              </Button>
              <Button
                size="sm"
                className={dateRangeType === DateRangeType.LAST_30_DAYS ? 'bg-[hsl(var(--app-primary-100))]' : ''}
                onClick={() => handleDateRangeChange(DateRangeType.LAST_30_DAYS)}
              >
                Last 30 Days
              </Button>
              <Button
                size="sm"
                className={dateRangeType === DateRangeType.CUSTOM_RANGE ? 'bg-[hsl(var(--app-primary-100))]' : ''}
                onClick={() => handleDateRangeChange(DateRangeType.CUSTOM_RANGE)}
              >
                Custom Range
              </Button>
            </ButtonGroup>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color="primary"
                  size="sm"
                  startContent={
                    <Icon
                      icon="hugeicons:analytics-01"
                      className="text-lg"
                    />
                  }
                  isLoading={isLoading}
                >
                  Export Report
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Export formats"
                onAction={(key) => handleExportReport(key as ExportFormat)}
              >
                <DropdownItem key={ExportFormat.PDF} startContent={<Icon icon="hugeicons:document-code" />}>
                  PDF
                </DropdownItem>
                <DropdownItem key={ExportFormat.CSV} startContent={<Icon icon="hugeicons:document-attachment" />}>
                  CSV
                </DropdownItem>
                <DropdownItem key={ExportFormat.EXCEL} startContent={<Icon icon="hugeicons:document-validation" />}>
                  Excel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </section>

      <section className="col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <Card key={index} className="w-full h-[120px] bg-[hsl(var(--app-background-50))] p-4">
                <div className="flex items-center justify-center h-full">
                  <CircularProgress size="lg" aria-label="Loading..." />
                </div>
              </Card>
            ))
          ) : isError || !analyticsData ? (
            <Card className="w-full col-span-3 p-4 bg-[hsl(var(--app-background-50))]">
              <div className="flex items-center justify-center h-[120px]">
                <span className="text-[hsl(var(--app-foreground-500))]">
                  Failed to load metrics data
                </span>
              </div>
            </Card>
          ) : (
            <>
              <Card className="w-full bg-[hsl(var(--app-background-50))] p-4">
                <CardHeader className="flex flex-col items-start px-2 pb-0">
                  <h3 className="text-lg font-medium">On-Time Delivery Rate</h3>
                </CardHeader>
                <CardBody className="py-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold">
                      {formatMetricValue(analyticsData.items[0]?.Data.onTimeDeliveryRate || 0, 'percentage')}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon 
                        icon={`hugeicons:${analyticsData.items[0]?.Data.onTimeDeliveryRate >= (analyticsData.items[1]?.Data.onTimeDeliveryRate || 0) ? 'arrow-up-02' : 'arrow-down-02'}`} 
                        className={`w-4 h-4 ${analyticsData.items[0]?.Data.onTimeDeliveryRate >= (analyticsData.items[1]?.Data.onTimeDeliveryRate || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}
                      />
                      <span className={`text-sm ${analyticsData.items[0]?.Data.onTimeDeliveryRate >= (analyticsData.items[1]?.Data.onTimeDeliveryRate || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}>
                        {calculatePercentageChange(analyticsData.items[0]?.Data.onTimeDeliveryRate || 0, analyticsData.items[1]?.Data.onTimeDeliveryRate || 0).toFixed(1)}% from last period
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="w-full bg-[hsl(var(--app-background-50))] p-4">
                <CardHeader className="flex flex-col items-start px-2 pb-0">
                  <h3 className="text-lg font-medium">Average Delivery Time</h3>
                </CardHeader>
                <CardBody className="py-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold">
                      {formatMetricValue(analyticsData.items[0]?.Data.averageDeliveryTime || 0, 'days')}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon 
                        icon={`hugeicons:${analyticsData.items[0]?.Data.averageDeliveryTime <= (analyticsData.items[1]?.Data.averageDeliveryTime || 0) ? 'arrow-down-02' : 'arrow-up-02'}`} 
                        className={`w-4 h-4 ${analyticsData.items[0]?.Data.averageDeliveryTime <= (analyticsData.items[1]?.Data.averageDeliveryTime || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}
                      />
                      <span className={`text-sm ${analyticsData.items[0]?.Data.averageDeliveryTime <= (analyticsData.items[1]?.Data.averageDeliveryTime || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}>
                        {Math.abs(calculatePercentageChange(analyticsData.items[0]?.Data.averageDeliveryTime || 0, analyticsData.items[1]?.Data.averageDeliveryTime || 0)).toFixed(1)}% from last period
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="w-full bg-[hsl(var(--app-background-50))] p-4">
                <CardHeader className="flex flex-col items-start px-2 pb-0">
                  <h3 className="text-lg font-medium">Customer Satisfaction</h3>
                </CardHeader>
                <CardBody className="py-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-bold">
                      {formatMetricValue(analyticsData.items[0]?.Data.customerSatisfaction || 0, 'satisfaction')}
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon 
                        icon={`hugeicons:${analyticsData.items[0]?.Data.customerSatisfaction >= (analyticsData.items[1]?.Data.customerSatisfaction || 0) ? 'arrow-up-02' : 'arrow-down-02'}`} 
                        className={`w-4 h-4 ${analyticsData.items[0]?.Data.customerSatisfaction >= (analyticsData.items[1]?.Data.customerSatisfaction || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}
                      />
                      <span className={`text-sm ${analyticsData.items[0]?.Data.customerSatisfaction >= (analyticsData.items[1]?.Data.customerSatisfaction || 0) ? 'text-[hsl(var(--app-success-500))]' : 'text-[hsl(var(--app-danger-500))]'}`}>
                        {calculatePercentageChange(analyticsData.items[0]?.Data.customerSatisfaction || 0, analyticsData.items[1]?.Data.customerSatisfaction || 0).toFixed(1)}% from last period
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
      </section>

      <section className="col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Delivery Performance</h3>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <CircularProgress size="lg" aria-label="Loading delivery performance data..." />
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center h-[300px] text-danger">
                  <Icon icon="hugeicons:chart-line-data-01" className="w-8 h-8 mr-2" />
                  <span>Error loading delivery performance data</span>
                </div>
              ) : !analyticsData?.items.length ? (
                <div className="flex items-center justify-center h-[300px] text-default-400">
                  <Icon icon="hugeicons:chart-line-data-01" className="w-8 h-8 mr-2" />
                  <span>No delivery performance data available</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={analyticsData.items}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="generated_at" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatMetricValue(value, 'percentage')}
                    />
                    <Line
                      type="monotone"
                      dataKey="data.delivery_rate"
                      stroke="hsl(var(--app-primary))"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Route Efficiency</h3>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <CircularProgress size="lg" aria-label="Loading route efficiency data..." />
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center h-[300px] text-danger">
                  <Icon icon="hugeicons:chart-bar-line" className="w-8 h-8 mr-2" />
                  <span>Error loading route efficiency data</span>
                </div>
              ) : !analyticsData?.items.length ? (
                <div className="flex items-center justify-center h-[300px] text-default-400">
                  <Icon icon="hugeicons:chart-bar-line" className="w-8 h-8 mr-2" />
                  <span>No route efficiency data available</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={analyticsData.items}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="generated_at" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatMetricValue(value, 'days')}
                    />
                    <Bar
                      dataKey="data.route_efficiency"
                      fill="hsl(var(--app-primary))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="col-span-12 md:col-span-8">
        <Card className="w-full">
          <CardHeader className="px-6 py-4">
            <h3 className="text-xl font-semibold">Top Performing Routes</h3>
          </CardHeader>
          <CardBody className="px-3">
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <CircularProgress aria-label="Loading..." />
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Icon icon="hugeicons:chart-decrease" className="w-12 h-12 text-danger mb-2" />
                  <p className="text-danger">Failed to load route performance data</p>
                </div>
              </div>
            ) : !analyticsData?.items.length ? (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <Icon icon="hugeicons:chart-line-data-01" className="w-12 h-12 text-foreground-400 mb-2" />
                  <p className="text-foreground-400">No route performance data available</p>
                </div>
              </div>
            ) : (
              <Table
                removeWrapper
                aria-label="Top performing routes table"
                classNames={{
                  base: "min-h-[400px]",
                  th: "bg-default-100 text-default-800",
                }}
              >
                <TableHeader>
                  <TableColumn>Route</TableColumn>
                  <TableColumn>On-Time Rate</TableColumn>
                  <TableColumn>Avg. Delivery Time</TableColumn>
                  <TableColumn>Customer Rating</TableColumn>
                </TableHeader>
                <TableBody>
                  {analyticsData.items.map((item: IAnalyticEntity) => (
                    <TableRow key={item.Id}>
                      <TableCell>{item.Data.route}</TableCell>
                      <TableCell>{formatMetricValue(item.Data.onTimeRate, 'percentage')}</TableCell>
                      <TableCell>{formatMetricValue(item.Data.avgDeliveryTime, 'days')}</TableCell>
                      <TableCell>{formatMetricValue(item.Data.customerRating, 'satisfaction')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </section>

      <section className="col-span-12 md:col-span-4">
        <Card className="w-full h-full bg-[hsl(var(--app-background-50))] shadow-md">
          <CardHeader>
            <h3 className="text-lg font-semibold text-[hsl(var(--app-foreground-900))]">
              Recent Issues
            </h3>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <CircularProgress aria-label="Loading..." />
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="hugeicons:alert-circle" className="w-8 h-8 text-[hsl(var(--app-danger-500))]" />
                  <p className="text-[hsl(var(--app-foreground-700))]">Failed to load recent issues</p>
                </div>
              </div>
            ) : !analyticsData?.items.length ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-[hsl(var(--app-foreground-700))]">No recent issues found</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {analyticsData.items.slice(0, 3).map((issue: IAnalyticEntity) => (
                  <li
                    key={issue.Id}
                    className="p-3 rounded-lg bg-[hsl(var(--app-background-100))] border border-[hsl(var(--app-background-200))] hover:border-[hsl(var(--app-primary-200))] transition-colors"
                  >
                    <p className="text-[hsl(var(--app-foreground-800))]">{issue.ReportName}</p>
                    <span className="text-sm text-[hsl(var(--app-foreground-600))]">
                      {new Date(issue.GeneratedAt).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </section>
    </main>
  );
}