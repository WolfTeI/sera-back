const express = require('express');
const router = express.Router();
const queries = require('./config/queries');

router.get('/', (req, res) => {
    res.status(200).send("Sera Server on")
});

router.get('/config', (req, res) => {
    queries.getConfig().then((resp)=>{
        res.status(200).send(resp);
    })
})

router.put('/config', (req, res) => {
    queries.updateConfig(req.body).then((resp)=>{
        res.status(200).send(resp);
    })
});

router.get('/tablas', (req, res)=>{
    queries.getTablas().then((resp)=>{
        res.status(200).send(resp);
    })
})

router.post('/crearTabla', (req, res)=>{
    queries.crearTabla(req.body).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.delete('/eliminarTabla/:nombre_tabla', (req, res)=>{
    queries.eliminarTabla(req.params.nombre_tabla).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.get('/campos/:tabla', (req, res)=>{
    queries.getCampos(req.params.tabla).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.get('/contenido/:tabla', (req, res)=>{
    queries.getContenido(req.params.tabla).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.post('/registro', (req, res)=>{
    queries.nuevoRegistro(req.body).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.put('/registro', (req, res)=>{
    queries.actualizarReg(req.body).then((resp)=>{
        res.status(200).send(resp);
    })
})

router.delete('/registro/:tabla/:ids', (req, res)=>{

    queries.eliminarReg({tabla: req.params.tabla, ids: req.params.ids}).then((resp)=>{
        res.status(200).send(resp);
    })
})

module.exports = router;