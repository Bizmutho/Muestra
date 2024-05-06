import moment from "moment";
import React from "react";

export default function MsjItemSaliente({msj}){

    function formatFechaHora(fecha){
        return moment(fecha).format('DD-MM-YY - HH:MM');
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '5px', borderRadius: '10px', padding: '10px', backgroundColor: '#6a5dbf', color: '#fff', boxShadow: '0px 0px 2px 1px #c3c3c3'}}>
            <span style={{margin: '3px 0px'}}>
                {msj.mensaje}
            </span>
            <span style={{textAlign: 'end', fontSize: '8px', fontWeight: 'bold'}}>
                {formatFechaHora(msj.fecha)}
            </span>
        </div>
    )
}