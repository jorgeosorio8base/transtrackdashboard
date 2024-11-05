import { Card, CardHeader, CardBody, Button, CircularProgress, Chip, Tabs, Tab, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useFormikContext } from 'formik';
import { ClientProfileManagementComponentProps, ClientProfileManagementFormikProps, ClientProfileTabs } from './';

function getTabIcon(tabId: ClientProfileTabs): string {
  const iconMap = {
    [ClientProfileTabs.ContactInfo]: 'user-id',
    [ClientProfileTabs.ShippingPreferences]: 'truck-delivery',
    [ClientProfileTabs.HistoricalData]: 'chart-square',
    [ClientProfileTabs.Documents]: 'document-attachment',
    [ClientProfileTabs.CommunicationLog]: 'chat-message'
  };
  return iconMap[tabId];
}

export function ClientProfileManagementComponent({
  client,
  isLoading,
  isEditMode,
  activeTab,
  tabs,
  onTabChange,
  onEditProfile,
  onAddShipment,
  handleSubmit
}: ClientProfileManagementComponentProps) {
  const formik = useFormikContext<ClientProfileManagementFormikProps>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formik.values, formik);
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[400px]">
        <CircularProgress size="lg" aria-label="Loading..." />
      </main>
    );
  }

  if (!client) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Icon icon="hugeicons:account-setting-02" className="w-16 h-16 text-[hsl(var(--app-foreground-500))]" />
        <p className="text-lg text-[hsl(var(--app-foreground-500))]">No client information available</p>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-12 gap-4 p-4">
      <section className="col-span-12">
        <Card className="w-full shadow-md bg-[hsl(var(--app-background-50))]">
          <CardHeader className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[hsl(var(--app-foreground-900))]">
                {client.CompanyName || 'Client Profile Management'}
              </h2>
              <Button
                isIconOnly
                variant="light"
                onPress={onEditProfile}
                className="text-[hsl(var(--app-primary-500))]"
              >
                <Icon icon="hugeicons:edit-02" width={24} height={24} />
              </Button>
            </div>
            <Button
              color="primary"
              onClick={onAddShipment}
              startContent={<Icon icon="hugeicons:add-02" className="text-xl" />}
            >
              Add New Shipment
            </Button>
          </CardHeader>
          <CardBody className="px-6 py-4 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">Company Name</span>
                <span className="text-sm font-medium text-[hsl(var(--app-foreground-900))]">{client.CompanyName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">Primary Contact</span>
                <span className="text-sm font-medium text-[hsl(var(--app-foreground-900))]">{client.PrimaryContact}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">Account Status</span>
                <Chip size="sm" variant="flat" color="success" className="capitalize">Active</Chip>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[hsl(var(--app-foreground-500))]">JAOV_TRACKING</span>
                <span className="text-sm font-medium text-[hsl(var(--app-foreground-900))]">{client.Id}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="col-span-12">
        <Card className="w-full shadow-md bg-[hsl(var(--app-background-50))]">
          <CardBody className="px-6 py-4">
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => onTabChange(key as ClientProfileTabs)}
              aria-label="Client Profile Tabs"
              color="primary"
              variant="underlined"
              classNames={{
                tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                cursor: 'w-full bg-[hsl(var(--app-primary))]',
                tab: 'max-w-fit px-0 h-12',
                tabContent: 'group-data-[selected=true]:text-[hsl(var(--app-primary))]'
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  title={
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={`hugeicons:${getTabIcon(tab.id)}`}
                        className="text-xl"
                      />
                      <span>{tab.label}</span>
                    </div>
                  }
                >
                  {tab.id === ClientProfileTabs.ContactInfo && (
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Input
                        label="Company Name"
                        placeholder="Enter company name"
                        value={isEditMode ? formik.values.company_name : client.CompanyName}
                        {...(isEditMode && formik.getFieldProps('company_name'))}
                        isInvalid={!!(isEditMode && formik.touched.company_name && formik.errors.company_name)}
                        errorMessage={isEditMode && formik.touched.company_name && formik.errors.company_name}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Primary Contact"
                        placeholder="Enter primary contact"
                        value={isEditMode ? formik.values.primary_contact : client.PrimaryContact}
                        {...(isEditMode && formik.getFieldProps('primary_contact'))}
                        isInvalid={!!(isEditMode && formik.touched.primary_contact && formik.errors.primary_contact)}
                        errorMessage={isEditMode && formik.touched.primary_contact && formik.errors.primary_contact}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Address"
                        placeholder="Enter address"
                        value={isEditMode ? formik.values.address : client.Address}
                        {...(isEditMode && formik.getFieldProps('address'))}
                        isInvalid={!!(isEditMode && formik.touched.address && formik.errors.address)}
                        errorMessage={isEditMode && formik.touched.address && formik.errors.address}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Phone Number"
                        placeholder="Enter phone number"
                        value={isEditMode ? formik.values.phone_number : client.PhoneNumber}
                        {...(isEditMode && formik.getFieldProps('phone_number'))}
                        isInvalid={!!(isEditMode && formik.touched.phone_number && formik.errors.phone_number)}
                        errorMessage={isEditMode && formik.touched.phone_number && formik.errors.phone_number}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Email"
                        placeholder="Enter email"
                        value={isEditMode ? formik.values.email : client.Email}
                        {...(isEditMode && formik.getFieldProps('email'))}
                        isInvalid={!!(isEditMode && formik.touched.email && formik.errors.email)}
                        errorMessage={isEditMode && formik.touched.email && formik.errors.email}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Preferred Shipping Methods"
                        placeholder="Enter preferred shipping methods"
                        value={isEditMode ? formik.values.preferred_shipping_methods : client.PreferredShippingMethods}
                        {...(isEditMode && formik.getFieldProps('preferred_shipping_methods'))}
                        isInvalid={!!(isEditMode && formik.touched.preferred_shipping_methods && formik.errors.preferred_shipping_methods)}
                        errorMessage={isEditMode && formik.touched.preferred_shipping_methods && formik.errors.preferred_shipping_methods}
                        isReadOnly={!isEditMode}
                      />
                      <Input
                        label="Special Handling Instructions"
                        placeholder="Enter special handling instructions"
                        value={isEditMode ? formik.values.special_handling_instructions : client.SpecialHandlingInstructions}
                        {...(isEditMode && formik.getFieldProps('special_handling_instructions'))}
                        isInvalid={!!(isEditMode && formik.touched.special_handling_instructions && formik.errors.special_handling_instructions)}
                        errorMessage={isEditMode && formik.touched.special_handling_instructions && formik.errors.special_handling_instructions}
                        isReadOnly={!isEditMode}
                      />
                      {isEditMode && (
                        <Button type="submit" color="primary" className="mt-4">
                          Save Changes
                        </Button>
                      )}
                    </form>
                  )}
                </Tab>
              ))}
            </Tabs>
          </CardBody>
        </Card>
      </section>
    </main>
  );
}