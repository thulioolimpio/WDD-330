document.addEventListener('DOMContentLoaded', function() {
  const sortSelect = document.getElementById('sort-by');
  const productList = document.querySelector('.product-list');
  
  if (!sortSelect || !productList) return;
  
  // Obter todos os produtos da lista
  const products = Array.from(productList.children);
  
  // Função para extrair o preço do produto
  function getProductPrice(product) {
    const priceText = product.querySelector('.product-card__price').textContent;
    return parseFloat(priceText.replace(/[^\d.]/g, ''));
  }
  // Abre o modal com os dados do produto
document.querySelectorAll('.quick-view').forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.product-card');
    const product = {
      image: productCard.querySelector('img').src,
      brand: productCard.querySelector('.card__brand').textContent,
      name: productCard.querySelector('.card__name').textContent,
      price: productCard.querySelector('.product-card__price').textContent,
      link: productCard.querySelector('a').href
    };
    openModal(product);
  });
});

function openModal(product) {
  const modal = document.getElementById('quickViewModal');
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalBrand').textContent = product.brand;
  document.getElementById('modalPrice').textContent = product.price;
  document.getElementById('modalLink').href = product.link;
  modal.style.display = 'block';
}

// Fecha o modal
document.querySelector('.close').addEventListener('click', () => {
  document.getElementById('quickViewModal').style.display = 'none';
});

// Fecha ao clicar fora do modal
window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('quickViewModal')) {
    document.getElementById('quickViewModal').style.display = 'none';
  }
});
  
  // Função para ordenar produtos
  function sortProducts(sortOption) {
    const sortedProducts = [...products];
    
    sortedProducts.sort((a, b) => {
      const nameA = a.querySelector('.card__name').textContent.toLowerCase();
      const nameB = b.querySelector('.card__name').textContent.toLowerCase();
      const priceA = getProductPrice(a);
      const priceB = getProductPrice(b);
      
      switch(sortOption) {
        case 'name-asc':
          return nameA.localeCompare(nameB);
        case 'name-desc':
          return nameB.localeCompare(nameA);
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        default:
          return 0; // Mantém a ordem padrão
      }
    });
    
    // Limpar a lista
    productList.innerHTML = '';
    
    // Adicionar produtos ordenados
    sortedProducts.forEach(product => {
      productList.appendChild(product);
    });
  }
  
  // Event listener para mudanças no select
  sortSelect.addEventListener('change', function() {
    sortProducts(this.value);
  });
});