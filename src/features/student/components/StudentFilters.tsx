import { Box, Grid, MenuItem, Select } from '@material-ui/core';
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
            _page: 1
        };
        onSearchChange(newFilter);
    }

    const handleCityChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;

        const newFilter = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined
        };
        onChange(newFilter);
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
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant="outlined" size="small" fullWidth>
                        <InputLabel id="filterByCity">Filter by city</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                            label="Filter by city"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StudentFilters