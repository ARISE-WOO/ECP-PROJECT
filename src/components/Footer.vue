<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-bottom">
        © 2025 ECP Assistant. Développé avec amour pour la souveraineté des données.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f172a; 
  color: #94a3b8;
  padding: 2.5rem 2rem;
  border-top: 1px solid #1e293b;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-bottom {
  text-align: center;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-bottom:hover {
  color: #e2e8f0;
}

@media (max-width: 640px) {
  .footer-bottom {
    font-size: 0.85rem;
    line-height: 1.5;
  }
}
</style>
