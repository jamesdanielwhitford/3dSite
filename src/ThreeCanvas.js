import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

    renderer.setClearColor(0xcfcfcf); // Set the background color of the canvas

    const loader = new STLLoader();
    loader.load(
      modelPath,
      (geometry) => {
        geometry.computeBoundingBox();
        const boundingBox = geometry.boundingBox;
        const modelCenter = boundingBox.getCenter(new THREE.Vector3()).clone();
        const modelSize = boundingBox.getSize(new THREE.Vector3()).length();

        const material = new THREE.MeshPhongMaterial({ color: 0xcd7f32 });
        const mesh = new THREE.Mesh(geometry, material);

        scene.add(mesh);

        const ambientLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 2);
        pointLight.position.set(50, 50, 50);
        scene.add(pointLight);

        camera.position.copy(modelCenter);
        camera.position.z = modelCenter.z + modelSize * 1.2;
        camera.lookAt(modelCenter);

        const controls = new OrbitControls(camera, canvas);
        controls.target.copy(modelCenter);
        controls.enableZoom = true;

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
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

  return <canvas ref={canvasRef} width="300" height="400" />; // Change the height of the canvas
};

export default ThreeCanvas;
