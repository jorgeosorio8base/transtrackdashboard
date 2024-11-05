import { useNotificationList, useUpdateNotification, useLoading, useAlert } from '@/src/hooks';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';
import { INotificationEntity, NotificationOrderBy } from '@transtrackdashboard/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';

export interface NotificationPreferenceFormikProps {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

export interface NotificationTypeFormikProps {
  shipmentUpdates: boolean;
  systemAlerts: boolean;
  accountNotifications: boolean;
}

export interface NotificationsCenterComponentProps {
  notifications: INotificationEntity[];
  totalCount: number;
  isLoading: boolean;
  handleMarkAllAsRead: () => Promise<void>;
  handlePreferencesSave: (values: NotificationPreferenceFormikProps, helpers: FormikHelpers<NotificationPreferenceFormikProps>) => Promise<void>;
  handleTypesSave: (values: NotificationTypeFormikProps, helpers: FormikHelpers<NotificationTypeFormikProps>) => Promise<void>;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handleNotificationRead: (notificationId: string) => Promise<void>;
}

export const preferencesInitialValues: NotificationPreferenceFormikProps = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false
};

export const typesInitialValues: NotificationTypeFormikProps = {
  shipmentUpdates: true,
  systemAlerts: true,
  accountNotifications: true
};

export const preferencesValidationSchema = Yup.object().shape({
  emailNotifications: Yup.boolean().required('Required'),
  pushNotifications: Yup.boolean().required('Required'),
  smsNotifications: Yup.boolean().required('Required')
});

export const typesValidationSchema = Yup.object().shape({
  shipmentUpdates: Yup.boolean().required('Required'),
  systemAlerts: Yup.boolean().required('Required'),
  accountNotifications: Yup.boolean().required('Required')
});

export default function NotificationsCenterPresenter() {
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();
  const [notificationsState, setNotificationsState] = useState<{
    notifications: INotificationEntity[];
    count: number;
  }>({ notifications: [], count: 0 });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<NotificationOrderBy[]>([NotificationOrderBy.CreatedAtDesc]);

  const notificationFilter = useMemo(() => {
    if (!searchTerm) return {};

    return {
      OR: [
        { content: { contains: searchTerm } }
      ]
    };
  }, [searchTerm]);

  const { data: notificationsData, isLoading: notificationsLoading, isError: notificationsError } = useNotificationList({
    variables: {
      filter: notificationFilter,
      orderBy: sortOrder,
      skip: (currentPage - 1) * pageSize,
      first: pageSize
    }
  });

  const { mutate: updateNotification, isPending: isUpdatingNotification } = useUpdateNotification();

  useEffect(() => {
    if (notificationsLoading || isUpdatingNotification) {
      showLoading();
    } else {
      hideLoading();

      if (notificationsError) {
        showAlert({
          title: 'Error',
          message: 'Failed to fetch notifications',
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.Top
        });
      }
    }
  }, [notificationsLoading, isUpdatingNotification, notificationsError, hideLoading, showAlert, showLoading]);

  useEffect(() => {
    if (notificationsData) {
      setNotificationsState({
        notifications: notificationsData.items || [],
        count: notificationsData.count || 0
      });
    }
  }, [notificationsData]);

  const handleNotificationRead = useCallback(
    async (notificationId: string) => {
      try {
        await updateNotification({
          filter: { Id: { equals: notificationId } },
          data: {
            read: true
          }
        }, {
          onSuccess: () => {
            showAlert({
              title: 'Success',
              message: 'Notification marked as read',
              severity: AlertSeverityEnum.Success,
              placement: AlertPlacementEnum.Top
            });
          },
          onError: () => {
            showAlert({
              title: 'Error',
              message: 'Failed to mark notification as read',
              severity: AlertSeverityEnum.Error,
              placement: AlertPlacementEnum.Top
            });
          }
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.Top
        });
      }
    },
    [updateNotification, showAlert]
  );

  const handleMarkAllAsRead = useCallback(
    async () => {
      if (!notificationsState.notifications.length) {
        showAlert({
          title: 'Info',
          message: 'No notifications to mark as read',
          severity: AlertSeverityEnum.Info,
          placement: AlertPlacementEnum.Top
        });
        return;
      }

      try {
        showLoading();
        const unreadNotifications = notificationsState.notifications.filter(notification => !notification.read);
        
        if (!unreadNotifications.length) {
          showAlert({
            title: 'Info',
            message: 'All notifications are already read',
            severity: AlertSeverityEnum.Info,
            placement: AlertPlacementEnum.Top
          });
          return;
        }

        const updatePromises = unreadNotifications.map(notification =>
          updateNotification({
            filter: { Id: { equals: notification.Id } },
            data: {
              read: true
            }
          })
        );

        await Promise.all(updatePromises);

        showAlert({
          title: 'Success',
          message: 'All notifications marked as read',
          severity: AlertSeverityEnum.Success,
          placement: AlertPlacementEnum.Top
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
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
    [notificationsState.notifications, updateNotification, showAlert, showLoading, hideLoading]
  );

  const handlePreferencesSave = useCallback(
    async (values: NotificationPreferenceFormikProps, { setSubmitting }: FormikHelpers<NotificationPreferenceFormikProps>) => {
      try {
        // Here would go the logic to save preferences
        showAlert({
          title: 'Success',
          message: 'Notification preferences updated successfully',
          severity: AlertSeverityEnum.Success,
          placement: AlertPlacementEnum.Top
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.Top
        });
      } finally {
        setSubmitting(false);
      }
    },
    [showAlert]
  );

  const handleTypesSave = useCallback(
    async (values: NotificationTypeFormikProps, { setSubmitting }: FormikHelpers<NotificationTypeFormikProps>) => {
      try {
        // Here would go the logic to save notification types
        showAlert({
          title: 'Success',
          message: 'Notification types updated successfully',
          severity: AlertSeverityEnum.Success,
          placement: AlertPlacementEnum.Top
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.Top
        });
      } finally {
        setSubmitting(false);
      }
    },
    [showAlert]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
  <Formik
    initialValues={{
      ...preferencesInitialValues,
      ...typesInitialValues
    }}
    validationSchema={Yup.object().shape({
      ...preferencesValidationSchema.fields,
      ...typesValidationSchema.fields
    })}
    onSubmit={() => {}}
  >
    <NotificationsCenterComponent
      notifications={notificationsState.notifications}
      totalCount={notificationsState.count}
      isLoading={notificationsLoading}
      handleMarkAllAsRead={handleMarkAllAsRead}
      handlePreferencesSave={handlePreferencesSave}
      handleTypesSave={handleTypesSave}
      currentPage={currentPage}
      totalPages={Math.ceil(notificationsState.count / pageSize)}
      handlePageChange={handlePageChange}
      handleNotificationRead={handleNotificationRead}
    />
  </Formik>
);;
}

NotificationsCenterPresenter.layout = 'AppLayout';