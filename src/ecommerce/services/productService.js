import api from "./api";

export const productService = {
  // 1. Get Products with dynamic query parameters from live API
  async getProducts(params = {}) {
    const queryParams = { ...params };
    if (queryParams.category === "All") {
      delete queryParams.category;
    }
    const res = await api.get("/api/products", { params: queryParams });
    const data = res.data;
    if (Array.isArray(data)) {
      return data;
    }
    if (data && Array.isArray(data.products)) {
      return data.products;
    }
    if (data && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  },

  // 2. Get Product By ID
  async getProductById(id) {
    const res = await api.get(`/api/products/${id}`);
    return res.data.product || res.data.data || res.data;
  },

  // 3. Create / Upload Product (Seller / Admin)
  async createProduct(productData) {
    const payload = {
      title: productData.title?.trim(),
      description: productData.description?.trim(),
      price: Number(productData.price),
      originalPrice:
        Number(productData.originalPrice) ||
        Math.round(Number(productData.price) * 1.15),
      discountPercentage:
        Number(productData.discountPercentage) || 0,
      category: productData.category || "General",
      brand: productData.brand?.trim(),
      stock: Number(productData.stock) || 0,
      thumbnail: productData.thumbnail?.trim(),
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : [productData.thumbnail?.trim()].filter(Boolean),
      badge: productData.badge,
      featured: Boolean(productData.featured),
      trending: Boolean(productData.trending),
      specs: productData.specs || {},
      sellerId: productData.sellerId,
      sellerName: productData.sellerName,
    };

    const res = await api.post("/api/products", payload);
    return res.data.product || res.data.data || res.data;
  },

  // 4. Update Product
  async updateProduct(id, updates) {
    const res = await api.put(`/api/products/${id}`, updates);
    return res.data.product || res.data.data || res.data;
  },

  // 5. Delete Product
  async deleteProduct(id) {
    const res = await api.delete(`/api/products/${id}`);
    return res.data;
  },

  // 6. Add Product Review
  async addReview(id, { rating, comment }) {
    const res = await api.post(`/api/products/${id}/review`, { rating, comment });
    return res.data;
  },
};

export default productService;
