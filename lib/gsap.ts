"use client";
// 集中註冊 GSAP 外掛，全站共用同一份 instance
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// GSAP 3.13+ 起所有外掛免費內含；DrawSVG 畫線、MotionPath 沿路徑移動
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, useGSAP);

export { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, useGSAP };
