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
        setUsuariosSql(resp);
    }

    return(
        <div>
            <UsersList usuarios={usuariosSql}/>
        </div>
    )
}

export default UsuariosSql;