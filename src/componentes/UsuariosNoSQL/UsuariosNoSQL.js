import { getDatabase, limitToLast, onValue, query, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../../config";
import UsersList from "../Commons/UsersList";
import AddUsuario from "./AddUsuario";

export default function UsuariosNoSql(){
    const [usuariosNoSql, setUsuariosNoSql] = useState([]);

    useEffect(()=>{
        const db = getDatabase(app);
        const dbRefU = ref(db, "muestra/usuarios");
        const lastTenUsersQuery = query(dbRefU, limitToLast(10));

        onValue(lastTenUsersQuery, (snapshot) => {
            if(snapshot.exists()){
                setUsuariosNoSql(Object.values(snapshot.val()).reverse());
            } else {
            }
        });
    },[])

    return(
        <div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <AddUsuario />
            <div style={{width: '100%'}}>
                <UsersList usuarios={usuariosNoSql}/>
            </div>
        </div>
    )
}