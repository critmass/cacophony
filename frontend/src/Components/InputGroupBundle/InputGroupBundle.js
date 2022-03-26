import React from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./InputGroupBundle.css"

const InputGroupBundle = ({
    name,
    value,
    onChange,
    label,
    type="text",
    onKeyDown= () => {}
}) => {

    return (
        <InputGroup className="my-2 InputGroupBundle-InputGroup">
            <InputGroupAddon
                addonType="prepend"
                className="InputGroupBundle-InputGroupAddon"
            >
                {label}
            </InputGroupAddon>
            <Input
                type={type}
                name= {name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="InputGroupBundle-Input"
            />
        </InputGroup>
    )
}

export default InputGroupBundle