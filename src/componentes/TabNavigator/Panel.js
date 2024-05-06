import React from "react";

export default function Panel(props){
    return(
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {props.children}
        </div>
    )
}