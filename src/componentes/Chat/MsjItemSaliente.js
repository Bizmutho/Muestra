import moment from "moment";
import React from "react";

export default function MsjItemSaliente({msj}){

    function formatFechaHora(fecha){
        return moment(fecha).format('DD-MM-YY - HH:MM');
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', border: '1px', borderStyle: 'solid', marginBottom: '3px', borderRadius: '10px', padding: '10px', backgroundColor: '#6a5dbf', color: '#fff'}}>
            <span style={{margin: '3px 0px'}}>
                {msj.mensaje}
            </span>
            <span style={{textAlign: 'end', fontSize: '8px', fontWeight: 'bold'}}>
                {formatFechaHora(msj.fecha)}
            </span>
        </div>
    )
}