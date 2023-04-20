import React, { useRef, useEffect } from 'react';
import \* as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeCanvas = ({ modelPath }) => {
const canvasRef = useRef(null);

useEffect(() => {
const canvas = canvasRef.current;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
canvas.clientWidth / canvas.clientHeight,
0.1,
1000
);
const renderer = new THREE.WebGLRenderer({ canvas });

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        scene.add(gltf.scene);
        camera.position.z = 5;
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the 3D model:', error);
      }
    );

    return () => {
      renderer.dispose();
    };

}, [modelPath]);

return <canvas ref={canvasRef} width="300" height="200" />;
};

export default ThreeCanvas;
