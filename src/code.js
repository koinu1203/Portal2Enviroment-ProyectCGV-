import * as THREE from "../modules/three.module.js"
//import * as THREEx from "../modules/threex.keyboardstate.js"
import { OrbitControls } from "../controls/OrbitControls.js"
import * as loadAssets from "./loadAssets.js"
import { DragControls } from "../controls/DragControls.js" 
import { GUI } from "../modules/dat.gui.module.js"
import Stats from "../modules/stats.module.js"
import { RectAreaLightHelper } from "../Lights/RectAreaLightHelper.js"
import {RectAreaLightUniformsLib} from "../Lights/RectAreaLightUniformsLib.js"

//Graphics variables 
let camera
let scene 
let renderer 
let skybox
let skyboxName

//keyboard
let keyboard 

//Seleccion 
let enableSeleccion

//Interfaz
let gui
const vidparams={
    Play: playvideo,
    Pause: pausevideo,
    Stop: stopvideo,
    Replay: replayvideo
}
const orbitparams={
    
}

//controls No borrar 
let orbitcontrols
let drangControls

//Raycaster
let raycaster

//lights
let light //ambiente
let light2 //Rectangular Light
let light3 //pointer light
let light4 //Another Rectangular Light
let light5 //spot Light
let light6 //point light
let light7 //point light
let light8 //point light
let lightHelper //light helper
let camerShadowHelper

//video objects
let video
let vidTex
let status 

//Stats (FPS/MS)
let stats


init()
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c)

    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth/window.innerHeight,
        5.0,
        3000
    )
    //camera.lookAt(-200,1,200)
    camera.position.set(-200,100,200)

    renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled=true
    //renderer.physicallyCorrectLights=true
    //renderer.toneMapping=THREE.CineonToneMapping
    renderer.shadowMap.type=THREE.VSMShadowMap
    document.body.appendChild(renderer.domElement)
    
    window.addEventListener('resize', canvasResize)
    window.addEventListener('click',onclick)
    keyboard = new THREEx.KeyboardState()
    status=false
    
    stats=Stats()
    document.body.appendChild(stats.dom)

    enableSeleccion=false
    
    raycaster=new THREE.Raycaster()
    
    gui=new GUI()
    addGui()
    
    enableOrbitControls()
    
    display()
}

