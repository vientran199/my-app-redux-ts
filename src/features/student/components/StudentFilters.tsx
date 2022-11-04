import { Box, Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';

export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];

    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}
const StudentFilters = ({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter = {
            ...filter,
            name_like: e.target.value,
        };
        onSearchChange(newFilter);
    }
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by name"
                            endAdornment={<Search />}
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StudentFilters