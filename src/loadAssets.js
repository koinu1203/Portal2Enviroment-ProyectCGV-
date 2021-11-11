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

function cargar(ruta, scene, px,py,pz,prx,pry,prz,psx,psy,psz){
    const loader = new GLTFLoader(manager)
    loader.load(ruta, (gltf)=>{
        gltf.scene.traverse(function (child) {
            if(child.isMesh){
                child.castShadow=true
                child.reciveShadow=true
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
    cargar(__dirModels+'CentraBlock.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function piso(scene){
    cargar(__dirModels+'Piso.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function silla_oficina(scene){
    cargar(__dirModels+'silla_oficina.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function mesa_sola(scene) {
    cargar(__dirModels+'MesaSola.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function mesa_con_fin(scene) {
    cargar(__dirModels+'MesaconFin.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function proyector(scene) {
    cargar(__dirModels+'Proyector.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function cientifico(scene) {
    cargar(__dirModels+'cientifico.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function cientificoSentado(scene) {
    cargar(__dirModels+'cientificoSentado.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function PizarraDigital(scene) {
    cargar(__dirModels+'PizarraDigital.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function ParedSimple(scene) {
    cargar(__dirModels+'ParedSimple.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function ParedPuertaDoble(scene) {
    cargar(__dirModels+'ParedPuertaDoble.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function ParedRecortada(scene) {
    cargar(__dirModels+'ParedRecortada.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function ParedPuertaSimple(scene) {
    cargar(__dirModels+'ParedPuertaSimple.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function PuertaModel1(scene) {
    cargar(__dirModels+'PuertaModel1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function ParedConVentanaYPuerta(scene) {
    cargar(__dirModels+'ParedConVentanaYPuerta.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function TorretaPortal(scene) {
    cargar(__dirModels+'TorretaPortal.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function CuboDeCompania(scene) {
    cargar(__dirModels+'CuboDeCompañia.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}
export function PlantaModel1(scene) {
    cargar(__dirModels+'PlantaModel1.glb',scene,x,y,z,rx,ry,rz,sx,sy,sz)
}