import * as THREE from "../modules/three.module.js"
import { OrbitControls } from "../controls/OrbitControls.js"
import * as loadAssets from "./loadAssets.js"
import { DragControls } from "../controls/DragControls.js" 
import { GUI } from "../modules/dat.gui.module.js"
import Stats from "../modules/stats.module.js"

//Graphics variables 
let container
let camera
let backgroundTexture
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
let light5 //directional light

//Some objets
let object

//video objects
let video
let vidTex
let status 

//Stats
let stats


init()
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c)

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        5.0,
        3000
    )
    camera.position.z = 150
    camera.position.y = 100

    renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    renderer.shadowMap.enable=true
    renderer.shadowMap.type=THREE.PCFShadowMap

    window.addEventListener('resize', canvasResize)
    window.addEventListener('click',onclick)
    
    keyboard = new THREEx.KeyboardState() 
    status=false
    
    stats=Stats()
    document.body.appendChild(stats.dom)

    enableSeleccion=false
    
    raycaster=new THREE.Raycaster()
    
    gui=new GUI()
    //addGui()
    
    

    enableOrbitControls()
    
    skybox_Background()
    display()
}

function display() {
    

    //PAREDES
    loadParedes(0,2,0)
    

    //PISO
    loadPiso(0,0,0)

    //SILLAS 
    loadSillas(15,0,-20)

    //MESA
    loadMesa(15,0,-20)

    //PROYECTOR
    loadProyector(-10,40,-20)

    //CIENTIFICOS
    loadCientificos(0,0,0)
    loadCientificoSentado(0,0,0)

    //PIZARRA & VIDEO
    loadPizarra(0,0,0)
    loadVideo(-93,30,-19.5,3.2)

    //LUCES
    createLight() 
    
    //LOOP DE RENDERIZADO

    //controles para mover objetos (Deshabilitar Orbit Controls )
    //enableDragControls()

    animate()
}
function loadParedes(coordx,coordy,coordz) {
    loadAssets.clearall()
    loadAssets.setResize(1,1.2,1)

    //puertas
    loadAssets.setCords(coordx+72,coordy+0,coordz+53)
    loadAssets.PuertaModel1(scene) 

    loadAssets.setRotation(0,Math.PI*-0.55,0)
    loadAssets.setCords(coordx-93,coordy+0,coordz+138)
    loadAssets.PuertaModel1(scene)

    loadAssets.setRotation(0,Math.PI*0.55,0)
    loadAssets.setCords(coordx-112.5,coordy+0,coordz+69.5)
    loadAssets.PuertaModel1(scene)


    //paredes
    loadAssets.setRotation(0,Math.PI*-0.5,0)
    loadAssets.setCords(coordx+2,coordy+0,coordz+75)
    loadAssets.ParedPuertaSimple(scene) 

    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-90+4,coordy+0,coordz+102)
    loadAssets.ParedPuertaDoble(scene) 

    loadAssets.setResize(1.0,1.2,0.89)
    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-89+4,coordy+0,coordz+-14.5)
    loadAssets.ParedSimple(scene) 

    loadAssets.setResize(1.0,1.2,0.51)
    loadAssets.setRotation(0,Math.PI*0.0,0)
    loadAssets.setCords(coordx+-89+4,coordy+0,coordz+249)
    loadAssets.ParedSimple(scene) 


}
function loadPiso(coordx,coordy,coordz) {
    loadAssets.clearall()

    loadAssets.setCords(coordx,coordy,coordz)
    loadAssets.piso(scene)

    //loadAssets.setRotation(0,Math.PI*1.0,0)
    loadAssets.setCords(coordx+-200,coordy+0,coordz+0)
    loadAssets.piso(scene)

    //loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(coordx+-200,coordy+0,coordz+200)
    loadAssets.piso(scene)

    //loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.setCords(coordx+0,coordy+0,coordz+200)
    loadAssets.piso(scene)
}
function loadVideo(coordx,coordy,coordz,psize) {
    video=document.getElementById('VideoPresentation')

    vidTex = new THREE.VideoTexture(video)
    vidTex.minFilter= THREE.LinearFilter
    vidTex.magFilter= THREE.LinearFilter

    var movieMaterial = new THREE.MeshBasicMaterial({map:vidTex})
    var plano=new THREE.PlaneGeometry(16*psize,9*psize,4,4)
    var movieScreen=new THREE.Mesh(plano,movieMaterial)
    movieScreen.position.set(coordx,coordy,coordz)
    movieScreen.rotateY(Math.PI*0.5)
    scene.add(movieScreen)

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
function loadCientificos(coordx,coordy,coordz) {
    loadAssets.clearall()

    loadAssets.setCords(coordx+-50,coordy+2,coordz+30)
    loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*0.4,0)
    loadAssets.cientifico(scene)

    loadAssets.setCords(coordx+70,coordy+2,coordz+-40)
    loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.40,0)
    loadAssets.cientifico(scene) 

    loadAssets.setCords(coordx+-20,coordy+2,coordz+-60)
    loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.27,0)
    loadAssets.cientifico(scene)

    loadAssets.setCords(coordx+10,coordy+2,coordz+-80)
    loadAssets.setResize(0.4,0.45,0.4)
    loadAssets.setRotation(0,Math.PI*-0.40,0)
    loadAssets.cientifico(scene)

    
}
function loadCientificoSentado( coordx, coordy, coordz) {
    loadAssets.clearall()

    loadAssets.setCords(coordx+0,coordy+2,coordz+0-45)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*-0.1,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx+4.5,coordy+15,coordz+4-45)
    loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(0,Math.PI*0.9,0)
    loadAssets.cientificoSentado(scene)

    loadAssets.setCords(coordx+0+30,coordy+2,coordz+0+5)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*1.0,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx-4.5+30,coordy+15,coordz-2+5)
    loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(0,0,0)
    loadAssets.cientificoSentado(scene)    

    loadAssets.setCords(coordx+0+50,coordy+2,coordz+0+5)
    loadAssets.setResize(0.4,0.43,0.4)
    loadAssets.setRotation(0,Math.PI*1.1,0)
    loadAssets.silla_oficina(scene)

    loadAssets.setCords(coordx-4.5+50,coordy+15,coordz-2+5)
    loadAssets.setResize(0.4,0.35,0.3)
    loadAssets.setRotation(Math.PI*0.05,Math.PI*0.1,0)
    loadAssets.cientificoSentado(scene)    
}
function loadPizarra(coordx,coordy,coordz) {
    loadAssets.setCords(coordx-95,coordy+12,coordz-19)
    loadAssets.setResize(0.7,0.7,0.7)
    loadAssets.setRotation(0,Math.PI*0.5,0)
    loadAssets.PizarraDigital(scene)    
}
function createLight(){
    light=new THREE.AmbientLight(0xffffff,1.5)
    scene.add(light)

    const width=55.0;
    const height=30.0;
    light2=new THREE.RectAreaLight(0xfcfbda ,0.5,width,height)
    light2.position.set(-90,30,-19)
    light2.lookAt(-1000,20,0)
    scene.add(light2)

    const distance = 100.0
    const angle= Math.PI *0.1
    const penumbra=1.5
    const decay=0.5 
    light3=new THREE.SpotLight(
        0xfefdec , 
        0.2,
        distance,
        angle,
        penumbra,
        decay
    )
    light3.position.set(-10,40,-26)
    light3.target.position.set(-95,30,-19)

    
    scene.add(light3)
    scene.add(light3.target)

    light4 = new THREE.RectAreaLight(0xfcfbda,2.0,7,5)
    light4.position.set(-21,45,-27)
    light4.lookAt(1000,30,-19)
    scene.add(light4)

    light5=new THREE.DirectionalLight(0Xffffff,0.3)
    light5.position.set(100,100,-100)
    light5.castShadow=true
    scene.add(light5)
    
    light5.castShadow=true
    light5.shadow.camera.near=1000
    light5.shadow.camera.far=4000
    light5.shadow.mapSize.width=1024
    light5.shadow.mapSize.height=1024

    
}
function skybox_Background() {
    const __dirSkyBox='/assets/img/'
    skyboxName='sleepyhollow_'
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
    update()
    stats.update()
    renderer.render(scene, camera)
}

function enableOrbitControls(){
    orbitcontrols = new OrbitControls(camera,renderer.domElement) 
    orbitcontrols.maxPolarAngle=Math.PI*0.45
    orbitcontrols.maxDistance=500
    orbitcontrols.enablePan=false
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
    video.currentTime=0
}
function pausevideo() {
    video.pause()
    status=false
}
function replayvideo() {
    video.pause()
    video.currentTime=0
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
        video.currentTime=0
        status=false
    }   
        
}