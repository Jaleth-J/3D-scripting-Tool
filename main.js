
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let lastCreatedObject = null;
const sceneObjects = {};
const cameraObjects = {};
let labelGroup = new THREE.Group();
let gridHelper = null;

function init3D() {
  scene = new THREE.Scene();
  scene.add(labelGroup);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d'), antialias: true });
  renderer.setSize(window.innerWidth, 500);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enabled = false;

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  updateLabels();
  renderer.render(scene, camera);
}
function createMesh(type, size) {
  let geometry, material, mesh;

  switch(type) {
    case 'CUBE':
      geometry = new THREE.BoxGeometry(...size);
      break;
    case 'SPHERE':
      geometry = new THREE.SphereGeometry(size[0] / 2, 32, 32);
      break;
      case 'PLANE':
        
        geometry = new THREE.PlaneGeometry(size[0], size[1]);
        geometry.rotateX(-Math.PI / 2); 
        break;
    case 'TUBE':
      geometry = new THREE.CylinderGeometry(size[0], size[1], size[2], 16);
      break;
    default:
      console.warn("Unbekannter Typ:", type);
      return;
  }

  material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return mesh;
}
function createTree() {
  const group = new THREE.Group();

  // Stamm
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 8, 16),
    new THREE.MeshStandardMaterial({ color: "#5b3a29" })
  );
  trunk.position.set(0, 4, 0); // Mittelpunkt liegt bei Y = 4
  group.add(trunk);

  // Krone (Spheres)
  const leaves = [
    { x: 0, y: 9.5, z: 0, s: 3 },
    { x: 2, y: 9, z: 0, s: 2.5 },
    { x: -2, y: 9, z: 0, s: 2.5 },
    { x: 0, y: 9, z: 2, s: 2.5 },
    { x: 0, y: 9, z: -2, s: 2.5 },
    { x: 0, y: 11, z: 0, s: 2 },
  ];

  leaves.forEach((leaf, i) => {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(leaf.s, 32, 32),
      new THREE.MeshStandardMaterial({ color: "#0a3" })
    );
    sphere.position.set(leaf.x, leaf.y, leaf.z);
    group.add(sphere);
  });

  scene.add(group);
  return group;
}
function createHuman() {
  const group = new THREE.Group();

  // Kopf
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: "#f2c88f" }) // Hautfarbe
  );
  head.position.set(0, 2.75, 0);
  group.add(head);

  // Körper
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1.5, 0.5),
    new THREE.MeshStandardMaterial({ color: "#2222cc" }) // Blaues Shirt
  );
  body.position.set(0, 1.5, 0);
  group.add(body);

  // Beine
  const legL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1.5, 16),
    new THREE.MeshStandardMaterial({ color: "#333" })
  );
  legL.position.set(-0.3, 0.5, 0);
  group.add(legL);

  const legR = legL.clone();
  legR.position.set(0.3, 0.5, 0);
  group.add(legR);

  // Arme
  const armL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 1.5, 16),
    new THREE.MeshStandardMaterial({ color: "#f2c88f" }) // hautfarbig
  );
  armL.position.set(-0.8, 1.7, 0);
  armL.rotation.z = Math.PI / 6;
  group.add(armL);

  const armR = armL.clone();
  armR.position.set(0.8, 1.7, 0);
  armR.rotation.z = -Math.PI / 6;
  group.add(armR);

  scene.add(group);
  return group;
}
function createTruhe() {
  const group = new THREE.Group();

  // Unterer Teil
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 1),
    new THREE.MeshStandardMaterial({ color: "#8b4513" }) // braun
  );
  body.position.set(0, 0.75, 0); // damit sie auf dem Boden steht
  group.add(body);

  // Deckel
  const lid = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.3, 1),
    new THREE.MeshStandardMaterial({ color: "#5a3210" }) // dunkler braun
  );
  lid.position.set(0, 1.65, 0);
  group.add(lid);

  scene.add(group);
  return group;
}
function createVogel() {
  const group = new THREE.Group();

  // Körper (kleine Kugel)
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.MeshStandardMaterial({ color: "#ffcc00" }) // Gelb
  );
  body.position.set(0, 0, 0);
  group.add(body);

  // Flügel links
  const wingL = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.2, 0.5),
    new THREE.MeshStandardMaterial({ color: "#ffcc00" })
  );
  wingL.position.set(-0.3, 0, 0);
  wingL.rotation.z = Math.PI / 6;
  group.add(wingL);

  // Flügel rechts
  const wingR = wingL.clone();
  wingR.position.set(0.3, 0, 0);
  wingR.rotation.z = -Math.PI / 6;
  group.add(wingR);

  scene.add(group);
  return group;
}
let storyboardCount = 0;


