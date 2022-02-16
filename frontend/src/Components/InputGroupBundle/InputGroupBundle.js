import React from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";

const InputGroupBundle = ({
    name,
    value,
    onChange,
    label,
    type="text"
}) => {

    return (<InputGroup>
        <InputGroupAddon addonType="prepend">
            {label}
        </InputGroupAddon>
        <Input
            type={type}
            name= {name}
            value={value}
            onChange={onChange}
        />
    </InputGroup>)
}

export default InputGroupBundle