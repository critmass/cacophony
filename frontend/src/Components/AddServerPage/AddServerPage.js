import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useChangeHandler from "../../hooks/useChangeHandler";

const AddServerPage = () => {
    const [inputs, setInputs] = useState({
        name:"",
        picture_url:""
    })
    const dispatch = useDispatch()
    const handleChange = useChangeHandler(setInputs)

}