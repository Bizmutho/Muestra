import React, { useEffect, useState } from "react";
import { fetchAsyncToAPI } from "../../service/fetchAsyncToAPI";
import UsersList from "../Commons/UsersList";

function UsuariosSql(){
    const [usuariosSql, setUsuariosSql] = useState([]);

    useEffect(()=>{
        fetchMyAPI();
    },[])

    async function fetchMyAPI() {
        const resp = await fetchAsyncToAPI('GET');
        setUsuariosSql(resp.map(usr => {
            return ({...usr, foto: `https://www.snteseccion30sartet.org.mx/ti/personal/fotos/${usr.foto}`})
        }));
    }

    return(
        <div style={{width: '100%'}}>
            <UsersList usuarios={usuariosSql}/>
        </div>
    )
}

export default UsuariosSql;