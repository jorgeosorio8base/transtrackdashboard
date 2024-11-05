import { useAlert, useLoading, useClientList, useDeleteClient } from '@/src/hooks';
import { SortOrder, IClientEntity, ClientSort, ClientFilter } from '@transtrackdashboard/core';
import { AlertPlacementEnum, AlertSeverityEnum } from '@/src/providers';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ClientListandSearchComponentProps {
  clientsDataState: {
    items: IClientEntity[];
    count: number;
  } | null;
  handleSearchTerm: (value: string) => void;
  handleClientDelete: (clientId: string) => Promise<void>;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleSortOrder: (value: ClientSort[]) => void;
  handleClientSelection: (clientId: string, isSelected: boolean) => void;
  isLoading: boolean;
  isDeletingClient: boolean;
  searchTerm: string;
  sortOrder: ClientSort[];
  pagination: {
    first: number;
    skip: number;
  };
  selectedClients: string[];
  totalItems: number;
}

export default function ClientListandSearchPresenter() {
  const [sortOrder, setSortOrder] = useState<ClientSort[]>([{ company_name: SortOrder.Asc }]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { showLoading, hideLoading } = useLoading();
  const { show: showAlert } = useAlert();
  const [clientsDataState, setClientsDataState] = useState<{
    items: IClientEntity[];
    count: number;
  } | null>({
    items: [],
    count: 0,
  });

  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  
  const [clientsPagination, setClientsPagination] = useState<{
    first: number;
    skip: number;
  }>({
    first: 10,
    skip: 0,
  });

  const clientsFilters = useMemo<ClientFilter>(() => {
    if (!searchTerm) {
      return {};
    }

    return {
      OR: [
        { company_name: { contains: searchTerm } },
        { primary_contact: { contains: searchTerm } },
        { email: { contains: searchTerm } },
        { phone_number: { contains: searchTerm } },
        { address: { contains: searchTerm } }
      ],
    };
  }, [searchTerm]);

  const { data: clientsData, isLoading: clientsLoading, isError: isClientsError } = useClientList({
    filter: clientsFilters,
    sort: sortOrder,
    first: clientsPagination.first,
    skip: clientsPagination.skip,
  });

  const { mutate: deleteClient, isPending: isDeletingClient } = useDeleteClient();

  const handleNextPage = useCallback(() => {
    if (clientsPagination.skip + clientsPagination.first >= (clientsDataState?.count || 0)) {
      return;
    }

    setClientsPagination((prev) => ({
      ...prev,
      skip: prev.skip + prev.first,
    }));
  }, [clientsPagination.first, clientsPagination.skip, clientsDataState?.count]);

  const handlePreviousPage = useCallback(() => {
    if (clientsPagination.skip === 0) {
      return;
    }

    setClientsPagination((prev) => ({
      ...prev,
      skip: prev.skip - prev.first,
    }));
  }, [clientsPagination.skip]);

  const handleSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
    setClientsPagination((prev) => ({ ...prev, skip: 0 }));
  }, []);

  const handleSortOrder = useCallback((value: ClientSort[]) => {
    setSortOrder(value);
  }, []);

  const handleClientSelection = useCallback((clientId: string, isSelected: boolean) => {
    setSelectedClients((prev) =>
      isSelected ? [...prev, clientId] : prev.filter((id) => id !== clientId)
    );
  }, []);

  const handleClientDelete = useCallback(
    async (clientId: string) => {
      try {
        showLoading();
        await deleteClient(
          {
            filter: {
              id: { equals: clientId }
            },
            force: true
          },
          {
            onSuccess: () => {
              hideLoading();
              showAlert({
                title: 'Success',
                message: 'Client deleted successfully.',
                severity: AlertSeverityEnum.Success,
                placement: AlertPlacementEnum.TopRight,
              });

              setSelectedClients((prev) => prev.filter((id) => id !== clientId));
            },
            onError: () => {
              hideLoading();
              showAlert({
                title: 'Error',
                message: 'An error occurred while deleting the client.',
                severity: AlertSeverityEnum.Error,
                placement: AlertPlacementEnum.TopRight,
              });
            },
          },
        );
      } catch (error) {
        hideLoading();
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.';

        showAlert({
          title: 'Error',
          message: errorMessage,
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight,
        });
      }
    },
    [deleteClient, showAlert, showLoading, hideLoading],
  );

  useEffect(() => {
    if (clientsLoading) {
      showLoading();
    } else {
      hideLoading();

      if (isClientsError) {
        showAlert({
          title: 'Error',
          message: 'An error occurred while fetching the clients list.',
          severity: AlertSeverityEnum.Error,
          placement: AlertPlacementEnum.TopRight,
        });
      }
    }
  }, [clientsLoading, isClientsError, hideLoading, showAlert, showLoading]);

  useEffect(() => {
    if (clientsData) {
      setClientsDataState({
        items: clientsData.items || [],
        count: clientsData.count || 0,
      });
    }
  }, [clientsData]);

  return (
  <ClientListandSearchComponent
    clientsDataState={clientsDataState}
    handleSearchTerm={handleSearchTerm}
    handleClientDelete={handleClientDelete}
    handleNextPage={handleNextPage}
    handlePreviousPage={handlePreviousPage}
    handleSortOrder={handleSortOrder}
    handleClientSelection={handleClientSelection}
    isLoading={clientsLoading}
    isDeletingClient={isDeletingClient}
    searchTerm={searchTerm}
    sortOrder={sortOrder}
    pagination={clientsPagination}
    selectedClients={selectedClients}
    totalItems={clientsDataState?.count || 0}
  />
);;
}

ClientListandSearchPresenter.layout = 'AppLayout';