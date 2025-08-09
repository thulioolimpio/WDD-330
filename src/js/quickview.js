document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os botões Quick View
  const quickViewButtons = document.querySelectorAll('.quick-view');
  
  // Adiciona evento de clique a cada botão
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const product = {
        image: productCard.querySelector('img').src,
        brand: productCard.querySelector('.card__brand').textContent,
        name: productCard.querySelector('.card__name').textContent,
        price: productCard.querySelector('.product-card__price').textContent,
        link: productCard.querySelector('a').href
      };
      
      // Preenche o modal com os dados do produto
      document.getElementById('modalImage').src = product.image;
      document.getElementById('modalTitle').textContent = product.name;
      document.getElementById('modalBrand').textContent = product.brand;
      document.getElementById('modalPrice').textContent = product.price;
      document.getElementById('modalLink').href = product.link;
      
      // Exibe o modal
      document.getElementById('quickViewModal').style.display = 'block';
    });
  });

  // Fecha o modal quando clica no X
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('quickViewModal').style.display = 'none';
  });

  // Fecha o modal quando clica fora
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('quickViewModal')) {
      document.getElementById('quickViewModal').style.display = 'none';
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      document.getElementById('quickViewModal').style.display = 'none';
    }
  });
});