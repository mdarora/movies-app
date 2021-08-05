import React from 'react';

const InfoItem = (props) => {
    return (
        <div>
            <p>{props.item} : <span>{props.value}</span></p>
        </div>
    )
}

export default InfoItem
