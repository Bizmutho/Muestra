export const fetchAsyncToAPI = async ( type ) => {
    try {
        
        const url = `https://www.snteseccion30sartet.org.mx/ti/pruebaU.php`
        let resp;
        let dataRecived;
        
        
        resp = await fetch( url,{ method:type } )
        dataRecived = await resp.json()

        return dataRecived
        
    } catch (error) {

        console.log("ERROR EN FETCH:", error)
        return {}
        
    }
}