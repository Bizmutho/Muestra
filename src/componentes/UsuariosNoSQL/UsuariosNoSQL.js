import { getDatabase, limitToLast, onValue, push, query, ref, set } from "firebase/database";
import { uploadBytes, ref as refS, getStorage, getDownloadURL } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import app from "../../config";
import { v4 } from "uuid";

export default function UsuariosNoSql(){
    const [name, setName] = useState([]);
    const [img, setImg] = useState([]);
    const [usuariosNoSql, setUsuariosNoSql] = useState([]);
    const inputFile = useRef(null);

    useEffect(()=>{
        const db = getDatabase(app);
        const dbRefU = ref(db, "muestra/usuarios");
        const lastTenUsersQuery = query(dbRefU, limitToLast(10));

        onValue(lastTenUsersQuery, (snapshot) => {
            if(snapshot.exists()){
                setUsuariosNoSql(Object.values(snapshot.val()));
            } else {
            }
        });
    },[])

    const agregarUsuario = async () => {
        if(img !== null && img !== undefined){
            const imageDB = getStorage(app);
            const imgRef = refS(imageDB, `fotos/${v4()}`)
            uploadBytes(imgRef, img).then((value => {
                getDownloadURL(value.ref).then(url => {
                    const db = getDatabase(app);
                    const newDocRef = push(ref(db, "muestra/usuarios"));
                    set(newDocRef, {
                        nombre: name,
                        url,
                        fecha: new Date().toISOString()
                    }).then(() => {
                        setName('');
                        setImg(null);
                        handleReset();
                    }).catch((error) => {
                        alert(error);
                    });
                })
            }))
        }
    }

    const handleReset = () => {
        if (inputFile.current) {
            inputFile.current.value = "";
            inputFile.current.type = "text";
            inputFile.current.type = "file";
        }
    };

    return(
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
            <input type="file" ref={inputFile} onChange={(e) => setImg(e.target.files[0])}></input>
            <button onClick={agregarUsuario}>Agregar</button>
            {usuariosNoSql.map((item) => (
                <div key={item.nombre}>
                    <p>
                        {item.nombre}
                    </p>
                    <img src={item.url} style={{width: '300px'}} alt=""></img>
                </div>
            ))}
        </div>
    )
}