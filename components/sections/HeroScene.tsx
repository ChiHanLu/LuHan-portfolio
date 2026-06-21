"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

// Ashima 3D simplex noise（公用，用於頂點位移做有機變形）
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
${SNOISE}
void main(){
  vec3 p=position;
  float n=snoise(p*1.05+vec3(0.0,0.0,uTime*0.25));
  float n2=snoise(p*2.3+vec3(uTime*0.18));
  float disp=(n*0.30+n2*0.12)*uAmp;
  vDisp=disp;
  vec3 dp=p+normal*disp;
  vNormal=normalMatrix*normal;
  vec4 mv=modelViewMatrix*vec4(dp,1.0);
  vView=-mv.xyz;
  gl_Position=projectionMatrix*mv;
}`;

const FRAG = `
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNormal;
varying vec3 vView;
varying float vDisp;
void main(){
  vec3 N=normalize(vNormal);
  vec3 V=normalize(vView);
  float fres=pow(1.0-clamp(dot(N,V),0.0,1.0),2.4);
  vec3 col=mix(uColorA,uColorB,clamp(vDisp*1.6+0.5,0.0,1.0));
  col+=fres*vec3(0.55,0.40,1.0)*1.15;    // 邊緣輝光（供 bloom 擷取）
  gl_FragColor=vec4(col,1.0);
}`;

/**
 * Hero 3D 主視覺：noise 位移的有機變形球體（blob）＋發光星點＋UnrealBloom 泛光。
 * 滑鼠視差、緩慢變形自轉；DPR 上限、離開視窗暫停、手機降級、reduced-motion 靜態、卸載 dispose。
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 640;

    let w = mount.clientWidth || window.innerWidth;
    let h = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: !lowEnd, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    // 變形球體
    const geo = new THREE.SphereGeometry(1.05, lowEnd ? 64 : 110, lowEnd ? 64 : 110);
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.7 },
      uColorA: { value: new THREE.Color("#3b1f7a") },
      uColorB: { value: new THREE.Color("#a78bfa") },
    };
    const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    const blob = new THREE.Mesh(geo, mat);
    blob.position.x = w < 768 ? 0 : 1.7;
    scene.add(blob);

    // 發光星點
    const count = reduce ? 0 : lowEnd ? 200 : 480;
    let points: THREE.Points | null = null;
    if (count > 0) {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 6;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
        pos[i * 3 + 2] = r * Math.cos(ph) - 2;
      }
      const pgeo = new THREE.BufferGeometry();
      pgeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pmat = new THREE.PointsMaterial({
        color: new THREE.Color("#c4b5fd"),
        size: 0.05,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      points = new THREE.Points(pgeo, pmat);
      scene.add(points);
    }

    // 後製：UnrealBloom 泛光
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, lowEnd ? 1.5 : 2));
    composer.setSize(w, h);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), lowEnd ? 0.45 : 0.6, 0.5, 0.25);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // 滑鼠視差
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      blob.rotation.y += 0.0016 + px * 0.0006;
      blob.rotation.x = -py * 0.25;
      if (points) points.rotation.y = clock.getElapsedTime() * 0.04;
      camera.position.x += (px * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-py * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      composer.render();
    };
    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) render();
    else loop();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting && !raf) loop();
        else if (!entry.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const onResize = () => {
      w = mount.clientWidth || window.innerWidth;
      h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
      blob.position.x = w < 768 ? 0 : 1.7;
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      geo.dispose();
      mat.dispose();
      if (points) {
        points.geometry.dispose();
        (points.material as THREE.Material).dispose();
      }
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
