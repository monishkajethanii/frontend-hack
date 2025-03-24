"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Menu, X } from "lucide-react";

const ArchitectureModelBuilder = () => {
  const [modelParams, setModelParams] = useState({
    width: 3,
    height: 2.5,
    depth: 4,
    roofHeight: 1.5,
    roofColor: "#B35F3F",
    wallColor: "#F5F5F5",
    windowColor: "#87CEEB",
    windowOpacity: 0.7,
    backgroundSky: "#E6F2FF",
  });

  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);

  const createArchitecturalModel = useCallback(
    (scene) => {
      // Clear existing meshes
      const meshesToRemove = scene.children.filter(
        (child) => child instanceof THREE.Mesh
      );
      meshesToRemove.forEach((mesh) => scene.remove(mesh));

      try {
        // Ground Plane
        const groundGeometry = new THREE.PlaneGeometry(10, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({
          color: "#E0F0E3",
          side: THREE.DoubleSide,
        });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.rotation.x = Math.PI / 2;
        groundMesh.position.y = -1;
        scene.add(groundMesh);

        // House Geometry with Rounded Corners
        const houseShape = new THREE.Shape();
        const cornerRadius = 0.2;
        const width = modelParams.width;
        const depth = modelParams.depth;

        houseShape.moveTo(cornerRadius, 0);
        houseShape.lineTo(width - cornerRadius, 0);
        houseShape.quadraticCurveTo(width, 0, width, cornerRadius);
        houseShape.lineTo(width, depth - cornerRadius);
        houseShape.quadraticCurveTo(width, depth, width - cornerRadius, depth);
        houseShape.lineTo(cornerRadius, depth);
        houseShape.quadraticCurveTo(0, depth, 0, depth - cornerRadius);
        houseShape.lineTo(0, cornerRadius);
        houseShape.quadraticCurveTo(0, 0, cornerRadius, 0);

        const extrudeSettings = {
          steps: 1,
          depth: modelParams.height,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelSegments: 3,
        };

        const houseGeometry = new THREE.ExtrudeGeometry(
          houseShape,
          extrudeSettings
        );
        const houseMaterial = new THREE.MeshStandardMaterial({
          color: modelParams.wallColor,
          transparent: true,
          opacity: 0.9,
        });
        const houseMesh = new THREE.Mesh(houseGeometry, houseMaterial);
        houseMesh.position.set(-width / 2, -1, -depth / 2);
        scene.add(houseMesh);

        // Roof with Smoother Shape
        const roofGeometry = new THREE.ConeGeometry(
          Math.sqrt(
            Math.pow(modelParams.width * 1.2, 2) +
              Math.pow(modelParams.depth * 1.2, 2)
          ) / 2,
          modelParams.roofHeight,
          4
        );
        const roofMaterial = new THREE.MeshStandardMaterial({
          color: modelParams.roofColor,
          roughness: 0.4,
          metalness: 0.2,
        });
        const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
        roofMesh.position.y = modelParams.height + 0.5;
        roofMesh.rotation.y = Math.PI / 4;
        scene.add(roofMesh);

        // Stylish Windows
        const windowGeometry = new THREE.PlaneGeometry(1, 1);
        const windowMaterial = new THREE.MeshStandardMaterial({
          color: modelParams.windowColor,
          transparent: true,
          opacity: modelParams.windowOpacity,
        });

        // Front Windows with Frame
        const createWindowWithFrame = (x, z) => {
          const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
          windowMesh.position.set(x, 0.5, z);

          const frameGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.1);
          const frameMaterial = new THREE.MeshStandardMaterial({
            color: "#4A4A4A",
            roughness: 0.7,
          });
          const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
          frameMesh.position.set(x, 0.5, z - 0.06);

          scene.add(windowMesh);
          scene.add(frameMesh);
        };

        createWindowWithFrame(-width / 2 + 0.6, depth / 2 + 0.01);
        createWindowWithFrame(width / 2 - 0.6, depth / 2 + 0.01);
      } catch (error) {
        console.error("Error creating architectural model:", error);
      }
    },
    [modelParams]
  );

  useEffect(() => {
    if (!mountRef.current || rendererRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(modelParams.backgroundSky);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const softLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    scene.add(softLight);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    createArchitecturalModel(scene);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", handleResize);
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (mountRef.current && rendererRef.current) {
        try {
          mountRef.current.removeChild(rendererRef.current.domElement);
        } catch (error) {
          console.warn("Error during renderer cleanup:", error);
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(modelParams.backgroundSky);
      createArchitecturalModel(sceneRef.current);

      if (rendererRef.current && cameraRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
  }, [modelParams, createArchitecturalModel]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/section" },
    { name: "Services", href: "/services" },
    { name: "Contact Now", href: "/contact" },
  ];

  return (
    <>
      {/* nav bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-sm shadow-md py-2"
            : "bg-white/90 py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 z-50">
            <img
              src="/logo.png"
              width={isScrolled ? 50 : 60}
              height={isScrolled ? 50 : 60}
              alt="BuiltWell Logo"
              className="transition-all duration-300"
            />
            <span
              className={`text-xl sm:text-2xl font-serif font-bold transition-colors duration-300 text-gray-400 ${
                isScrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              BuiltWell
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`hover:text-builtwell-accent transition-colors duration-300 text-base lg:text-lg font-medium ${
                  isScrolled ? "text-gray-800" : "text-gray-800"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X
                size={24}
                className={isScrolled ? "text-builtwell-dark" : "text-black"}
              />
            ) : (
              <Menu
                size={24}
                className={isScrolled ? "text-builtwell-dark" : "text-black"}
              />
            )}
          </button>
        </div>

        {/* mobile navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-center items-end pr-2 space-y-6 pt-16 text-black">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-builtwell-darkgray hover:text-builtwell-accent transition-colors duration-300 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </header>
      <div className="w-full h-screen flex bg-gradient-to-br from-blue-50 to-gray-100 mt-22">
        <div ref={mountRef} className="w-3/4 h-full relative"></div>
        <div className="w-1/4 p-6 bg-white/70 backdrop-blur-sm overflow-y-auto shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Model Parameters
          </h2>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Width: {modelParams.width.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={modelParams.width}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  width: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Height: {modelParams.height.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              step="0.5"
              value={modelParams.height}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  height: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Depth: {modelParams.depth.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="6"
              step="0.5"
              value={modelParams.depth}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  depth: parseFloat(e.target.value),
                }))
              }
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Wall Color
            </label>
            <input
              type="color"
              value={modelParams.wallColor}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  wallColor: e.target.value,
                }))
              }
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Roof Color
            </label>
            <input
              type="color"
              value={modelParams.roofColor}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  roofColor: e.target.value,
                }))
              }
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">
              Sky Color
            </label>
            <input
              type="color"
              value={modelParams.backgroundSky}
              onChange={(e) =>
                setModelParams((prev) => ({
                  ...prev,
                  backgroundSky: e.target.value,
                }))
              }
              className="w-full h-12 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchitectureModelBuilder;
