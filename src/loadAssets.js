import { GLTFLoader } from "../modules/GLTFLoader.js"
import * as THREE from "../modules/three.module.js"

//dir models 
let __dirModels='/assets/models/'

//sounds
let sound 
const __dirSong='/assets/sounds/'

//Coords
let x=0,y=0,z=0 

//rotation 
let rx=0,ry=0,rz=0

//Re-size 
let sx=1.0,sy=1.0,sz=1.0

//loader
//let loader

//Shadow
let shadow=true

//Objetos
export let objects=[]

//manager 
const manager=new THREE.LoadingManager()
manager.onStart = function (url,itemsLoaded,itemsTotal) {
    console.log('Started loading file: '+url+ '.nLoaded ' +itemsLoaded + ' of '+ itemsTotal + ' files.')
}
manager.onLoad = function ( ) {
	console.log( 'Loading complete!')
}
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
    if(itemsLoaded%2==0){
        clearall()
    }
}
manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url )
}

export function clearall() {
    x=0
    y=0
    z=0
    rx=0
    ry=0
    rz=0
    sx=1.0
    sy=1.0
    sz=1.0
}

export function setCords(px,py,pz){
    x=px
    y=py
    z=pz
}
export function setRotation(prx,pry,prz){
    rx=prx
    ry=pry
    rz=prz
}
export function setResize(psx,psy,psz){
    sx=psx
    sy=psy
    sz=psz
}
export function setResizeUnic(psr) {
    sx=psr
    sy=psr
    sz=psr
}
function loadSound(song,listener,lisentDistance){
    sound=new THREE.PositionalAudio(listener)
    const audioLoader=new THREE.AudioLoader()
    audioLoader.load(__dirSong+song,function(buffer){
        sound.setBuffer(buffer)
        sound.setRefDistance(lisentDistance);
        sound.setLoop(true)
        sound.play()
    })
}
function cargar(ruta, scene, px,py,pz,prx,pry,prz,psx,psy,psz,shadow,sound=undefined){
    const loader = new GLTFLoader(manager)
    loader.load(ruta, (gltf)=>{
        gltf.scene.traverse(function (child) {
            if(child.isMesh){
                if(shadow==true){
                    child.castShadow=true
                }
                child.receiveShadow=true
                child.geometry.computeVertexNormals()
                console.log("Se aplico shadows")
            }
        })
        const box=new THREE.Box3().setFromObject(gltf.scene)
        const center=box.getCenter(new THREE.Vector3())
        gltf.scene.position.x += (gltf.scene.position.x-center.x)
        gltf.scene.position.y += (gltf.scene.position.y-center.y)
        gltf.scene.position.z += (gltf.scene.position.z-center.z)

        gltf.scene.position.set(px,py,pz)
        gltf.scene.rotation.set(prx,pry,prz)
        gltf.scene.scale.set(psx,psy,psz)
        if(sound!=undefined){
            gltf.scene.add(sound)
        }
        scene.add(gltf.scene)
        objects.push(gltf.scene)
    },undefined,function (e) {
        console.error(e)
    })
}


export function paredes(scene){
    shadow=false
    cargar(__dirModels+'CentraBlock.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function piso(scene){
    shadow=false
    cargar(__dirModels+'Piso.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function silla_oficina(scene){
    cargar(__dirModels+'silla_oficina.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function mesa_sola(scene) {
    cargar(__dirModels+'MesaSola.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function mesa_con_fin(scene) {
    cargar(__dirModels+'MesaconFin.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function proyector(scene) {
    cargar(__dirModels+'proyector.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function cientifico(scene,num) {
    cargar(__dirModels+'cientifico'+num+'.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function cientificoSentado(scene,num) {
    cargar(__dirModels+'cientificoSentado'+num+'.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function PizarraDigital(scene) {
    cargar(__dirModels+'PizarraDigital.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function ParedSimple(scene) {
    shadow=false
    cargar(__dirModels+'ParedSimple.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function ParedPuertaDoble(scene) {
    shadow=false
    cargar(__dirModels+'ParedPuertaDoble.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function ParedRecortada(scene) {
    shadow=false
    cargar(__dirModels+'ParedRecortada.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function ParedPuertaSimple(scene) {
    shadow=false
    cargar(__dirModels+'ParedPuertaSimple.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function PuertaModel1(scene) {
    cargar(__dirModels+'PuertaModel1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function ParedConVentanaYPuerta(scene) {
    shadow=false
    cargar(__dirModels+'ParedConVentanaYPuerta.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function TorretaPortal(scene) {
    cargar(__dirModels+'TorretaPortal.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function CuboDeCompania(scene) {
    cargar(__dirModels+'CuboDeCompa??ia.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Planta(scene,num) {
    cargar(__dirModels+'Planta'+num+'.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Cake(scene) {
    cargar(__dirModels+'cake.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Vela(scene) {
    cargar(__dirModels+'Vela.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Laptop(scene) {
    cargar(__dirModels+'Laptop.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Marco(scene) {
    cargar(__dirModels+'Marco.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function OficeComplete(scene) {
    cargar(__dirModels+'OficeComplete.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function SillaOficina1(scene) {
    cargar(__dirModels+'SillaOficina1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function EscritorioOficina(scene,num) {
    cargar(__dirModels+'EscritorioOficina'+num+'.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Wheatley(scene) {
    cargar(__dirModels+'Wheatley.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Pera(scene) {
    cargar(__dirModels+'Pera.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Cafe(scene) {
    cargar(__dirModels+'Cafe.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Laboratorio(scene,num) {
    cargar(__dirModels+'Laboratorio'+num+'.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Elevador(scene) {
    cargar(__dirModels+'Elevador.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Closet(scene) {
    cargar(__dirModels+'Closet.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Shower(scene) {
    cargar(__dirModels+'Shower.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function SillaOficina2(scene) {
    cargar(__dirModels+'SillaOficina2.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function GladosPotato(scene) {
    cargar(__dirModels+'GladosPotato.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function PortalGun(scene) {
    cargar(__dirModels+'PortalGun.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function TV(scene) {
    cargar(__dirModels+'Televisor.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Mandala(scene) {
    cargar(__dirModels+'Mandala.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function ModuloLunar(scene) {
    shadow=false
    cargar(__dirModels+'ModuloLunar.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
    shadow=true
}
export function Bitcoin(scene) {
    cargar(__dirModels+'Bitcoin.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function RadioPortal(scene,sound) {
    cargar(__dirModels+'RadioPortal.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow,sound)
}
export function Cohete(scene) {
    cargar(__dirModels+'Cohete.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function BlocNote(scene) {
    cargar(__dirModels+'BlocNote.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Calculadora(scene) {
    cargar(__dirModels+'Calculadora.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}