function display() {
    let xpos,ypos,zpos
    xpos=100
    ypos=0
    zpos=-100
    /*xpos=0
    ypos=0
    zpos=0*/

    //Skybox / fondo
    skybox_Background()
    loadEdificio()

    //LUCES
    createLight(xpos+0,ypos+0,zpos+0) 

    //PERIMETRO
    loadPerimetro()

    //PISO
    loadPisoMadera(xpos+0,ypos+0,zpos+0)
    loadAlterPisoA()
    loadPisoMadera2()
    loadAlterPisoB()

    //PAREDES
    loadParedes(xpos+0,ypos+2,zpos+0)
    
    //VENTANAS
    loadVentana(xpos+0,ypos,zpos)
    
    //ASCENSOR
    loadAsensor()
    
    //SILLAS 
    loadSillas(xpos+15,ypos+0,zpos+-20)

    //MESA
    loadMesa(xpos+15,ypos+0,zpos+-20)

    //PROYECTOR
    loadProyector(xpos+-10,ypos+40,zpos+-20)

    //CIENTIFICOS
    loadCientificos(xpos+0,ypos+0,zpos+0)
    loadCientificoSentado(xpos+0,ypos+0,zpos+0)
    loadCoffes()

    //PIZARRA & VIDEO
    loadPizarra(xpos+0,ypos+0,zpos+0)
    loadVideo(xpos+-93,ypos+30,zpos+-19.5,3.2)
    
    //RECUADROS
    //loadRecuadros()

    //LABORATORIO
    laboratorio()
    loadShower()
    loadCloset()

    //ESCRITORIOS
    loadEscritorios()
    loadOficinistas()

    //ITEMS SOMBRE MESA
    loadLaptop(0,0,0)

    //controles para mover objetos (Deshabilitar Orbit Controls )
    //enableDragControls()

    //Sector PRUEBAS
    loadLabScene(xpos+0,ypos+0,zpos+0)
    //cuboPrueba()
    
    //LOOP DE RENDERIZADO
    animate()
}
function cuboPrueba() {
    const material=new THREE.MeshPhongMaterial({color: 0xa4e7ff})
    const cubo=new THREE.BoxGeometry(40,40,80)
    const cuboObjeto=new THREE.Mesh(cubo,material)
    cuboObjeto.position.set(0,0,2)
    cuboObjeto.receiveShadow=true;
    cuboObjeto.castShadow=true;
    scene.add(cuboObjeto)
}
function loadOficinistas(){
    loadAssets.clearall()
    loadAssets.setResizeUnic(1.0)
    loadAssets.setRotation(0,Math.PI*-0.25,0)


    //IZQUIERDA
    loadAssets.setCords(-56,2,56)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-58,7,57)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-69.5,38.2,74,'background.png',13.5,14)

    loadAssets.setCords(-56,2,146)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-58,7,147)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0) 
    loadPosterAlter(-69.5,38.2,164,'background.png',13.5,14)

    loadAssets.setCords(-146,2,56)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-148,7,57)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-159.5,38.2,74,'background.png',13.5,14)

    loadAssets.setCords(-146,2,146)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-148,7,147)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-159.5,38.2,164,'background.png',13.5,14)

    //DERECHA
    loadAssets.setCords(-56,2,-58)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-58,7,-57)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-69.8,38.2,-40.8,'background.png',13.5,14)

    loadAssets.setCords(-146,2,-58)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-148,7,-57)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-159.8,38.2,-40.8,'background.png',13.5,14)

    loadAssets.setCords(-56,2,-148)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-58,7,-147)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-69.8,38.2,-130.8,'background.png',13.5,14)

    loadAssets.setCords(-146,2,-148)
    loadAssets.SillaOficina2(scene)
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(-148,7,-147)
    loadAssets.cientificoSentado(scene,2)
    loadAssets.setResizeUnic(1.0)
    loadPosterAlter(-159.8,38.2,-130.8,'background.png',13.5,14)
}
function loadAsensor() {
    loadAssets.clearall()
    loadAssets.setResize(0.46,0.55,0.40)
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.setCords(161,2,-0.3)
    loadAssets.Elevador(scene)
}
function laboratorio() {
    loadAssets.clearall()
    loadAssets.setResize(0.8,0.8,0.7)

    loadAssets.setCords(61,2,179)
    loadAssets.setRotation(0,Math.PI*-1.0,0)
    loadAssets.Laboratorio(scene,1)

    loadAssets.setCords(78,2,66)
    //loadAssets.setResize(1.0,0.9,0.85)
    loadAssets.setRotation(0,Math.PI*-0.0,0)
    loadAssets.Laboratorio(scene,2)
}
function loadShower() {
    loadAssets.clearall()
    loadAssets.setResize(0.4,0.4,0.4)
    loadAssets.setRotation(0,Math.PI*-0.0,0)
    loadAssets.setCords(170,2,62)
    loadAssets.Shower(scene)

    const vidrioMaterial=new THREE.MeshLambertMaterial({color: 0xa1c8d6, transparent:true, opacity: 0.9})
    const vidrioA=new THREE.Mesh(
        new THREE.BoxGeometry(30,56,2),
        vidrioMaterial
    )
    vidrioA.position.set(183,32,76)
    vidrioA.receiveShadow=true 
    vidrioA.castShadow=true
    scene.add(vidrioA)

    const vidrioB=new THREE.Mesh(
        new THREE.BoxGeometry(20,56,2),
        vidrioMaterial
    )
    vidrioB.position.set(158,32,76)
    vidrioB.receiveShadow=true 
    vidrioB.castShadow=true
    scene.add(vidrioB)

    const vidrioC=new THREE.Mesh(
        new THREE.BoxGeometry(2,56,34),
        vidrioMaterial
    )
    vidrioC.position.set(147,32,60)
    vidrioC.receiveShadow=true 
    vidrioC.castShadow=true
    scene.add(vidrioC)
}
function loadCloset() {
    loadAssets.clearall()
    loadAssets.setResize(0.3,0.3,0.25)
    loadAssets.setRotation(0,Math.PI*1.5,0)
    loadAssets.setCords(190,2,184)
    loadAssets.Closet(scene)
    loadAssets.setCords(190,2,152)
    loadAssets.Closet(scene)
    loadAssets.setCords(190,2,120)
    loadAssets.Closet(scene)
}
function loadEdificio() {
    
    const edificioGeomtry=new THREE.BoxGeometry(408,700,408)
    const imgEdifcio=new THREE.MeshToonMaterial({color:0xffffff, side:THREE.DoubleSide})
    const loadImg=new THREE.TextureLoader().load('/assets/img/Edificio2.png')
    loadImg.wrapS=loadImg.wrapT=THREE.RepeatWrapping
    loadImg.repeat.set(1,0.9)
    imgEdifcio.map=loadImg
    const edificio=new THREE.Mesh(edificioGeomtry,imgEdifcio)
    edificio.position.set(0,-348.8,0)
    edificio.rotation.set(0,0,0)
    //poster.receiveShadow=true
    //poster.castShadow=true
    scene.add(edificio)
}
function loadPerimetro() {
    const colorP= 0xf2f3e0
    const miniParedA=new THREE.Mesh(
        new THREE.BoxGeometry(400,3,4),
        new THREE.MeshToonMaterial({color: colorP})
    )
    miniParedA.position.set(0,3.78,202)
    miniParedA.receiveShadow=true
    scene.add(miniParedA)

    const miniParedB=new THREE.Mesh(
        new THREE.BoxGeometry(4,3,407),
        new THREE.MeshToonMaterial({color: colorP})
    )
    miniParedB.receiveShadow=true
    //miniParedB.rotation.set(0,Math.PI*0.5,0)
    miniParedB.position.set(202,3.78,0.5)
    scene.add(miniParedB)

    const miniParedC=miniParedA.clone()
    miniParedC.position.set(0,3.78,-201)
    scene.add(miniParedC)

    const miniParedD=miniParedB.clone()
    miniParedD.position.set(-202,3.78,0)
    scene.add(miniParedD)
}
function loadEscritorios() {
    loadAssets.clearall()
    loadAssets.setResizeUnic(1.0)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    
    loadAssets.setCords(-80,2,-130)
    loadAssets.EscritorioOficina(scene,2)

    loadAssets.setCords(-80,2,-40)
    loadAssets.EscritorioOficina(scene,3)

    loadAssets.setCords(-170,2,-130)
    loadAssets.EscritorioOficina(scene,4)

    loadAssets.setCords(-170,2,-40)
    loadAssets.EscritorioOficina(scene,2) 

    loadAssets.setCords(-80,2, 75)
    loadAssets.EscritorioOficina(scene,3)

    loadAssets.setCords(-170,2, 75)
    loadAssets.EscritorioOficina(scene,2)

    loadAssets.setCords(-80,2, 165)
    loadAssets.EscritorioOficina(scene,4)

    loadAssets.setCords(-170,2, 165)
    loadAssets.EscritorioOficina(scene,5)
}
function paredShadows1(cx,cy,cz,cr) {
    const material=new THREE.MeshToonMaterial({color: 0xffffff})
    const cubo=new THREE.BoxGeometry(0.5,70,198)
    const cuboObjeto=new THREE.Mesh(cubo,material)
    cuboObjeto.position.set(cx,cy,cz)
    cuboObjeto.rotation.set(0,cr,0)
    cuboObjeto.receiveShadow=true;
    cuboObjeto.castShadow=false;
    scene.add(cuboObjeto)
}
function loadRecuadros() {
    loadCuadro(42*1,45,-34,25,35,Math.PI*0.0,'CuboCompPoster2.jpg')
    loadCuadro(42*2,45,-34,25,35,Math.PI*0.0,'CakeLiePoster3.gif')
    loadCuadro(42*3,45,-34,25,35,Math.PI*0.0,'CaveJohnsonPoster4.jpg')
    
    loadCuadro(90,45,-40,100,40,Math.PI*1.0,'AperturePoster1.jpg')
}
function loadCuadro(coordx,coordy,coordz,cwidth,cheight,rotate,img) {
    loadAssets.clearall()
    loadAssets.setResize(cwidth/10,1.0,cheight/10)
    loadAssets.setRotation(Math.PI*0.5,0,rotate)
    loadAssets.setCords(coordx,coordy,coordz)
    loadAssets.Marco(scene)

    loadPoster(coordx,coordy,coordz,-rotate,img,cwidth-(cwidth/10),cheight-(cheight/10))
    
    const vidrioMaterial=new THREE.MeshLambertMaterial({color: 0xd6f2fc, transparent:true, opacity: 0.2})
    const rectangulo=new THREE.BoxGeometry(cwidth-(cwidth/10),cheight-(cheight/10),0.5)
    const ventana=new THREE.Mesh(rectangulo,vidrioMaterial)
    ventana.position.set(coordx,coordy,coordz)
    ventana.rotation.set(0,rotate,0)
    ventana.receiveShadow=true
    scene.add(ventana)
}
function loadLaptop(coordx,coordy,coordz) {
    loadAssets.clearall()
    loadAssets.setResizeUnic(0.14)
    loadAssets.setCords(coordx+129,coordy+22,coordz-115)
    loadAssets.Laptop(scene)
}
function loadPoster(coordx,coordy,coordz,rotate,img,pAncho,pAlto) {

    const planePoster=new THREE.PlaneGeometry(pAncho,pAlto,pAncho,pAlto)
    const imgPoster=new THREE.MeshToonMaterial({color:0xffffff, side:THREE.DoubleSide})
    if(img!=undefined){
        const loadImg=new THREE.TextureLoader().load('/assets/img/'+img)
        imgPoster.map=loadImg
    }
    const poster=new THREE.Mesh(planePoster,imgPoster)
    poster.position.set(coordx,coordy,coordz)
    poster.rotation.set(0,rotate,0)
    poster.receiveShadow=true
    poster.castShadow=true
    scene.add(poster)
}
function loadPosterAlter(coordx,coordy,coordz,img,pAncho,pAlto) {

    const planePoster=new THREE.PlaneGeometry(pAncho,pAlto,pAncho,pAlto)
    const imgPoster=new THREE.MeshToonMaterial({color:0xffffff,side:THREE.DoubleSide})
    if(img!=undefined){
        const loadImg=new THREE.TextureLoader().load('/assets/img/'+img)
        imgPoster.map=loadImg
    }
    const poster=new THREE.Mesh(planePoster,imgPoster)
    poster.position.set(coordx,coordy,coordz)
    poster.rotation.set(Math.PI*0.02,Math.PI*-1.245,Math.PI*1.98)
    poster.receiveShadow=true
    poster.castShadow=true
    scene.add(poster)
}
function loadVentana(coordx,coordy,coordz) {
    const vidrioMaterial=new THREE.MeshLambertMaterial({color: 0xa4e7ff, transparent:true, opacity: 0.5})
    const rectangulo=new THREE.BoxGeometry(76,34,4)
    const ventana=new THREE.Mesh(rectangulo,vidrioMaterial)
    ventana.geometry.scale(1,1.15,1)
    ventana.position.set(87,42.3,42)
    ventana.receiveShadow=true
    scene.add(ventana)
    
}
function loadLabScene(coordx,coordy,coordz) {
    loadAssets.clearall()
    loadAssets.setResizeUnic(0.9)

    //Cientificos
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(10,0,140)
    loadAssets.cientifico(scene,3)

    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(140,0,120)
    loadAssets.cientifico(scene,4)

    //Pera, sí una pera
    loadAssets.setResizeUnic(1.5)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(-20,43,126)
    loadAssets.Pera(scene)
    
    //Torreta
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.setResize(0.35,0.35,0.35)
    loadAssets.setCords(140,coordy+0,140)
    loadAssets.TorretaPortal(scene) 

    //Laser, sí los laseres mejoran todo :D
    const points=[]
    points.push(new THREE.Vector3(6,46,137))
    points.push(new THREE.Vector3(140,22,140))
    const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({color:0xb20000,linewidth:4})
    )
    scene.add(line)
}
function loadParedes(coordx,coordy,coordz) {
    loadAssets.clearall()
    loadAssets.setResize(1,1.2,1)

    //puertas
    loadAssets.setCords(coordx-60,coordy+0,coordz+54)
    loadAssets.PuertaModel1(scene) 

    loadAssets.setRotation(0,Math.PI*-0.55,0)
    loadAssets.setCords(coordx-93,coordy+0,coordz+138)
    loadAssets.PuertaModel1(scene)

    loadAssets.setRotation(0,Math.PI*0.55,0)
    loadAssets.setCords(coordx-112.5,coordy+0,coordz+69.5)
    loadAssets.PuertaModel1(scene)

    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx-71,coordy+0,coordz+132)
    loadAssets.PuertaModel1(scene)


    //paredes
    loadAssets.setRotation(0,Math.PI*-1.5,0)
    loadAssets.setCords(coordx+2,coordy+0,coordz+52)
    loadAssets.ParedPuertaSimple(scene) 

    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-90+4,coordy+0,coordz+102)
    loadAssets.ParedPuertaDoble(scene)

    loadAssets.setResize(1,1.15,1)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(coordx+2,coordy+0,coordz+130)
    loadAssets.ParedConVentanaYPuerta(scene)

    

    loadAssets.setResize(1.0,1.2,0.835)
    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-89+4,coordy+0,coordz+-18.5)
    loadAssets.ParedSimple(scene) 

    loadAssets.setResize(1.0,1.2,0.51)
    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-89+4,coordy+0,coordz+249)
    loadAssets.ParedSimple(scene) 

    

}
function loadPisoMadera() {
    const pisoTextureLoader=new THREE.TextureLoader().load('/assets/img/MaderaModel1.png')
    pisoTextureLoader.wrapS=pisoTextureLoader.wrapT=THREE.RepeatWrapping
    pisoTextureLoader.repeat.set(4,4)
    pisoTextureLoader.rotation=Math.PI*0.5
    const boxPiso=new THREE.PlaneGeometry(200,164,100,100)
    const texturePiso=new THREE.MeshPhongMaterial({color:0x636158, side:THREE.DoubleSide})
    texturePiso.map=pisoTextureLoader
    const piso= new THREE.Mesh(boxPiso,texturePiso)
    piso.position.set(100,1.9,-118)
    piso.rotation.set(Math.PI*0.5,0,0)
    piso.receiveShadow=true
    scene.add(piso)
}
function loadAlterPisoB() {
    const pisoTextureLoader=new THREE.TextureLoader().load('/assets/img/CeramicaModel2.png')
    pisoTextureLoader.wrapS=pisoTextureLoader.wrapT=THREE.RepeatWrapping
    pisoTextureLoader.repeat.set(2,0.85)
    //pisoTextureLoader.rotation=Math.PI*0.5
    const boxPiso=new THREE.PlaneGeometry(200,77.5,100,100)
    const texturePiso=new THREE.MeshPhongMaterial({color:0xa3a3a3, side:THREE.DoubleSide})
    texturePiso.map=pisoTextureLoader
    const piso= new THREE.Mesh(boxPiso,texturePiso)
    piso.position.set(100,1.9,2.7)
    piso.rotation.set(Math.PI*0.5,0,0)
    piso.receiveShadow=true
    scene.add(piso)
}
function loadPisoMadera2() {
    const pisoTextureLoader=new THREE.TextureLoader().load('/assets/img/CeramicaModel2.png')
    pisoTextureLoader.wrapS=pisoTextureLoader.wrapT=THREE.RepeatWrapping
    pisoTextureLoader.repeat.set(2,4)
    //pisoTextureLoader.rotation=Math.PI*0.5
    const boxPiso=new THREE.PlaneGeometry(200,400,100,100)
    const texturePiso=new THREE.MeshPhongMaterial({color:0xa3a3a3, side:THREE.DoubleSide})
    texturePiso.map=pisoTextureLoader
    const piso= new THREE.Mesh(boxPiso,texturePiso)
    piso.position.set(-100,1.9,0)
    piso.rotation.set(Math.PI*0.5,0,0)
    piso.receiveShadow=true
    scene.add(piso)
}
function loadAlterPisoA() {
    const boxPiso=new THREE.PlaneGeometry(200,159,200,200)
    const texturePiso=new THREE.MeshPhongMaterial({color:0xcfcfcf, side:THREE.DoubleSide})
    const pisoTextureLoader=new THREE.TextureLoader().load('/assets/img/PisoModel2.png')
    pisoTextureLoader.wrapS=pisoTextureLoader.wrapT=THREE.RepeatWrapping
    pisoTextureLoader.repeat.set(4,4)
    texturePiso.map=pisoTextureLoader
    const piso= new THREE.Mesh(boxPiso,texturePiso)
    piso.position.set(100,1.9,121)
    piso.rotation.set(Math.PI*0.5,0,0)
    piso.receiveShadow=true
    scene.add(piso)
}
function loadVideo(coordx,coordy,coordz,psize) {
    video=document.getElementById('VideoPresentation')

    vidTex = new THREE.VideoTexture(video)
    vidTex.minFilter= THREE.LinearFilter
    vidTex.magFilter= THREE.LinearFilter

    var movieMaterial = new THREE.MeshToonMaterial({map:vidTex})
    var plano=new THREE.PlaneGeometry(16*psize,9*psize,4,4)
    var movieScreen=new THREE.Mesh(plano,movieMaterial)
    movieScreen.receiveShadow=true
    movieScreen.castShadow=true
    movieScreen.position.set(coordx,coordy,coordz)
    movieScreen.rotateY(Math.PI*0.5)
    scene.add(movieScreen)
    video.currentTime=1.1

}
function loadSillas(coordx,coordy,coordz){
    loadAssets.setCords(0+coordx,coordy+2,coordz+-25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,0,0)
    loadAssets.silla_oficina(scene) 

    loadAssets.setCords(18+coordx,coordy+2,coordz+-25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,0,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(36+coordx,2+coordy,coordz+-25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,0,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx+-40,2+coordy,coordz+-25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,0,0)
    loadAssets.silla_oficina(scene)


    loadAssets.setCords(0+coordx,2+coordy,coordz+25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-1,0)
    loadAssets.silla_oficina(scene) 

    loadAssets.setCords(coordx+-18,2+coordy,coordz+25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-1,0)
    loadAssets.silla_oficina(scene) 

    loadAssets.setCords(coordx+-36,2+coordy,coordz+25)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-1,0)
    loadAssets.silla_oficina(scene) 


    loadAssets.setCords(coordx+65,2+coordy,coordz+0)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.silla_oficina(scene) 
    
}
function loadMesa(coordx,coordy,coordz) {
    loadAssets.setCords(coordx+0,coordy+2,coordz+0)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.mesa_sola(scene)

    loadAssets.setCords(coordx+18.2,coordy+2,coordz+0)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.mesa_sola(scene)

    loadAssets.setCords(coordx+-18.2,coordy+2,coordz+0)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.mesa_sola(scene)

    loadAssets.setCords(coordx+-45.2,coordy+2,coordz+2)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.mesa_con_fin(scene)

    loadAssets.setCords(coordx+42.8,coordy+2,coordz-1)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.mesa_con_fin(scene) 
}
function loadProyector(coordx,coordy,coordz) {
    loadAssets.setCords(coordx+0,coordy+0,coordz+0)
    loadAssets.setResize(0.2,0.2,0.2)
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.proyector(scene)
}
function loadCoffes(){
    loadAssets.clearall()
    loadAssets.setResizeUnic(0.2)

    loadAssets.setCords(98,26,-12)
    loadAssets.Cafe(scene)

    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(90,22,-130)
    loadAssets.Cafe(scene)

    loadAssets.setCords(158,27,-139)
    loadAssets.Cafe(scene)
}
function loadCientificos(coordx,coordy,coordz) {
    loadAssets.clearall()
    loadAssets.setResizeUnic(0.9)
    loadAssets.setCords(coordx+-50,coordy+2,coordz+30)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*0.4,0)
    loadAssets.cientifico(scene,2)

    loadAssets.setCords(coordx+70,coordy+2,coordz+-40)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.40,0)
    loadAssets.cientifico(scene,4) 

    loadAssets.setCords(coordx+-20,coordy+2,coordz+-60)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.27,0)
    loadAssets.cientifico(scene,2)

    loadAssets.setCords(coordx+10,coordy+2,coordz+-80)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.40,0)
    loadAssets.cientifico(scene,2)

    loadAssets.setCords(coordx+10,coordy+2,coordz+90)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.cientifico(scene,6)

    loadAssets.setCords(98,0,90)
    //loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-1.0,0)
    loadAssets.cientifico(scene,7)

}
function loadCientificoSentado( coordx, coordy, coordz) {
    loadAssets.clearall()
    loadAssets.setResizeUnic(0.9)

    loadAssets.setCords(98,coordy+7,-139)
    //loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(0,Math.PI*-0.1,0)
    loadAssets.cientificoSentado(scene,2)

    loadAssets.setCords(132,coordy+7,-102)
    //loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(0,Math.PI*1.0,0)
    loadAssets.cientificoSentado(scene,2)    

    loadAssets.setCords(148,coordy+7,-102)
    //loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(Math.PI*0.05,Math.PI*1.1,0)
    loadAssets.cientificoSentado(scene,2)    

    //sillas
    loadAssets.setResize(0.4,0.43,0.4)

    loadAssets.setCords(coordx+0,coordy+2,coordz+0-45)
    //loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-0.1,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx+0+30,coordy+2,coordz+0+5)
    //loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*1.0,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx+0+50,coordy+2,coordz+0+5)
    //loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*1.1,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx+0+50,coordy+2,coordz+0+5)
    loadAssets.setRotation(0,Math.PI*1.1,0)
    loadAssets.silla_oficina(scene)

    

}
function loadPizarra(coordx,coordy,coordz) {
    loadAssets.setCords(coordx-95,coordy+12,coordz-19)
    loadAssets.setResize(0.7,0.7,0.7)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.PizarraDigital(scene)    
}
function createLight(coordx,coordy,coordz){

    //light 1
    light=new THREE.AmbientLight(0xffffff,1.0)
    scene.add(light)
    
    RectAreaLightUniformsLib.init()

    //light 2
    const width=55.0;
    const height=30.0;
    light2=new THREE.RectAreaLight(0xfcfbda ,0.5,width,height)
    light2.position.set(coordx+-91,coordy+30,coordz+-19)
    light2.lookAt(coordx+-100,coordy+30,coordz+-19)
    scene.add(light2)
    //scene.add(new RectAreaLightHelper(light2))

    //light 3
    const distancel3 = 10.0
    const anglel3= Math.PI *0.13
    const penumbral3=0.5
    const decayl3=0.5 
    light3=new THREE.SpotLight(
        0xfefdec,
        0.2,
        distancel3,
        anglel3,
        penumbral3,
        decayl3
    )
    light3.position.set(coordx+-40,coordy+30,coordz+-20)
    light3.target.position.set(coordx+-95,coordy+30,coordz+-20)

    scene.add(light3)
    scene.add(light3.target)
    
    //light 4
    light4 = new THREE.RectAreaLight(0xfcfbda,0.5,7,5)
    light4.position.set(coordx+-21,coordy+45.5,coordz+-24)
    light4.lookAt(coordx+100,coordy+45.5,coordz+-24)
    scene.add(light4)
    //scene.add(new RectAreaLightHelper(light4))
    
    //light 5 
    const distancel5 = 200.0
    const anglel5= Math.PI *0.34
    const penumbral5=1.0
    const decayl5=1.0 
    light5=new THREE.SpotLight(
        0xfefdec,
        0.9,
        distancel5,
        anglel5,
        penumbral5,
        decayl5
    )
    light5.position.set(10,40,-120)
    light5.target.position.set(300,0,-120)
    
    //light5.power=1
    light5.castShadow=true
    light5.shadow.mapSize.width=100
    light5.shadow.mapSize.height=100
    light5.shadow.camera.near=30
    light5.shadow.camera.far=200


    scene.add(light5)
    scene.add(light5.target)

    //light 6 7 8 
    //Luz amarilla suave: 0xfeffca
    light6=new THREE.RectAreaLight(0xffffff,0.7,400,400)
    light6.position.set(0,80,0)
    light6.lookAt(0,0,0)
    scene.add(light6)
    scene.add(new RectAreaLightHelper(light6))

    // light7=new THREE.RectAreaLight(0xfeffca,0.5,26,36)
    // light7.position.set(42*2,45,-30)
    // light7.lookAt(42*2,45,-50)
    // scene.add(light7)
    // //scene.add(new RectAreaLightHelper(light7))

    // light8=new THREE.RectAreaLight(0xfeffca,0.5,26,36)
    // light8.position.set(42*3,45,-30)
    // light8.lookAt(42*3,45,-50)
    // scene.add(light8)
    // //scene.add(new RectAreaLightHelper(light8))



    //lightHelper=new THREE.PointLightHelper(light6)
    //scene.add(lightHelper)
    lightHelper=new THREE.SpotLightHelper(light5)
    // lightHelper=new THREE.SpotLightHelper(light3)
    scene.add(lightHelper) 
    
    //camerShadowHelper=new THREE.CameraHelper(light5.shadow.camera)
    //scene.add(camerShadowHelper)
}
function skybox_Background() {
    const __dirSkyBox='/assets/img/'
    skyboxName='bluecloud_'
    let materialArray=[]
    let tex_ft=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'ft.jpg')
    let tex_bk=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'bk.jpg')
    let tex_up=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'up.jpg')
    let tex_dn=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'dn.jpg')
    let tex_rt=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'rt.jpg')
    let tex_lf=new THREE.TextureLoader().load(__dirSkyBox+skyboxName+'lf.jpg')

    materialArray.push(new THREE.MeshBasicMaterial({map: tex_ft}))
    materialArray.push(new THREE.MeshBasicMaterial({map: tex_bk}))
    materialArray.push(new THREE.MeshBasicMaterial({map: tex_up}))
    materialArray.push(new THREE.MeshBasicMaterial({map: tex_dn}))
    materialArray.push(new THREE.MeshBasicMaterial({map: tex_rt}))
    materialArray.push(new THREE.MeshBasicMaterial({map: tex_lf}))

    for(let i=0;i<6;i++){
        materialArray[i].side=THREE.BackSide
    }
    let skyboxGeo = new THREE.BoxGeometry(1500,1500,1500)
    //let skyboxGeo = new THREE.SphereGeometry(10,32,16)
    skybox= new THREE.Mesh(skyboxGeo,materialArray)
    //skybox.material.side=THREE.BackSide
    skybox.position.set(0,50,0)
    scene.add(skybox)


    /*const loader= new THREE.CubeTextureLoader()
    loader.setPath('/assets/img/')
    const textureCube=loader.load([
        'cocoa_ft.jpg', 'cocoa_bk.jpg',
        'cocoa_up.jpg', 'cocoa_dn.jpg',
        'cocoa_rt.jpg', 'cocoa_lf.jpg'
    ])

    const material = new THREE.MeshBasicMaterial({color: 0xffffff, envMap: textureCube})
    var skyboxGeo = new THREE.BoxGeometry(1000,1000,1000)
    skybox= new THREE.Mesh(skyboxGeo,material)
    skybox.material.side=THREE.BackSide
    //skybox.geometry.rotateY(Math.PI*1.0)
    //skybox.material.depthTest=false
    //skybox.material.depthWrite=false
    scene.add(skybox)*/
}
function animate(){
    requestAnimationFrame(animate)
    //update()
    stats.update()
    lightHelper.update()
    //camerShadowHelper.update()
    renderer.render(scene, camera)
}

