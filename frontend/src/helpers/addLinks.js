

export const addLink = (element, linkPrefix) => {
    const link = `${linkPrefix}${element.id}`
    return {...data, link}
}

export const addLinks = (data, linkPrefix) => {
    return data.map( element => addLink(element, linkPrefix))
}