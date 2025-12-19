<template>
  <footer class="footer">
    <div class="footer-grid">
      <div>
        <div class="logo">
          <div class="logo-icon">⚡</div>
          <span>ECP Assistant</span>
        </div>
        <p>Assistant Community Manager autonome propulsé par IA locale</p>
      </div>
      <div>
        <h4>Produit</h4>
        <ul class="footer-links">
          <li><a href="#">Fonctionnalités</a></li>
          <li><a href="#">Tarifs</a></li>
          <li><a href="#">Documentation</a></li>
        </ul>
      </div>
      <div>
        <h4>Support</h4>
        <ul class="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Guide</a></li>
        </ul>
      </div>
      <div>
        <h4>Légal</h4>
        <ul class="footer-links">
          <li><a href="#">Mentions légales</a></li>
          <li><a href="#">Confidentialité</a></li>
          <li><a href="#">CGU</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 ECP Assistant. Développé avec amour pour la souveraineté des données.
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1A1A1A;
  color: #9CA3AF;
  padding: 3rem 2rem;
}

.footer-grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3d3f8f, #ff4785);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.footer h4 {
  color: white;
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #ff4785;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 2rem;
  text-align: center;
}
</style>