const { log } = require('console');
const { getConn } = require('./db');
const fs = require('fs');

async function getConfig(){
    let resultado;
    try {
        let file = fs.readFileSync('./config/config.json', 'utf8');
        resultado = await JSON.parse(file);
    } catch (error) {
        console.log(error)
    }
    return resultado;
}

async function updateConfig(obj){
    let resultado;
    try {
        fs.writeFileSync('./config/config.json', JSON.stringify(obj));
        resultado = 'exito';
    } catch (error) {
        console.log(error)
        resultado = 'error';
    }
    return resultado;

}

async function getTablas(){
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`SELECT * FROM tablas`);
        conn.end()
    } catch (error) {
        console.log(error)
    }
    return resultado;
}

async function crearTabla(obj){
    let resp;
    try {
        const conn = await getConn();
        await conn.query(`CREATE TABLE IF NOT EXISTS ${obj.nombre} (
                            id_${obj.nombre} int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                            ${obj.campos});`);
        await conn.query(`INSERT INTO tablas (nombre_tabla) VALUES ('${obj.nombre}')`)
        resp = 'exito';
        conn.end()
    } catch (error) {
        console.log(error);
        resp = 'error';
    }

    return resp;
}

async function eliminarTabla(nombre_tabla){
    try {
        const conn = await getConn();
        await conn.query(`DROP TABLE IF EXISTS ${nombre_tabla};`);
        await conn.query(`DELETE FROM tablas where nombre_tabla = '${nombre_tabla}'`);
        conn.end()
    } catch (error) {
        
    }
}


//Manejar los datos de las tablas
async function getCampos(tabla){
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`DESCRIBE ${tabla}`);
        conn.end()
    } catch (error) {
        console.log(error);
    }
    return resultado;
}

async function getContenido(tabla){
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`SELECT * FROM ${tabla}`);
        conn.end()
    } catch (error) {
        console.log(error);
    }
    return resultado;
}

async function getContenidoConId(tabla, id){
    let resultado;
    try {
        const conn = await getConn()
        resultado = await conn.query(`SELECT * FROM ${tabla} WHERE id_${tabla} = ${id}`)
        conn.end()
    } catch (error) {
        console.log(error);
    }

    return resultado
}

async function getContenidoBusqueda(tabla, campo, dato){
    let resultado;
    try {
        const conn = await getConn();
        let condicion = ''
        let primero = campo.shift()
        campo.forEach((c, index)=>{
            if(campo.length - 1 === index){
                condicion += `${c.Field} LIKE '%${dato}%'`
            }else{
                condicion += `${c.Field} LIKE '%${dato}%' OR `
            }

        })

        resultado = await conn.query(`SELECT * FROM ${tabla} WHERE ${condicion}`);
        conn.end()
    } catch (error) {
        console.log(error);
    }
    return resultado;
}

async function nuevoRegistro(obj){
    let resultado;
    try {
        const conn = await getConn();
        await conn.query(`INSERT INTO ${obj.tabla} (${obj.campos}) VALUES (${obj.contenido})`);
        resultado = 'exito';
        conn.end()
    } catch (error) {
        resultado = 'error';
        console.log(error);
    }

    return resultado;
}

async function eliminarReg(objEliminar){
    let resp;
    try {
        const conn = await getConn();
        conn.query(`DELETE FROM ${objEliminar.tabla} WHERE id_${objEliminar.tabla} = ${objEliminar.ids}`);
        resp = 'exito';
        conn.end()
    } catch (error) {
        resp = 'error'
        console.log(error);
    }
    return resp;
}

async function actualizarReg(objActualizar){
    let resp;
    try {
        const conn = await getConn();
        await objActualizar.campos.forEach((campo, index) => {
            conn.query(`UPDATE ${objActualizar.tabla} SET ${campo} = ${objActualizar.contenido[index]} WHERE id_${objActualizar.tabla} = '${objActualizar.id}'`);
        })
        resp = 'exito';
        conn.end()
    } catch (error) {
        resp = 'error'
        console.log(error);
    }
    return resp;
}



//Valida el legajo del usuario
async function validarLegajo(legajo){
    let resultado;
    try {
        const conn = await getConn();
        resultado = await conn.query(`SELECT * FROM user WHERE legajo = '${legajo}'`);
        conn.end()
        
    } catch (error) {
        console.log(error);
    }
    return resultado;
}

async function nuevoUsuario(userObj){
    let resultado;
    try {
        const conn = await getConn();
        await conn.query(`INSERT INTO user (nombre_user, legajo, activo)
                                      VALUES ('${userObj.nombre}', '${userObj.legajo}', '1')`);
        
        resultado = 'exito';
        conn.end()
    } catch (error) {
        resultado = 'error';
        console.log(error);
    }
    return resultado;
}

module.exports = {
    getConfig,
    updateConfig,
    getTablas,
    crearTabla,
    eliminarTabla,
    getCampos,
    getContenido,
    getContenidoConId,
    getContenidoBusqueda,
    nuevoRegistro,
    eliminarReg,
    actualizarReg,
    validarLegajo,
    nuevoUsuario
}