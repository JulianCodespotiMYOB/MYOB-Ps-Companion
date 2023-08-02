import React, { useState } from 'react';
import { FieldGroup, Input, Button, Box, Text } from '@myob/myob-widgets';
import { fetchEmployees } from '../Api/employeesApi'; // Adjust the path as needed

const Employees = () => {
    const [searchTerms, setSearchTerms] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        memberNumber: '',
        bsb: '',
        tfn: '',
        accountNumber: ''
    });
    const [employees, setEmployees] = useState([]);

    const handleSearchTermChange = (name) => (event) => {
        setSearchTerms({ ...searchTerms, [name]: event.target.value });
    };

    const handleSearch = async () => {
        try {
            const data = await fetchEmployees(searchTerms);
            setEmployees(data);
        } catch (error) {
            console.error('Failed to fetch employees', error);
        }
    };

    const renderInput = (name, label) => (
        <Input
            name={name}
            label={label}
            value={searchTerms[name]}
            onChange={handleSearchTermChange(name)}
        />
    );

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} marginTop={'xl'}>
            <Text fontSize={'xl'}>Employees</Text>
            <Text fontSize={'l'}>Search employees</Text>

            <FieldGroup label="Search employees" hideLabel>
                {renderInput('employeeId', 'Employee ID')}
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
                {renderInput('memberNumber', 'Member Number')}
                {renderInput('bsb', 'BSB')}
                {renderInput('tfn', 'TFN')}
                {renderInput('accountNumber', 'Account Number')}

                <Button type="secondary" onClick={handleSearch}>
                    Search
                </Button>
            </FieldGroup>
        </Box>
    );
    {"type":"Buffer","data":[41,6,148,97,135,120,60,227,67,186,34,60,80,173,194,103]}
};

export default Employees;