function saveStoryboardEntry(entry) {
  const existing = JSON.parse(localStorage.getItem('storyboard') || '[]');
  existing.push(entry);
  localStorage.setItem('storyboard', JSON.stringify(existing));
  
}
function exportSceneToJSON() {
  // Beispielhafte Dump-Struktur
  return {
    objects: scene.children.map(obj => ({
      type: obj.type,
      name: obj.name || '',
      position: obj.position,
      rotation: obj.rotation,
      scale: obj.scale
    }))
  };
}





function runCommands() {
  const input = document.getElementById("commandInput").value;
  const history = document.getElementById("command-history");

  const commands = input
    .split(";")
    .map(c => c.replace(/\n/g, " ").replace(/\s+/g, " ").trim())
    .filter(c => c.length > 0);

    for (const command of commands) {
      console.log(">> Aktueller Befehl:", command);
      const upperCommand = command.trim().toUpperCase();
      if (upperCommand === 'EXPORT SCENE FINAL;') {
        console.log(">> TRIGGER: Export Scene Final!");
        window.exportSceneFinal();
        history.innerHTML += `> ${command}<br>📸 Szene exportiert<br>`;
        continue;
      }
    
      const parts = command.split(" ");
      history.innerHTML += `> ${command}<br>`;
    

    if (lastCreatedObject && parts[0] !== "NAME") {
      history.innerHTML += "⚠️ Fehler: Objekt wurde erstellt, aber nicht benannt!<br>";
      continue;
    }

    if (parts[0] === "CREATE") {
      const type = parts[1];
    
      if (type === "TREE") {
        const tree = createTree();
        lastCreatedObject = tree;
      }
      if (type === "HUMAN") {
        const human = createHuman();
        lastCreatedObject = human;
      }
      if (type === "TRUHE") {
        const truhe = createTruhe();
        lastCreatedObject = truhe;
      } else if (type === "VOGEL") {
        const vogel = createVogel();
        lastCreatedObject = vogel;
      }
      
    

      if (["CUBE", "SPHERE", "PLANE", "TUBE"].includes(type)) {
        const sizeIdx = parts.indexOf("SIZE");
        if (sizeIdx !== -1) {
          const size = parts.slice(sizeIdx + 1).map(Number);
          const mesh = createMesh(type, size);
          if (mesh) {
            scene.add(mesh);
            lastCreatedObject = mesh;
          }
          
        } else {
          history.innerHTML += `⚠️ Fehler: SIZE fehlt bei ${type}<br>`;
        }
      } else if (type === "CAMERA") {
        const aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
        const cam = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        cam.position.set(0, 10, 10);
        cam.lookAt(0, 0, 0);
        lastCreatedObject = cam;
      } else if (type === "LIGHT") {
        const kind = parts[2];
        let light = null;
      
        if (kind === "SUN") {
          light = new THREE.DirectionalLight(0xffffff, 1);
          light.position.set(5, 5, 5);
      
         
          const bulb = new THREE.Mesh(
            new THREE.SphereGeometry(0.2),
            new THREE.MeshBasicMaterial({ color: 'yellow' })
          );
          bulb.position.copy(light.position);
          scene.add(bulb);
          lastCreatedObject = light;
          sceneObjects["light_marker_" + Date.now()] = bulb; 
      
        } else if (kind === "SPOT") {
          light = new THREE.SpotLight(0xffffff, 1);
          light.position.set(0, 5, 5);
          light.target.position.set(0, 0, 0);
          scene.add(light.target);
      
          const bulb = new THREE.Mesh(
            new THREE.SphereGeometry(0.2),
            new THREE.MeshBasicMaterial({ color: 'yellow' })
          );
          bulb.position.copy(light.position);
          scene.add(bulb);
      
          lastCreatedObject = light;
          sceneObjects["light_marker_" + Date.now()] = bulb;
        }
        
        if (light) {
          scene.add(light);
          lastCreatedObject = light;
        }
      }
      
      
    } else if (parts[0] === "NAME") {
      const name = parts[2];
      if (!lastCreatedObject) continue;

      if (lastCreatedObject instanceof THREE.Camera) {
        cameraObjects[name] = lastCreatedObject;
      } else {
        sceneObjects[name] = lastCreatedObject;
      }

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = name;
      document.getElementById('canvas-wrapper').appendChild(label);

      const labelWrapper = new THREE.Object3D();
      labelWrapper.userData = { target: lastCreatedObject };
      labelWrapper.element = label;
      labelGroup.add(labelWrapper);

      lastCreatedObject = null;
    } else if (parts[0] === "SITE") {
      const cam = cameraObjects[parts[1]];
      const level = parts[2];
      if (!cam) continue;

      if (level === "-1") cam.position.set(0, 3, 3);
      else if (level === "-2") cam.position.set(0, 5, 5);
      else cam.position.set(0, 10, 10);

      cam.lookAt(0, 0, 0);
      camera = cam;
      controls.object = cam;
    }
    else if (parts[0] === "POSITION") {
      const name = parts[1];
      const x = parseFloat(parts[2]);
      const y = parseFloat(parts[3]);
      const z = parseFloat(parts[4]);
    
      const obj = sceneObjects[name];
      if (obj) {
        obj.position.set(x, y, z);
      } else {
        history.innerHTML += `⚠️ Fehler: Objekt "${name}" nicht gefunden<br>`;
      }
    }
    else if (parts[0] === "COLOR") {
      const name = parts[1];
      const colorName = parts[2];
    
      const obj = sceneObjects[name];
      if (obj && obj.material) {
        obj.material.color.set(colorName);
      } else {
        history.innerHTML += `⚠️ Fehler: Objekt "${name}" nicht gefunden oder nicht färbbar<br>`;
      }
    }
    else if (parts[0] === "INTENSITY") {
      const name = parts[1];
      const value = parseFloat(parts[2]);
      const obj = sceneObjects[name];
      if (obj && obj.intensity !== undefined) {
        obj.intensity = value;
      } else {
        history.innerHTML += `⚠️ Fehler: Licht "${name}" nicht gefunden oder nicht gültig<br>`;
      }
    }
    
    else if (parts[0] === "KELVIN") {
      const name = parts[1];
      const kelvin = parseInt(parts[2]);
      const obj = sceneObjects[name];
      if (obj && obj.color) {
        // Simpler Kelvin zu RGB Approximation
        const tempColor = new THREE.Color();
        tempColor.setRGB(
          kelvin > 6600 ? 1.0 : kelvin / 6600,
          kelvin > 5000 ? 1.0 : kelvin / 5000,
          kelvin < 4000 ? kelvin / 4000 : 1.0
        );
        obj.color = tempColor;
      } else {
        history.innerHTML += `⚠️ Fehler: Kelvin konnte nicht gesetzt werden<br>`;
      }
    }
    else if (parts[0] === "ROTATE") {
      const name = parts[1];
      const angleDeg = parseFloat(parts[2]);
      const obj = sceneObjects[name];
    
      if (obj && obj instanceof THREE.Light && obj.target) {
        const angleRad = angleDeg * (Math.PI / 180);
        const dir = new THREE.Vector3(Math.sin(angleRad), 0, Math.cos(angleRad));
        const pos = obj.position.clone();
        const targetPos = pos.clone().add(dir);
        obj.target.position.copy(targetPos);
        scene.add(obj.target); // falls noch nicht hinzugefügt
      } else if (obj) {
        // Optional: Für andere Objekte auch rotieren (z. B. Mesh)
        obj.rotation.y = angleDeg * (Math.PI / 180);
      } else {
        history.innerHTML += `⚠️ Fehler: Objekt "${name}" nicht gefunden oder nicht drehbar<br>`;
      }
      
      
    }
  }
}
function exportSceneAsJSON() {
  const exportData = [];

  Object.entries(sceneObjects).forEach(([name, obj]) => {
    let type = "UNKNOWN";
    let size = [1, 1, 1];

    // Typ erkennen über Geometrie
    if (obj.geometry instanceof THREE.BoxGeometry) type = "CUBE";
    if (obj.geometry instanceof THREE.SphereGeometry) type = "SPHERE";
    if (obj.geometry instanceof THREE.CylinderGeometry) type = "TUBE";
    if (obj.geometry instanceof THREE.PlaneGeometry) type = "PLANE";

    // Größe grob ableiten
    if (obj.geometry?.parameters) {
      const p = obj.geometry.parameters;
      if (type === "CUBE") size = [p.width, p.height, p.depth];
      if (type === "SPHERE") size = [p.radius * 2, p.radius * 2, p.radius * 2];
      if (type === "TUBE") size = [p.radiusTop, p.radiusBottom, p.height];
      if (type === "PLANE") size = [p.width, p.height];
    }

    const entry = {
      name,
      type,
      position: obj.position.toArray(),
      size,
      color: obj.material?.color?.getStyle() || "#ffffff"
    };

    exportData.push(entry);
  });

  // JSON-Datei erzeugen & zum Download anbieten
  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "scene.json";
  a.click();
}




