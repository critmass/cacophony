import React from "react";
import IconImage from "../IconImage/IconImage";
import { DEFAUT_IMAGE_URL } from "../../defaultSettings"

const ChatLine = ({poster, content, post_date}) => {

    const t = new Date(post_date)

    return (<>
        <IconImage img={
            poster.picture_url ?
                poster.picture_url :
                DEFAUT_IMAGE_URL
            }/>
        <span className="ChatLine-poster-name">
            {poster.name}:
        </span>
        <span className="ChatLine-post-date">
            {
                `${t.getMonth()}/${t.getDay()}/${t.getFullYear()} ` +
                `${t.getHours()}:${t.getMinutes()}`
            }
        </span><br/>
        <span className="ChatLine-content">
            {content}
        </span>
    </>)
}

export default ChatLine