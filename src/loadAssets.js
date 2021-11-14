import { GLTFLoader } from "../modules/GLTFLoader.js"
import * as THREE from "../modules/three.module.js"

//dir models 
let __dirModels='/assets/models/'

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

function cargar(ruta, scene, px,py,pz,prx,pry,prz,psx,psy,psz,shadow){
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
export function cientifico(scene) {
    cargar(__dirModels+'cientifico2.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function cientificoSentado(scene) {
    cargar(__dirModels+'cientificoSentado2.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
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
    cargar(__dirModels+'CuboDeCompañia.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function PlantaModel1(scene) {
    cargar(__dirModels+'PlantaModel1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function Cake(scene) {
    cargar(__dirModels+'Cake.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
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
export function EscritorioOficina1(scene) {
    cargar(__dirModels+'EscritorioOficina1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function OficeComplete(scene) {
    cargar(__dirModels+'OficeComplete.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}
export function SillaOficina1(scene) {
    cargar(__dirModels+'SillaOficina1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz,shadow)
}