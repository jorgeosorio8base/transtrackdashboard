import { Card, CardBody, CardHeader, Button, CheckboxGroup, Checkbox, CircularProgress, Pagination } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { NotificationsCenterComponentProps, NotificationPreferenceFormikProps, NotificationTypeFormikProps } from './';
import { INotificationEntity } from '@transtrackdashboard/core';
import { useFormikContext, FormikHelpers } from 'formik';

export function NotificationsCenterComponent({
  notifications,
  totalCount,
  isLoading,
  handleMarkAllAsRead,
  handlePreferencesSave,
  handleTypesSave,
  currentPage,
  totalPages,
  handlePageChange,
  handleNotificationRead
}: NotificationsCenterComponentProps) {
  return (
    <main className="grid grid-cols-12 gap-6 p-6">
      <section className="col-span-12">
        <Card className="w-full shadow-md" radius="sm">
          <CardHeader className="flex justify-between items-center p-4 bg-[hsl(var(--app-background-50))] border-b border-[hsl(var(--app-background-200))]">
            <div className="flex items-center gap-2">
              <Icon
                icon="hugeicons:notification-02"
                className="w-6 h-6 text-[hsl(var(--app-foreground-500))]"
              />
              <h1 className="text-xl font-semibold text-[hsl(var(--app-foreground-900))]">
                Notifications ({totalCount})
              </h1>
            </div>
            <Button
              variant="light"
              color="primary"
              onPress={handleMarkAllAsRead}
              isDisabled={totalCount === 0}
              isLoading={isLoading}
              className="font-medium"
              startContent={
                !isLoading && (
                  <Icon
                    icon="hugeicons:check-circle"
                    className="w-4 h-4"
                  />
                )
              }
            >
              Mark all as read
            </Button>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8 gap-4">
                <CircularProgress size="lg" aria-label="Loading notifications..." />
                <p className="text-[hsl(var(--app-foreground-500))]">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 gap-4">
                <Icon
                  icon="hugeicons:notification-off-02"
                  className="w-12 h-12 text-[hsl(var(--app-foreground-400))]"
                />
                <p className="text-[hsl(var(--app-foreground-500))]">No notifications found</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {notifications.map((notification: INotificationEntity) => (
                  <Card
                    key={notification.Id}
                    isPressable
                    onPress={() => notification.Id && handleNotificationRead(notification.Id)}
                    className={`border border-[hsl(var(--app-background-200))] ${notification?.read === false ? 'bg-[hsl(var(--app-background-100))]' : ''}`}
                    radius="sm"
                  >
                    <CardBody className="flex flex-row gap-4 p-4">
                      <div className="flex-shrink-0">
                        <Icon
                          icon="hugeicons:notification-02"
                          className={`w-6 h-6 ${notification?.read === false ? 'text-[hsl(var(--app-primary-500))]' : 'text-[hsl(var(--app-foreground-400))]'}`}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-[hsl(var(--app-foreground-900))]">
                          {notification.Content}
                        </h3>
                        <span className="text-sm text-[hsl(var(--app-foreground-500))]">
                          {new Date(notification.CreatedAt || '').toLocaleString()}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  total={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  classNames={{
                    base: 'gap-2',
                    item: 'text-[hsl(var(--app-foreground-500))] data-[hover=true]:text-[hsl(var(--app-foreground-900))]',
                    cursor: 'bg-[hsl(var(--app-primary-500))] text-white'
                  }}
                />
              </div>
            )}
          </CardBody>
        </Card>
      </section>

      <section className="col-span-12 md:col-span-6">
        <Card className="w-full h-full shadow-md" radius="sm">
          <CardHeader className="flex gap-3 px-6 py-4 border-b border-[hsl(var(--app-foreground-100))]">
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:notification-02" className="text-2xl text-[hsl(var(--app-primary))]" />
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
            </div>
          </CardHeader>
          <CardBody>
            <NotificationPreferencesForm handlePreferencesSave={handlePreferencesSave} />
          </CardBody>
        </Card>
      </section>

      <section className="col-span-12 md:col-span-6">
        <Card className="w-full h-full bg-[hsl(var(--app-background-50))] shadow-md" radius="sm">
          <CardHeader className="flex gap-3 px-6 py-4 border-b border-[hsl(var(--app-foreground-100))]">
            <div className="flex items-center gap-2">
              <Icon
                icon="hugeicons:notification-01"
                className="text-[hsl(var(--app-foreground-900))] w-5 h-5"
              />
              <h2 className="text-lg font-semibold text-[hsl(var(--app-foreground-900))]">
                Notification Types
              </h2>
            </div>
          </CardHeader>
          <CardBody className="px-6 py-4">
            <NotificationTypesForm handleTypesSave={handleTypesSave} />
          </CardBody>
        </Card>
      </section>
    </main>
  );
}

function NotificationPreferencesForm({ handlePreferencesSave }: { handlePreferencesSave: (values: NotificationPreferenceFormikProps, helpers: FormikHelpers<NotificationPreferenceFormikProps>) => Promise<void> }) {
  const { values, handleSubmit, isSubmitting } = useFormikContext<NotificationPreferenceFormikProps>();

  const onSubmit = async (formValues: NotificationPreferenceFormikProps, helpers: FormikHelpers<NotificationPreferenceFormikProps>) => {
    await handlePreferencesSave(formValues, helpers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="space-y-4">
        <CheckboxGroup
          defaultValue={[
            values.emailNotifications ? 'email' : '',
            values.pushNotifications ? 'push' : '',
            values.smsNotifications ? 'sms' : ''
          ].filter(Boolean)}
          classNames={{
            base: "w-full",
            wrapper: "space-y-4"
          }}
        >
          <Checkbox value="email" className="w-full">
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:mail-01" className="text-xl text-[hsl(var(--app-foreground-500))]" />
              <span>Email Notifications</span>
            </div>
          </Checkbox>
          <Checkbox value="push" className="w-full">
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:notification-square" className="text-xl text-[hsl(var(--app-foreground-500))]" />
              <span>Push Notifications</span>
            </div>
          </Checkbox>
          <Checkbox value="sms" className="w-full">
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:message-square-01" className="text-xl text-[hsl(var(--app-foreground-500))]" />
              <span>SMS Notifications</span>
            </div>
          </Checkbox>
        </CheckboxGroup>
      </div>
      <Button
        type="submit"
        color="primary"
        className="w-full"
        isLoading={isSubmitting}
        spinner={<CircularProgress size="sm" color="white" aria-label="Loading..." />}
      >
        Save Preferences
      </Button>
    </form>
  );
}

function NotificationTypesForm({ handleTypesSave }: { handleTypesSave: (values: NotificationTypeFormikProps, helpers: FormikHelpers<NotificationTypeFormikProps>) => Promise<void> }) {
  const { values, handleSubmit, getFieldProps } = useFormikContext<NotificationTypeFormikProps>();

  const onSubmit = async (formValues: NotificationTypeFormikProps, helpers: FormikHelpers<NotificationTypeFormikProps>) => {
    await handleTypesSave(formValues, helpers);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <CheckboxGroup
        className="gap-3"
        classNames={{
          wrapper: 'flex flex-col gap-3'
        }}
      >
        <Checkbox
          {...getFieldProps('shipmentUpdates')}
          isSelected={values.shipmentUpdates}
          className="text-[hsl(var(--app-foreground-900))]"
        >
          Shipment Updates
        </Checkbox>
        <Checkbox
          {...getFieldProps('systemAlerts')}
          isSelected={values.systemAlerts}
          className="text-[hsl(var(--app-foreground-900))]"
        >
          System Alerts
        </Checkbox>
        <Checkbox
          {...getFieldProps('accountNotifications')}
          isSelected={values.accountNotifications}
          className="text-[hsl(var(--app-foreground-900))]"
        >
          Account Notifications
        </Checkbox>
      </CheckboxGroup>
      <div className="flex justify-end">
        <Button
          type="submit"
          color="primary"
          className="font-medium"
          size="sm"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}