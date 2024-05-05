import { getDatabase, limitToLast, onValue, push, query, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../../config";
import MsjList from "./MsjList";

function Chat(){
    const [userDefault] = useState('invitado-' + Math.floor(Math.random() * 1000));
    const [usuario, setUsuario] = useState(userDefault)
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, "muestra/mensajes");
        const lastTenMsgsQuery = query(dbRef, limitToLast(20));

        onValue(lastTenMsgsQuery, (snapshot) => {
            if(snapshot.exists()){
                setMsgs(Object.values(snapshot.val()));
            } else {
                setMsgs([]);
            }
        });
    }, [])

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            enviar();
        }
    };
    
    const enviar = async () => {
        if(msg !== undefined && msg !== ''){
            const db = getDatabase(app);
            const newDocRef = push(ref(db, "muestra/mensajes"));
            set(newDocRef, {
                usuario: usuario === '' ? userDefault: usuario,
                mensaje: msg,
                fecha: new Date().toISOString()
            }).then(() => {
                setMsg('');
            }).catch((error) => {
                alert(error);
            }); 
        }
    }

    return(
        <div style={{maxWidth: '500px', display: 'flex', height: '95%'}}>
            <div style={{display:'flex', flexDirection: 'column', backgroundColor: '#6a5ac3', border: '2px', borderColor: '#6a5ac3', borderStyle: 'solid', borderRadius: '10px', height: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', padding: '0px 10px', minHeight: '7%'}}>
                    <p style={{margin: '0px', color: '#fff', fontWeight: 'bold', fontSize: '13px'}}>Chateando como:</p>
                    <input type="text" style={{flexGrow: '1', marginLeft: '10px', color: '#6a5ac3', fontSize: '18px', fontWeight: 'bold', border: '1px solid #000', borderRadius: '3px', padding: '3px'}} value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
                </div>
                <div style={{backgroundColor: '#fff', borderRadius: '10px 10px 10px 10px', boxShadow: '0px -5px 5px rgba(0,0,0,.3)', minHeight: '93%'}}>
                    <MsjList usuario={usuario === '' ? userDefault : usuario} msgs={msgs} style={{minHeight: '93%', maxHeight: '93%', overflow: 'auto', margin: '1px 8px 0px 8px'}}/>
                    <div style={{display: 'flex', alignItems: 'center', borderTop: '1px', borderTopColor: '#6a5ac3', borderTopStyle: 'solid', padding: '0px 5px', minHeight: '6%'}}>
                        <input type="text" placeholder="Mensaje" style={{flexGrow: '1', color: '#6a5ac3', fontSize: '15px', fontWeight: 'bold', border: '1px solid #000', borderRadius: '3px', padding: '3px'}} value={msg} onChange={(e) => setMsg(e.target.value)} onKeyUp={handleKeyPress}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;