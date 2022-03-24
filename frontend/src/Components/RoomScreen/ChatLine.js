import React from "react";
import IconImage from "../IconImage/IconImage";
import { DEFAUT_IMAGE_URL } from "../../defaultSettings"

const ChatLine = ({poster, content, post_date}) => {

    return (<>
        <IconImage img={
            poster.picture_url ?
                poster.picture_url :
                DEFAUT_IMAGE_URL
            }/>
        <span className="ChatLine-poster-name">
            {poster.name}:
        </span>
        <span className="ChatLine-content">
            {content}
        </span><br/>
        <span className="ChatLine-post-date">
            {post_date}
        </span>
    </>)
}

export default ChatLine