import React from "react";
import './UserCard.css';

export default function UserCard({user}){
    return(
        <div style={{backgroundColor: '#fff', width: '665px', margin: '5px 0px', display: 'flex', flexDirection: 'row', borderRadius: '15px', boxShadow: '0px 0px 3px 3px #c3c3c3'}}>
            <div style={{borderRight: '4px solid #c3c3c3', padding: 10, backgroundColor: '#6a5ac3', borderRadius: '15px 0px 0px 15px', alignItems: 'center', display: 'flex', maxWidth: '64px', minWidth: '64px'}}>
                <img src={user.foto} style={{minWidth: '150px', height: '150px', borderRadius: '100%', boxShadow: '0px 0px 0px 4px #c3c3c3', backgroundColor: '#f3f3f3', objectFit: 'cover'}} alt=""></img>
            </div>
            <div style={{padding: '15px 10px', flexGrow: 1, marginLeft: 75}}>
                <p style={{color:'#6a5ac3', fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
                {user.titulo === '' ? 'S/D' : user.titulo} {user.nombre === '' ? 'S/D' : user.nombre}
                </p>
                <div style={{marginTop: 5}}>
                    <p>
                        <span className="title">RFC: </span>
                        <span className="info">{user.rfc === '' ? 'S/D' : user.rfc}</span>
                    </p>
                    <p>
                        <span className="title">Area: </span>
                        <span className="info">{user.departamento === '' ? 'S/D' : user.departamento}</span>
                    </p>
                    <p>
                        <span className="title">Perfil: </span>
                        <span className="info">{user.usuario_nivel === '' ? 'S/D' : user.usuario_nivel}</span>
                    </p>
                    <p>
                        <span className="title">Puesto: </span>
                        <span className="info">{user.usuario_puesto === '' ? 'S/D' : user.usuario_puesto}</span>
                    </p>
                    <p>
                        <span className="title">Celular: </span>
                        <span className="info">{user.celular === '' ? 'S/D' : user.celular}</span>
                    </p>
                    <p>
                        <span className="title">Tipo de sangre: </span>
                        <span className="info">{user.tiposangre === '' ? 'S/D' : user.tiposangre}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}