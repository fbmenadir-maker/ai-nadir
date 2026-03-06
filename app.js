let scene, camera, renderer, controls, mesh;

const container = document.getElementById("camera-container");
const anglesDisplay = document.getElementById("anglesDisplay");

init();
animate();

function init() {
  scene = new THREE.Scene();

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  // ضوء
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // تحكم الكاميرا
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false;

  // شبكة أرضية بسيطة (اختياري)
  // const grid = new THREE.GridHelper(10, 10);
  // scene.add(grid);

  // رفع الصورة
  const imageInput = document.getElementById("imageInput");
  imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (mesh) {
      scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }

    const texture = new THREE.TextureLoader().load(url);
    const geometry = new THREE.PlaneGeometry(4, 4);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  if (mesh) {
    const euler = new THREE.Euler().setFromQuaternion(camera.quaternion);
    const yaw = THREE.MathUtils.radToDeg(euler.y);
    const pitch = THREE.MathUtils.radToDeg(euler.x);
    const roll = THREE.MathUtils.radToDeg(euler.z);

    anglesDisplay.textContent = `Current Angles: Yaw ${yaw.toFixed(1)}, Pitch ${pitch.toFixed(1)}, Roll ${roll.toFixed(1)}`;
  }
}
