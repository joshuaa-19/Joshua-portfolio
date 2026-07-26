document.addEventListener('DOMContentLoaded', () => {

  /* 1. Subtle Background Geometry Mesh */
  const canvas = document.getElementById('webgl-bg');
  
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Subtle Node Field
    const particlesCount = 350;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 70;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const animate = () => {
      points.rotation.y += 0.001;
      points.rotation.x += (mouseY - points.rotation.x) * 0.05;
      points.rotation.y += (mouseX - points.rotation.y) * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }

  /* 2. Micro-Tilt Effect on Interactive Cards */
  const cards = document.querySelectorAll('.js-tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform = `perspective(1000px) rotateX(${y * -0.03}deg) rotateY(${x * 0.03}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });

  /* 3. Resume Modal Controls */
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeModal');
  const closeBtn = document.getElementById('closeResumeModal');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
});