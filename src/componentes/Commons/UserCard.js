import React from "react";

export default function UserCard({user}){
    return(
        <div style={{backgroundColor: '#fff', width: '80%', margin: '5px 0px', display: 'flex', flexDirection: 'row', borderRadius: '15px', boxShadow: '0px 1px 3px 3px #c3c3c3'}}>
            <div style={{borderRight: '2px solid #c3c3c3', padding: 10}}>
                <img src={`https://www.snteseccion30sartet.org.mx/ti/personal/fotos/${user.foto}`} style={{width: '200px', height: '200px', borderRadius: '100%', boxShadow: '0px 1px 3px 3px #c3c3c3', objectFit: 'cover'}} alt=""></img>
            </div>
            <div style={{padding: 10}}>
                <p>
                    <span>
                        {user.titulo}
                    </span>
                    <span>
                        {user.nombre}
                    </span>
                </p>
                <p>
                    <span>
                        {user.rfc}
                    </span>
                </p>
                <p>
                    <span>
                        {user.departamento}
                    </span>
                </p>
                <p>
                    <span>
                        {user.usuario_nivel}
                    </span>
                </p>
                <p>
                    <span>
                        {user.usuario_puesto}
                    </span>
                </p>
                <span>
                    {user.celular}
                </span>
                <span>
                    {user.tiposangre}
                </span>
            </div>
        </div>
    )
}