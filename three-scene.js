/* ============================================
   MARIEM HMAIED — Three.js Hero + Showcase
   Floating decorative objects with mouse + scroll
============================================ */

(function () {
  if (!window.THREE) return;

  // ---------- Hero scene: floating golden ring + decor ----------
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
      const w = heroCanvas.clientWidth;
      const h = heroCanvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Lights — warm cinematic
    const key = new THREE.DirectionalLight(0xfff0d8, 1.4);
    key.position.set(4, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc9a961, 0.6);
    fill.position.set(-4, 2, 3);
    scene.add(fill);
    const ambient = new THREE.AmbientLight(0xebe3d4, 0.6);
    scene.add(ambient);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(0, -3, -4);
    scene.add(rim);

    // Group container so we can mouse-parallax everything
    const group = new THREE.Group();
    scene.add(group);

    // 1. Torus (gold ring) — central decor
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.06, 32, 200),
      new THREE.MeshStandardMaterial({
        color: 0xc9a961,
        metalness: 1,
        roughness: 0.25,
      })
    );
    torus.position.set(0.4, 0.2, 0);
    torus.rotation.x = 0.6;
    group.add(torus);

    // 2. Inner sphere (matte cream)
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0xf5f0e8,
        metalness: 0.05,
        roughness: 0.85,
      })
    );
    sphere.position.set(0.4, 0.2, 0);
    group.add(sphere);

    // 3. Thin secondary ring (taupe)
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.012, 16, 200),
      new THREE.MeshStandardMaterial({
        color: 0xa89580,
        metalness: 0.7,
        roughness: 0.4,
      })
    );
    ring2.position.set(0.4, 0.2, 0);
    ring2.rotation.x = -0.4;
    ring2.rotation.y = 0.5;
    group.add(ring2);

    // 4. Small floating pearls
    const pearls = [];
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 24, 24),
        new THREE.MeshStandardMaterial({
          color: i % 2 ? 0xc9a961 : 0xebe3d4,
          metalness: 0.7,
          roughness: 0.3,
        })
      );
      const angle = (i / 4) * Math.PI * 2;
      p.userData.angle = angle;
      p.userData.radius = 1.9 + Math.random() * 0.3;
      p.userData.speed = 0.2 + Math.random() * 0.2;
      p.userData.yOffset = (Math.random() - 0.5) * 0.6;
      group.add(p);
      pearls.push(p);
    }

    // 5. Thin vertical line element (architectural detail)
    const lineGeom = new THREE.CylinderGeometry(0.004, 0.004, 3.2, 8);
    const lineMat = new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.2, roughness: 0.7 });
    const line1 = new THREE.Mesh(lineGeom, lineMat);
    line1.position.set(-1.4, 0.2, -0.6);
    line1.rotation.z = 0.08;
    group.add(line1);

    // Mouse + scroll parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollY = 0;
    window.addEventListener('mousemove', (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    const clock = new THREE.Clock();
    function animate() {
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      group.rotation.y = mouse.x * 0.25 + t * 0.05;
      group.rotation.x = mouse.y * 0.15 + Math.sin(t * 0.3) * 0.04;
      group.position.y = -scrollY * 0.002 + Math.sin(t * 0.6) * 0.08;

      torus.rotation.z = t * 0.18;
      ring2.rotation.z = -t * 0.12;
      ring2.rotation.x = -0.4 + Math.sin(t * 0.4) * 0.1;

      pearls.forEach((p) => {
        const a = p.userData.angle + t * p.userData.speed;
        p.position.x = 0.4 + Math.cos(a) * p.userData.radius;
        p.position.z = Math.sin(a) * p.userData.radius * 0.6;
        p.position.y = 0.2 + p.userData.yOffset + Math.sin(t * 1.2 + a) * 0.1;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ---------- Showcase scene: 3D vase / sculptural object ----------
  const showcaseCanvas = document.getElementById('showcase-canvas');
  if (showcaseCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.4, 6);

    const renderer = new THREE.WebGLRenderer({
      canvas: showcaseCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
      const w = showcaseCanvas.clientWidth;
      const h = showcaseCanvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // soft warm lights
    const k = new THREE.DirectionalLight(0xfff0d8, 1.6);
    k.position.set(3, 5, 4);
    scene.add(k);
    const f = new THREE.DirectionalLight(0xc9a961, 0.7);
    f.position.set(-4, 1, 2);
    scene.add(f);
    scene.add(new THREE.AmbientLight(0xebe3d4, 0.7));
    const back = new THREE.DirectionalLight(0xffffff, 0.4);
    back.position.set(0, -2, -5);
    scene.add(back);

    const group = new THREE.Group();
    scene.add(group);

    // Sculptural vase — built from a lathe geometry
    const points = [];
    for (let i = 0; i <= 30; i++) {
      const u = i / 30;
      // smooth vase profile
      const r =
        0.55 * Math.pow(1 - u, 0.6) +
        0.35 * Math.sin(u * Math.PI * 1.2) +
        0.18 * Math.pow(u, 0.4);
      points.push(new THREE.Vector2(Math.max(0.08, r), u * 2.4 - 1.2));
    }
    const vase = new THREE.Mesh(
      new THREE.LatheGeometry(points, 80),
      new THREE.MeshStandardMaterial({
        color: 0xebe3d4,
        metalness: 0.15,
        roughness: 0.55,
      })
    );
    vase.position.set(-1.2, -0.2, 0);
    group.add(vase);

    // Pedestal — short cylinder
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 0.95, 0.18, 64),
      new THREE.MeshStandardMaterial({ color: 0x6b5a47, metalness: 0.3, roughness: 0.6 })
    );
    pedestal.position.set(-1.2, -1.55, 0);
    group.add(pedestal);

    // Floating gold sphere (decor)
    const goldSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0xc9a961, metalness: 1, roughness: 0.2 })
    );
    goldSphere.position.set(1.6, 0.6, 0.3);
    group.add(goldSphere);

    // Decorative ring around the gold sphere
    const sRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.018, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0xa89580, metalness: 0.8, roughness: 0.3 })
    );
    sRing.position.copy(goldSphere.position);
    sRing.rotation.x = 1.3;
    group.add(sRing);

    // Tiny tertiary cube (architectural marker)
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.22, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x1a1612, metalness: 0.4, roughness: 0.5 })
    );
    cube.position.set(2.2, -1.1, -0.2);
    cube.rotation.set(0.4, 0.6, 0);
    group.add(cube);

    // mouse / scroll
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    window.addEventListener('mousemove', (e) => {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let scrollProgress = 0;
    function updateScroll() {
      const rect = showcaseCanvas.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section is just entering bottom, 1 when leaving top
      const total = rect.height + vh;
      const passed = vh - rect.top;
      scrollProgress = Math.max(0, Math.min(1, passed / total));
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const clock = new THREE.Clock();
    function tick() {
      const t = clock.getElapsedTime();
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      // Group rotation = scroll progress + mouse
      group.rotation.y = scrollProgress * Math.PI * 0.6 + mx * 0.2;
      group.rotation.x = -0.05 + my * 0.1;
      group.position.y = -0.2 + Math.sin(t * 0.4) * 0.05;

      goldSphere.position.y = 0.6 + Math.sin(t * 0.8) * 0.12;
      sRing.position.copy(goldSphere.position);
      sRing.rotation.y = t * 0.4;

      cube.rotation.x = t * 0.2;
      cube.rotation.y = t * 0.15;

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ============================================
     LIVE DESIGN SOFTWARE VIEWPORT - wireframe kitchen simulation
     Rendered as if peeking into the designer's monitor.
  ============================================ */
  const vpCanvas = document.getElementById('viewport-canvas');
  if (vpCanvas) {
    const vScene = new THREE.Scene();
    const vCam = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    vCam.position.set(4.4, 3.0, 5.2);
    vCam.lookAt(0, 0.6, 0);

    const vRenderer = new THREE.WebGLRenderer({
      canvas: vpCanvas,
      alpha: true,
      antialias: true,
    });
    vRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    vRenderer.setClearColor(0x000000, 0); // transparent — CSS gradient shows through

    function vResize() {
      const w = vpCanvas.clientWidth;
      const h = vpCanvas.clientHeight;
      vRenderer.setSize(w, h, false);
      vCam.aspect = w / h;
      vCam.updateProjectionMatrix();
    }
    vResize();
    window.addEventListener('resize', vResize);

    // ----- Materials (wireframe / edged-faces design software look) -----
    const matEdge = new THREE.LineBasicMaterial({ color: 0xeae2d2, transparent: true, opacity: 0.85 });
    const matEdgeSoft = new THREE.LineBasicMaterial({ color: 0x8a8278, transparent: true, opacity: 0.55 });
    const matSelected = new THREE.LineBasicMaterial({ color: 0xc9a961, transparent: true, opacity: 1.0 });
    const matFaceDark = new THREE.MeshBasicMaterial({ color: 0x2a2a2c, transparent: true, opacity: 0.4 });

    function addEdged(geometry, position, rotation, material = matEdge, faceMat = matFaceDark) {
      const grp = new THREE.Group();
      if (faceMat) {
        const mesh = new THREE.Mesh(geometry, faceMat);
        grp.add(mesh);
      }
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), material);
      grp.add(edges);
      if (position) grp.position.set(...position);
      if (rotation) grp.rotation.set(...rotation);
      return grp;
    }

    const vRoot = new THREE.Group();
    vScene.add(vRoot);

    // ----- Floor grid (CAD viewport look) -----
    const grid = new THREE.GridHelper(14, 28, 0x6b6b6b, 0x3d3d3d);
    grid.position.y = 0;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    vRoot.add(grid);

    // ----- Walls (back + side) as line-only outlines -----
    function wallEdges(w, h, d, x, y, z) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdgeSoft);
      edges.position.set(x, y, z);
      return edges;
    }
    vRoot.add(wallEdges(7, 3.2, 0.08, 0, 1.6, -2.5));
    vRoot.add(wallEdges(0.08, 3.2, 5, -3.5, 1.6, 0));

    // ----- Kitchen datum: a low tiled footprint -----
    vRoot.add(
      addEdged(
        new THREE.BoxGeometry(5.8, 0.04, 3.4),
        [0, 0.02, -0.25],
        null,
        matEdgeSoft,
        null
      )
    );

    // ----- Back-wall base cabinets and countertop -----
    const baseRun = new THREE.Group();
    [-1.6, -0.8, 0, 0.8, 1.6].forEach((x) => {
      baseRun.add(addEdged(new THREE.BoxGeometry(0.72, 0.82, 0.72), [x, 0.43, -2.06]));
      baseRun.add(addEdged(new THREE.BoxGeometry(0.02, 0.6, 0.02), [x + 0.22, 0.48, -1.68], null, matEdgeSoft, null));
    });
    baseRun.add(addEdged(new THREE.BoxGeometry(4.35, 0.09, 0.86), [0, 0.9, -2.05], null, matEdge));
    baseRun.add(addEdged(new THREE.BoxGeometry(0.64, 0.48, 0.035), [0.8, 0.48, -1.66], null, matEdgeSoft, null));
    vRoot.add(baseRun);

    // ----- Tall units: pantry + fridge -----
    const tallUnits = new THREE.Group();
    tallUnits.add(addEdged(new THREE.BoxGeometry(0.74, 2.25, 0.78), [-2.65, 1.13, -2.05], null, matEdge));
    tallUnits.add(addEdged(new THREE.BoxGeometry(0.66, 2.0, 0.68), [2.62, 1.0, -2.0], null, matEdgeSoft));
    tallUnits.add(addEdged(new THREE.BoxGeometry(0.04, 1.75, 0.02), [2.62, 1.05, -1.64], null, matEdgeSoft, null));
    vRoot.add(tallUnits);

    // ----- Upper cabinets and slim shelves -----
    const uppers = new THREE.Group();
    [-1.15, -0.35, 0.45, 1.25].forEach((x) => {
      uppers.add(addEdged(new THREE.BoxGeometry(0.68, 0.62, 0.36), [x, 2.04, -2.27], null, matEdgeSoft));
    });
    uppers.add(addEdged(new THREE.BoxGeometry(1.7, 0.06, 0.34), [-1.75, 1.52, -2.25], null, matEdgeSoft, null));
    uppers.add(addEdged(new THREE.BoxGeometry(1.7, 0.06, 0.34), [-1.75, 1.72, -2.25], null, matEdgeSoft, null));
    vRoot.add(uppers);

    // ----- The "currently modeling" kitchen island (selected = gold wireframe) -----
    const island = new THREE.Group();
    island.add(addEdged(new THREE.BoxGeometry(2.45, 0.82, 1.08), [0, 0.43, 0.42], null, matSelected));
    island.add(addEdged(new THREE.BoxGeometry(2.65, 0.08, 1.2), [0, 0.9, 0.42], null, matSelected));
    island.add(addEdged(new THREE.BoxGeometry(0.62, 0.05, 0.42), [-0.45, 0.96, 0.18], null, matEdgeSoft, null));

    const burners = [
      [0.48, 0.16], [0.82, 0.16], [0.48, 0.5], [0.82, 0.5]
    ];
    burners.forEach(([x, z]) => {
      island.add(addEdged(new THREE.TorusGeometry(0.11, 0.005, 8, 24), [x, 0.955, z], [Math.PI / 2, 0, 0], matSelected, null));
    });

    const faucet = new THREE.Group();
    faucet.add(addEdged(new THREE.CylinderGeometry(0.024, 0.024, 0.38, 10), [-0.78, 1.11, 0.22], null, matSelected, null));
    faucet.add(addEdged(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 10), [-0.61, 1.28, 0.22], [0, 0, Math.PI / 2], matSelected, null));
    faucet.add(addEdged(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 10), [-0.43, 1.21, 0.22], null, matSelected, null));
    island.add(faucet);
    vRoot.add(island);

    // ----- Two pendant lights above the island -----
    const pendant = new THREE.Group();
    [-0.55, 0.55].forEach((x) => {
      pendant.add(addEdged(new THREE.ConeGeometry(0.26, 0.28, 16, 1, true), [x, 1.9, 0.42], null, matEdgeSoft, null));
      pendant.add(addEdged(new THREE.CylinderGeometry(0.008, 0.008, 1.0, 6), [x, 2.45, 0.42], null, matEdgeSoft, null));
    });
    vRoot.add(pendant);

    // ----- A "control point" tracking dot (design software marker) -----
    const ctrlGeo = new THREE.OctahedronGeometry(0.08, 0);
    const ctrlMat = new THREE.MeshBasicMaterial({ color: 0xff5757 });
    const ctrl = new THREE.Mesh(ctrlGeo, ctrlMat);
    ctrl.position.set(-0.45, 1.08, 0.18);
    vRoot.add(ctrl);

    // ----- Lights (purely for any face material shading) -----
    vScene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // ----- Animation loop -----
    const vClock = new THREE.Clock();
    function vTick() {
      const t = vClock.getElapsedTime();
      // slow viewport orbit, like someone gently dragging
      vCam.position.x = Math.sin(t * 0.12) * 5.6;
      vCam.position.z = Math.cos(t * 0.12) * 5.6;
      vCam.position.y = 2.8 + Math.sin(t * 0.18) * 0.25;
      vCam.lookAt(0, 0.8, 0);

      // control point pulse + small drift
      ctrl.position.y = 0.78 + Math.sin(t * 2.4) * 0.04;
      ctrl.rotation.y = t * 1.2;
      ctrlMat.opacity = 0.5 + Math.abs(Math.sin(t * 3.0)) * 0.5;
      ctrlMat.transparent = true;

      vRenderer.render(vScene, vCam);
      requestAnimationFrame(vTick);
    }
    vTick();
  }
})();
