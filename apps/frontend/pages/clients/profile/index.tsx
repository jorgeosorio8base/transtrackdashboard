import { useClient, useUpdateClient, useLoading, useAlert } from '@/src/hooks';
import { IClientEntity } from '@transtrackdashboard/core';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormikHelpers, Formik } from 'formik';
import * as Yup from 'yup';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';

export enum ClientProfileTabs {
  ContactInfo = 'contact-info',
  ShippingPreferences = 'shipping-preferences',
  HistoricalData = 'historical-data',
  Documents = 'documents',
  CommunicationLog = 'communication-log'
}

export interface ProfileTab {
  id: ClientProfileTabs;
  label: string;
  disabled?: boolean;
}

export interface ClientProfileManagementFormikProps {
  company_name: string;
  primary_contact: string;
  address: string;
  phone_number: string;
  email: string;
  preferred_shipping_methods: string;
  special_handling_instructions: string;
}

export interface ClientProfileManagementComponentProps {
  client: IClientEntity | null;
  isLoading: boolean;
  isEditMode: boolean;
  activeTab: ClientProfileTabs;
  tabs: ProfileTab[];
  onTabChange: (tab: ClientProfileTabs) => void;
  onEditProfile: () => void;
  onAddShipment: () => void;
  handleSubmit: (values: ClientProfileManagementFormikProps, formikHelpers: FormikHelpers<ClientProfileManagementFormikProps>) => void;
}

const validationSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  primary_contact: Yup.string().required('Primary contact is required'),
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  preferred_shipping_methods: Yup.string().required('Preferred shipping methods are required'),
  special_handling_instructions: Yup.string()
});

export default function ClientProfileManagementPresenter() {
  const router = useRouter();
  const { clientId } = router.query as { clientId: string };
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<ClientProfileTabs>(ClientProfileTabs.ContactInfo);

  const tabs: ProfileTab[] = [
    { id: ClientProfileTabs.ContactInfo, label: 'Contact Information' },
    { id: ClientProfileTabs.ShippingPreferences, label: 'Shipping Preferences' },
    { id: ClientProfileTabs.HistoricalData, label: 'Historical Data' },
    { id: ClientProfileTabs.Documents, label: 'Documents' },
    { id: ClientProfileTabs.CommunicationLog, label: 'Communication Log' }
  ];

  const { data: client, isLoading: isClientLoading, isError: isClientError } = useClient({
    id: clientId
  });

  const { mutate: updateClient, isPending: isUpdatingClient } = useUpdateClient();

  const handleTabChange = useCallback((tab: ClientProfileTabs) => {
    setActiveTab(tab);
  }, []);

  const handleEditProfile = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const handleAddShipment = useCallback(() => {
    router.push(`/shipments/create?clientId=${clientId}`);
  }, [clientId, router]);

  const handleSubmit = useCallback(
    async (values: ClientProfileManagementFormikProps, { setSubmitting }: FormikHelpers<ClientProfileManagementFormikProps>) => {
      try {
        await updateClient(
          {
            filter: { id: clientId },
            data: {
              company_name: values.company_name,
              primary_contact: values.primary_contact,
              address: values.address,
              phone_number: values.phone_number,
              email: values.email,
              preferred_shipping_methods: values.preferred_shipping_methods,
              special_handling_instructions: values.special_handling_instructions,
              Shipment: undefined,
              clientsNotifications: undefined
            }
          },
          {
            onSuccess: (data: boolean) => {
              if (data) {
                showAlert({
                  title: 'Success',
                  message: 'Client profile updated successfully',
                  severity: AlertSeverityEnum.Success,
                  placement: AlertPlacementEnum.TopRight
                });
                setIsEditMode(false);
              } else {
                showAlert({
                  title: 'Error',
                  message: 'Failed to update client profile',
                  severity: AlertSeverityEnum.Error,
                  placement: AlertPlacementEnum.TopRight
                });
              }
            },
            onError: () => {
              showAlert({
                title: 'Error',
                message: 'Failed to update client profile',
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
      } finally {
        setSubmitting(false);
      }
    },
    [clientId, updateClient, showAlert]
  );

  useEffect(() => {
    if (isClientLoading || isUpdatingClient) {
      showLoading();
    } else {
      hideLoading();

      if (isClientError) {
        showAlert({
          title: 'Error',
          message: 'Failed to load client profile',
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight
        });
      }
    }
  }, [isClientLoading, isClientError, isUpdatingClient, showLoading, hideLoading, showAlert]);

  return (
  <Formik
    initialValues={{
      company_name: client?.CompanyName || '',
      primary_contact: client?.PrimaryContact || '',
      address: client?.Address || '',
      phone_number: client?.PhoneNumber || '',
      email: client?.Email || '',
      preferred_shipping_methods: client?.PreferredShippingMethods || '',
      special_handling_instructions: client?.SpecialHandlingInstructions || ''
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    <ClientProfileManagementComponent
      client={client}
      isLoading={isClientLoading}
      isEditMode={isEditMode}
      activeTab={activeTab}
      tabs={tabs}
      onTabChange={handleTabChange}
      onEditProfile={handleEditProfile}
      onAddShipment={handleAddShipment}
      handleSubmit={handleSubmit}
    />
  </Formik>
);
}

ClientProfileManagementPresenter.layout = 'AppLayout';
