import React, { useEffect, useRef } from "react";
import MsjItemEntrante from "./MsjItemEntrante";
import MsjItemSaliente from "./MsjItemSaliente";

export default function MsjList({msgs, usuario, style = {}}){
    const bottomRef = useRef(null);

    useEffect(() => {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);

    return(
        <div style={{minHeight: '250px', ...style}}>
            {msgs.map((item, index) => (
                (
                    (usuario === item.usuario) ?
                    <MsjItemSaliente key={index} msj={item}/>:
                    <MsjItemEntrante key={index} msj={item}/>
                )
            ))}
            <div ref={bottomRef}></div>
        </div>
    )
}