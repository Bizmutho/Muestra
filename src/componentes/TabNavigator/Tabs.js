import React, { useEffect, useState } from "react";

export default function Tabs({children}){
    const [panels, setPanels] = useState();
    const [tabSelected, setTabSelected] = useState(0);

    useEffect(() => {
        setPanels(children);
    }, [children])

    return(
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <ul style={{display: 'flex', justifyContent: 'center', padding: '0px', maxHeight: '5%'}}>
            { panels !== undefined &&
                panels.map((item,index) => {
                    return(
                        <li key={index} className={index === tabSelected ? 'selected' : ''} onClick={() => setTabSelected(index)}>
                            {item.props.title}
                        </li>
                    )
                })
            }
            </ul>
            <div style={{display: 'flex', justifyContent: 'center', flexGrow: 1, maxHeight: '92%'}}>{panels !== undefined && panels[tabSelected]}</div>
        </div>
    )
}