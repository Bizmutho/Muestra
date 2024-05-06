import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MsjItemEntrante({msj}){
    const hashMap = useSelector(state => state.hashMap);
    const dispatch = useDispatch();
    const [color, setColor] = useState('#000');

    useState(() =>{
        setColor(colorUsuario(msj.usuario));
    }, [])

    function formatFechaHora(fecha){
        return moment(fecha).format('DD-MM-YY - HH:MM');
    }

    function colorUsuario(usuario){
        var item = hashMap[usuario];
        
        if(item !== undefined)
            return item.color;

        dispatch({ type: 'ADD_USER_COLOR', key: usuario });
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '5px', borderRadius: '10px', padding: '5px 10px', backgroundColor: '#eeeeee', boxShadow: '0px 0px 2px 1px #c3c3c3'}}>
            <span style={{fontWeight: 'bold', fontSize: '12px', color}}>
                {msj.usuario}
            </span>
            <span style={{margin: '3px 0px'}}>
                {msj.mensaje}
            </span>
            <span style={{textAlign: 'end', fontSize: '8px', fontWeight: 'bold'}}>
                {formatFechaHora(msj.fecha)}
            </span>
        </div>
    )
}