function enableOrbitControls(){
    orbitcontrols = new OrbitControls(camera,renderer.domElement) 
    orbitcontrols.maxPolarAngle=Math.PI*0.45
    orbitcontrols.maxDistance=500
    //orbitcontrols.enablePan=false
}
function enableDragControls() {
    drangControls=new DragControls(loadAssets.objects,camera,renderer.domElement)
}
function addGui() {
    const videoFolder = gui.addFolder("Video")
    videoFolder.add(vidparams,"Play")
    videoFolder.add(vidparams,"Pause")
    videoFolder.add(vidparams,"Stop")
    videoFolder.add(vidparams,"Replay")
    videoFolder.open()
}
function canvasResize(){
    camera.aspect = window.innerWidth / window.innerHeight 
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight) 
    renderer.render(scene, camera)
}
function playvideo() {
    video.play()
    status=true
}
function stopvideo() {
    video.pause()
    status=false
    video.currentTime=1.1
}
function pausevideo() {
    video.pause()
    status=false
}
function replayvideo() {
    video.pause()
    video.currentTime=1.1
    video.play()
    status=true
}
function update(){
    if(keyboard.pressed("space")){
        if(status==true){
            video.pause()
            status=false
        }else{
            video.play()
            status=true
        }
    }
    if(keyboard.pressed("s")){
        video.pause()
        video.currentTime=1.1
        status=false
    }   
        
}