function updateLabels() {
  labelGroup.children.forEach(wrapper => {
    const target = wrapper.userData?.target;
    const element = wrapper.element;
    if (!target || !element) return;
    const pos = target.getWorldPosition(new THREE.Vector3());
    const projected = pos.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
    const y = (-projected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
    element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
  });
}

function switchViewMode(mode) {
  if (gridHelper) {
    scene.remove(gridHelper);
    gridHelper = null;
  }
  controls.enabled = false;
  labelGroup.children.forEach(label => {
    if (label.element) label.element.style.display = "none";
  });
  if (mode === "grid") {
    gridHelper = new THREE.GridHelper(100, 50, 0xffff00, 0xffff00);
    scene.add(gridHelper);
  } else if (mode === "free") {
    controls.enabled = true;
  } else if (mode === "labels") {
    labelGroup.children.forEach(label => {
      if (label.element) label.element.style.display = "block";
    });
  }
}

window.addEventListener("load", () => {
  init3D();

  let viewState = {
    grid: false,
    free: false,
    labels: false
  };

  function updateViewModes() {
    // Grid
    if (viewState.grid && !gridHelper) {
      gridHelper = new THREE.GridHelper(100, 50, 0xffff00, 0xffff00);
      scene.add(gridHelper);
    } else if (!viewState.grid && gridHelper) {
      scene.remove(gridHelper);
      gridHelper = null;
    }

    // Labels
    labelGroup.children.forEach(label => {
      if (label.element) {
        label.element.style.display = viewState.labels ? "block" : "none";
      }
    });

    // Kamera
    controls.enabled = viewState.free;
  }

  // Grid-Button
  const gridBtn = document.getElementById("gridToggle");
  gridBtn.addEventListener("click", () => {
    viewState.grid = !viewState.grid;
    gridBtn.classList.toggle("active", viewState.grid);
    updateViewModes();
  });

  // Kamera-Button
  const camBtn = document.getElementById("freeCamToggle");
  camBtn.addEventListener("click", () => {
    viewState.free = !viewState.free;
    camBtn.classList.toggle("active", viewState.free);
    updateViewModes();
  });

  // Labels-Button
  const labelBtn = document.getElementById("labelToggle");
  labelBtn.addEventListener("click", () => {
    viewState.labels = !viewState.labels;
    labelBtn.classList.toggle("active", viewState.labels);
    updateViewModes();
  });
});
window.runCommands = runCommands;
window.switchViewMode = switchViewMode;
window.exportSceneAsJSON = exportSceneAsJSON;
window.exportSceneFinal = exportSceneFinal;

// Jetzt kommen die beiden Funktionen GLOBAL (außerhalb aller Blöcke!)
function exportSceneFinal() {
  if (!renderer || !camera || !scene) {
    console.error("Fehlt renderer, camera oder scene!");
    return;
  }

  renderer.render(scene, camera);

  const screenshot = renderer.domElement.toDataURL('image/png');
  const sceneData = JSON.stringify(exportSceneToJSONForStoryboard(), null, 2);

  const blob = new Blob([sceneData], { type: 'application/json' });
  const jsonUrl = URL.createObjectURL(blob);

  const container = document.getElementById('storyboard-container');
  const entry = document.createElement('div');
  entry.className = 'storyboard-entry';

  const index = document.querySelectorAll('.storyboard-entry').length + 1;

  entry.innerHTML = `
    <h3>📸 Scene ${index}</h3>
    <img src="${screenshot}" alt="Scene Screenshot" />
    <textarea placeholder="Beschreibe diese Szene..."></textarea>
    <div class="buttons">
      <a href="${screenshot}" download="scene${index}.png">
        <button>⬇️ PNG</button>
      </a>
      <a href="${jsonUrl}" download="scene${index}.json">
        <button>⬇️ JSON</button>
      </a>
    </div>
  `;

  container.appendChild(entry);
}

function exportSceneToJSONForStoryboard() {
  return {
    timestamp: Date.now(),
    objects: scene.children.map(obj => ({
      type: obj.type,
      name: obj.name || '',
      position: obj.position,
      rotation: obj.rotation,
      scale: obj.scale
    }))
  };
}


