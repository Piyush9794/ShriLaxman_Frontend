import api from "./api";

export const categoryService = {
  // 1. Get Categories from API
  async getCategories() {
    const res = await api.get("/api/categories");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.categories)) return data.categories;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },

  // 2. Create Category (Admin)
  async createCategory(categoryData) {
    const payload = {
      name: categoryData.name?.trim(),
      icon: categoryData.icon || "Sparkles",
      image: categoryData.image,
      description: categoryData.description,
    };

    const res = await api.post("/api/categories", payload);
    return res.data.category || res.data.data || res.data;
  },
};

export default categoryService;
