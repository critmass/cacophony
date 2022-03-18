import React, { useState } from 'react'
import useChangeHandler from '../../hooks/useChangeHandler'
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'

const SearchForm = ({setResults, dataSet, searchBy, placeholder}) => {

    const [searchTerm, setSearchTerm] = useState({searchTerm:""})

    const handleChange = useChangeHandler(setSearchTerm)

    const handleSearch = () => {
        let results
        const trimmedSearchTerm  = searchTerm.searchTerm.trim()
        if (trimmedSearchTerm != "") {
            results = dataSet.filter(data => {
                return data[searchBy].includes( trimmedSearchTerm )
            })
        }
        else {
            results = dataSet
        }
        setResults(results)
        setSearchTerm("")
    }

    return (<InputGroup>
        <Input
            type="text"
            name="searchTerm"
            value={searchTerm.searchTerm}
            onChange={handleChange}
            placeholder={placeholder}
        />
        <InputGroupAddon addonType="append">
            <Button onClick={handleSearch}>
                Search
            </Button>
        </InputGroupAddon>
    </InputGroup>)
}

export default SearchForm