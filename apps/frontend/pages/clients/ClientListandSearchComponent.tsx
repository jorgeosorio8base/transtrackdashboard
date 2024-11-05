import { Input, Button, Select, SelectItem, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Checkbox, Spinner } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { ClientListandSearchComponentProps } from './';
import { SortOrder, ClientSort, IClientEntity } from '@transtrackdashboard/core';

export function ClientListandSearchComponent({
  clientsDataState,
  handleSearchTerm,
  handleClientDelete,
  handleNextPage,
  handlePreviousPage,
  handleSortOrder,
  handleClientSelection,
  isLoading,
  isDeletingClient,
  searchTerm,
  sortOrder,
  pagination,
  selectedClients,
  totalItems
}: ClientListandSearchComponentProps) {

  const handleSort = (column: string) => {
    const newSortOrder: ClientSort[] = [{ [column]: sortOrder[0]?.[column] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc }];
    handleSortOrder(newSortOrder);
  };

  return (
    <main className="grid grid-cols-12 gap-4 p-4">
      <section className="col-span-12">
        <div className="flex flex-col gap-4 w-full p-4 bg-[hsl(var(--app-background-50))] rounded-lg">
          <h2 className="text-2xl font-bold text-[hsl(var(--app-foreground-900))]">
            Client List and Search
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <Input
              value={searchTerm}
              onValueChange={handleSearchTerm}
              placeholder="Search clients..."
              size="sm"
              radius="sm"
              variant="bordered"
              className="w-full md:w-1/3"
              startContent={
                <Icon
                  icon="hugeicons:search-01"
                  className="text-[hsl(var(--app-foreground-400))] text-xl"
                />
              }
              isDisabled={isLoading}
            />
            <Button
              color="primary"
              size="sm"
              radius="sm"
              startContent={
                <Icon
                  icon="hugeicons:add-02"
                  className="text-[hsl(var(--app-background-50))] text-xl"
                />
              }
              isDisabled={isLoading}
            >
              Create New Client
            </Button>
          </div>
        </div>
      </section>

      <section className="col-span-12">
        <div className="flex flex-col gap-4 p-4 bg-[hsl(var(--app-background-50))] rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              placeholder="Filter by Location"
              size="sm"
              variant="bordered"
              className="w-full md:w-1/3"
              startContent={
                <Icon 
                  icon="hugeicons:filter" 
                  className="text-[hsl(var(--app-foreground-500))]" 
                  width={20} 
                  height={20} 
                />
              }
            >
              <SelectItem key="all" value="all">All Locations</SelectItem>
              <SelectItem key="new-york" value="new-york">New York</SelectItem>
              <SelectItem key="los-angeles" value="los-angeles">Los Angeles</SelectItem>
            </Select>
            <Select
              placeholder="Filter by Volume"
              size="sm"
              variant="bordered"
              className="w-full md:w-1/3"
              startContent={
                <Icon 
                  icon="hugeicons:filter" 
                  className="text-[hsl(var(--app-foreground-500))]" 
                  width={20} 
                  height={20} 
                />
              }
            >
              <SelectItem key="all" value="all">All Volumes</SelectItem>
              <SelectItem key="high" value="high">High Volume</SelectItem>
              <SelectItem key="medium" value="medium">Medium Volume</SelectItem>
              <SelectItem key="low" value="low">Low Volume</SelectItem>
            </Select>
            <Select
              placeholder="Filter by Status"
              size="sm"
              variant="bordered"
              className="w-full md:w-1/3"
              startContent={
                <Icon 
                  icon="hugeicons:filter" 
                  className="text-[hsl(var(--app-foreground-500))]" 
                  width={20} 
                  height={20} 
                />
              }
            >
              <SelectItem key="all" value="all">All Status</SelectItem>
              <SelectItem key="active" value="active">Active</SelectItem>
              <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
            </Select>
          </div>
          <div className="flex justify-end">
            <Button
              color="primary"
              size="sm"
              isLoading={isLoading}
              startContent={
                !isLoading && (
                  <Icon 
                    icon="hugeicons:filter-reset" 
                    width={20} 
                    height={20} 
                  />
                )
              }
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </section>

      <section className="col-span-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spinner size="lg" color="primary" />
          </div>
        ) : !clientsDataState?.items || clientsDataState.items.length === 0 ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-[hsl(var(--app-foreground-500))]">No clients found</p>
          </div>
        ) : (
          <Table
            aria-label="Client list table"
            classNames={{
              wrapper: 'min-h-[400px]',
            }}
            selectionMode="multiple"
          >
            <TableHeader>
              <TableColumn className="w-[50px]">
                <Checkbox />
              </TableColumn>
              <TableColumn onPress={() => handleSort('company_name')}>
                Company Name {sortOrder[0]?.company_name && (sortOrder[0].company_name === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn onPress={() => handleSort('primary_contact')}>
                Primary Contact {sortOrder[0]?.primary_contact && (sortOrder[0].primary_contact === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn onPress={() => handleSort('address')}>
                Location {sortOrder[0]?.address && (sortOrder[0].address === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn onPress={() => handleSort('updated_at')}>
                Recent Activity {sortOrder[0]?.updated_at && (sortOrder[0].updated_at === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn onPress={() => handleSort('email')}>
                Email {sortOrder[0]?.email && (sortOrder[0].email === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn onPress={() => handleSort('phone_number')}>
                Phone Number {sortOrder[0]?.phone_number && (sortOrder[0].phone_number === SortOrder.Asc ? '↑' : '↓')}
              </TableColumn>
              <TableColumn className="w-[120px]">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {clientsDataState.items.map((client: IClientEntity) => (
                <TableRow key={client.Id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedClients.includes(client.Id || '')}
                      onValueChange={(isSelected) =>
                        handleClientSelection(client.Id || '', isSelected)
                      }
                    />
                  </TableCell>
                  <TableCell>{client.CompanyName}</TableCell>
                  <TableCell>{client.PrimaryContact}</TableCell>
                  <TableCell>{client.Address}</TableCell>
                  <TableCell>
                    {new Date(client.UpdatedAt || '').toLocaleDateString()}
                  </TableCell>
                  <TableCell>{client.Email}</TableCell>
                  <TableCell>{client.PhoneNumber}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[hsl(var(--app-primary-500))]">
                        <Icon icon="hugeicons:edit-01" width={20} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-[hsl(var(--app-danger-500))]" 
                        isLoading={isDeletingClient}
                        onPress={() => handleClientDelete(client.Id || '')}>
                        <Icon icon="hugeicons:delete-01" width={20} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      <section className="col-span-12">
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 border-t border-[hsl(var(--app-foreground-100))]'>
          <span className='text-sm text-[hsl(var(--app-foreground-500))]'>
            {isLoading ? (
              'Loading...'
            ) : totalItems === 0 ? (
              'No results'
            ) : (
              `Showing ${pagination.skip + 1} to ${Math.min(pagination.skip + pagination.first, totalItems)} of ${totalItems} entries`
            )}
          </span>
          <div className='flex items-center gap-2'>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              onPress={handlePreviousPage}
              isDisabled={pagination.skip === 0 || isLoading}
            >
              <Icon 
                icon='hugeicons:arrow-left-02' 
                className='text-xl text-[hsl(var(--app-foreground-500))]'
              />
            </Button>
            <Button
              isIconOnly
              variant='light'
              size='sm'
              onPress={handleNextPage}
              isDisabled={(pagination.skip + pagination.first) >= totalItems || isLoading}
            >
              <Icon 
                icon='hugeicons:arrow-right-02' 
                className='text-xl text-[hsl(var(--app-foreground-500))]'
              />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}