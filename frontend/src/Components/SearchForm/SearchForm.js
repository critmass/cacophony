import React, { useState } from 'react'
import useChangeHandler from '../../hooks/useChangeHandler'
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import "./SearchForm.css"

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

    const onKeyDown = e => {
        if(e.keyCode === 13) handleSearch()
    }

    return (<InputGroup>
        <Input
            type="text"
            name="searchTerm"
            value={searchTerm.searchTerm}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
        />
        <InputGroupAddon addonType="append">
            <Button onClick={handleSearch}>
                Search
            </Button>
        </InputGroupAddon>
    </InputGroup>)
}

export default SearchForm