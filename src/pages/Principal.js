import React from "react";
import Chat from "../componentes/Chat/Chat";
import UsuariosSql from "../componentes/UsuariosSQL/UsuariosSQL";
import UsuariosNoSql from "../componentes/UsuariosNoSQL/UsuariosNoSQL";
import Panel from "../componentes/TabNavigator/Panel";
import Tabs from "../componentes/TabNavigator/Tabs";

function Principal(){

    return(
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', height: '100%'}}>
            <Tabs>
                <Panel title="Chat">
                    <Chat />
                </Panel>
                <Panel title="Usuarios Sql">
                    <UsuariosSql />
                </Panel>
                <Panel title="Usuarios NoSql">
                    <UsuariosNoSql />
                </Panel>
            </Tabs>
        </div>
    )
}

export default Principal