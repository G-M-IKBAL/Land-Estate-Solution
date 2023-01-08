import * as THREE from 'three';
import React, { useState, useEffect } from 'react'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import ModelFile from '../scene.gltf';  // replace with your 3D model file

class Model3D extends React.Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    // create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // set up the renderer
    renderer.setSize(width, height);
    renderer.setClearColor('#000000');
    this.mount.appendChild(renderer.domElement);

    // create a new GLTFLoader
    const loader = new GLTFLoader();

    // load the 3D model file
    loader.load(
      ModelFile,
      (gltf) => {
        scene.add(gltf.scene);  // add the parsed model to the scene
        renderer.render(scene, camera);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      (error) => {
        console.log('An error happened', error);
      }
    );
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(ref) => (this.mount = ref)}
      />
    );
  }
}

export default Model3D
