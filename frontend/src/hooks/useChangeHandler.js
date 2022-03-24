const useChangeHandler = (setValues, submit=null) => {

    const handleChange = e => {
        const { value, name } = e.target
        setValues(oldValues => ({ ...oldValues, [name]: value }))
    }

    return handleChange
}

export default useChangeHandler