import React, {useState} from 'react';
import {Box, Button, Input, Spinner, Table, Text, useToast} from '@myob/myob-widgets';
import {fetchRegistrations} from '../Api/registrationApi';

const Registrations = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [registrations, setRegistrations] = useState([]);
        const [sortDirection, setSortDirection] = useState("unsorted");
        const [loading, setLoading] = useState(false);
        const [sortName, setSortName] = useState("");
        const toast = useToast();

        const handleSearchTermChange = event => {
            setSearchTerm(event.target.value);
        };

        const handleSearch = async () => {
            setLoading(true);
            setRegistrations([]);
            try {
                const data = await fetchRegistrations(searchTerm);
                setRegistrations(data);
                setLoading(false);
            } catch (error) {
                toast({
                    type: 'danger',
                    message: 'An error occurred while fetching data: ' + error.message,
                });
                setLoading(false);
            }
        };


        const sortRegistrations = (sortName) => {
            const sortMap = {
                "unsorted": "ascending",
                "ascending": "descending",
                "descending": "ascending"
            };
            const nextSortDirection = sortMap[sortDirection];
            setSortDirection(nextSortDirection);
            setSortName(sortName);

            const sortedRegistrations = [...registrations].sort((a, b) => {
                if (a[sortName] < b[sortName]) return nextSortDirection === "ascending" ? -1 : 1;
                if (a[sortName] > b[sortName]) return nextSortDirection === "ascending" ? 1 : -1;
                return 0;
            });

            setRegistrations(sortedRegistrations);
        };

        const tableColumns = [
            {key: "cfid", description: "CFID"},
            {key: "entityName", description: "Entity Name"},
            {key: "tradingName", description: "Trading Name"},
            {key: "abn", description: "ABN"},
            {key: "serialNumber", description: "Serial Number"},
        ];

        const tableHeaders = (
            <Table.Header>
                {tableColumns.map((column) => (
                    <Table.HeaderItem
                        key={column.key}
                        sortName={column.key}
                        sortDirection={column.key === sortName ? sortDirection : "unsorted"}
                        onSort={() => sortRegistrations(column.key)}
                    >
                        {column.description}
                    </Table.HeaderItem>
                ))}
            </Table.Header>
        );

        const tableRows = registrations.map((registration) => (
            <Table.Row key={registration.cfid}>
                {tableColumns.map((column) => (
                    <Table.RowItem columnName={column.description} key={`${registration.cfid}-${column.key}`}>
                        {registration[column.key]}
                    </Table.RowItem>
                ))}
            </Table.Row>
        ));

        return (
            <>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} marginTop={'xl'}
                     marginBottom={'xl'}>
                    <Text fontSize={'xl'}>Registrations</Text>
                    <Text fontSize={'l'}>Search registrations</Text>
                    <Input
                        name="search"
                        value={searchTerm}
                        placeholder="CFID, Entity Name, Trading Name, ABN, Serial Number"
                        onChange={handleSearchTermChange}
                        style={{width: '50rem'}}
                    />

                    <Button type="secondary" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>


                {registrations.length > 0 &&
                    <>
                        <Text fontSize={'xl'}>Results: {registrations.length}</Text>
                        <Table>
                            {tableHeaders}
                            <Table.Body>
                                {tableRows}
                            </Table.Body>
                        </Table>
                    </>}
                {loading && <Spinner/>}
            </>
        );
    }
;

export default Registrations;
