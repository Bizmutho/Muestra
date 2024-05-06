import React, { useEffect, useRef, useState } from "react";
import './AddUsuario.css';
import { getDownloadURL, getStorage, ref as refS, uploadBytes } from "firebase/storage";
import app from "../../config";
import { v4 } from "uuid";
import { getDatabase, push, ref, set } from "firebase/database";

export default function AddUsuario(){
    const [usuario, setUsuario] = useState({
        departamento: "",
        nombre: "",
        rfc: "",
        tiposangre: "",
        titulo: "",
        usuario_nivel: "",
        usuario_puesto: "",
        celular: ""
    });
    const [img, setImg] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const inputFile = useRef(null);

    useEffect(() => {
        resetUsuario();
    }, [])

    function resetUsuario(){
        setUsuario({
            departamento: "",
            nombre: "",
            rfc: "",
            tiposangre: "",
            titulo: "",
            usuario_nivel: "",
            usuario_puesto: "",
            celular: ""
        });
    }

    function usuarioValido(){
        var msj = '';

        if(imgFile === null || imgFile === undefined || imgFile === ''){
            msj = "Por favor, seleccione una imagen."
        } else {
            Object.keys(usuario).forEach(function(key) {
                if(usuario[key] === undefined || usuario[key] === ''){
                    msj = 'Por favor, complete el formulario';
                    return false;
                }
            });
        }

        if(msj === '')
            return true;            

        alert(msj);

        return false;
    }

    const agregarUsuario = async () => {
        if(usuarioValido()){
            const imageDB = getStorage(app);
            const imgRef = refS(imageDB, `fotos/${v4()}`)
            uploadBytes(imgRef, imgFile).then((value => {
                getDownloadURL(value.ref).then(url => {
                    const db = getDatabase(app);
                    const newDocRef = push(ref(db, "muestra/usuarios"));
                    console.log({
                        ...usuario,
                        foto: url,
                        fecha: new Date().toISOString()
                    });
                    set(newDocRef, {
                        ...usuario,
                        foto: url,
                        fecha: new Date().toISOString()
                    }).then(() => {
                        resetUsuario();
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

    const handleImagenSeleccionada = (e) => {
      const archivo = e.target.files[0];
      imagenSeleccionada(archivo);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const archivo = e.dataTransfer.files[0];
        imagenSeleccionada(archivo);
    };

    function imagenSeleccionada(archivo){
      if (archivo) {
        const lector = new FileReader();
        lector.onload = () => {
          setImg(lector.result);
          setImgFile(archivo)
        };
        lector.readAsDataURL(archivo);
      }
    }

    return(
        <div className="addContainer" style={{backgroundColor: '#fff', width: '665px', margin: '5px 10px', display: 'flex', flexDirection: 'row', borderRadius: '15px', boxShadow: '0px 0px 3px 3px #c3c3c3'}}>
            <div style={{borderRight: '4px solid #c3c3c3', padding: 10, backgroundColor: '#6a5ac3', borderRadius: '15px 0px 0px 15px', alignItems: 'center', display: 'flex', maxWidth: '64px', minWidth: '64px'}}>
                <div className="contenedor-input" onDragOver={handleDragOver} onDrop={handleDrop}>
                    <input
                        type="file"
                        id="archivoInput"
                        className="input-oculto"
                        accept="image/*"
                        onChange={handleImagenSeleccionada}
                        ref={inputFile}
                    />
                    <label htmlFor="archivoInput" className="label-personalizado">
                        <div className="boton-personalizado" style={{ backgroundImage: `url(${img})` }} >
                            {!img && 'Seleccione una imagen'}
                        </div>
                    </label>
                </div>
            </div>
            <div style={{padding: '15px 10px', flexGrow: 1, marginLeft: 75}}>
                <div className="headerContainer">
                    <div className="tituloContainer">
                        <p className="tituloCard">Titulo:</p>
                        <input type="text" value={usuario.titulo} onChange={(e) => setUsuario({...usuario, titulo: e.target.value})}></input>
                    </div>
                    <div className="nombreContainer">
                        <p className="tituloCard">Nombre:</p>
                        <input type="text" value={usuario.nombre} onChange={(e) => setUsuario({...usuario, nombre: e.target.value})}></input>
                    </div>
                </div>
                <div style={{marginTop: 5}}>
                    <div className="infoInputContainer">
                        <p className="title">RFC:</p>
                        <input type="text" className="inputInfo" value={usuario.rfc} onChange={(e) => setUsuario({...usuario, rfc: e.target.value})}></input>
                    </div>
                    <div className="infoInputContainer">
                        <p className="title">Area:</p>
                        <input type="text" className="inputInfo" value={usuario.departamento} onChange={(e) => setUsuario({...usuario, departamento: e.target.value})}></input>
                    </div>
                    <div className="infoInputContainer">
                        <p className="title">Perfil:</p>
                        <input type="text" className="inputInfo" value={usuario.usuario_nivel} onChange={(e) => setUsuario({...usuario, usuario_nivel: e.target.value})}></input>
                    </div>
                    <div className="infoInputContainer">
                        <p className="title">Puesto:</p>
                        <input type="text" className="inputInfo" value={usuario.usuario_puesto} onChange={(e) => setUsuario({...usuario, usuario_puesto: e.target.value})}></input>
                    </div>
                    <div className="infoInputContainer">
                        <p className="title">Celular:</p>
                        <input type="text" className="inputInfo" value={usuario.celular} onChange={(e) => setUsuario({...usuario, celular: e.target.value})}></input>
                    </div>
                    <div className="infoInputContainer">
                        <p className="title">Tipo de sangre:</p>
                        <input type="text" className="inputInfo" value={usuario.tiposangre} onChange={(e) => setUsuario({...usuario, tiposangre: e.target.value})}></input>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'end', padding: '5px 0px'}}>
                    <button onClick={agregarUsuario} className="btnAddUser">Agregar</button>
                </div>
            </div>
        </div>
    )
}