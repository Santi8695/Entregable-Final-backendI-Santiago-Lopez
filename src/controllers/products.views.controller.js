import { getProductsService, getProductById } from '../services/product.service.js';

export const renderProductsView = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const filter = query
    ? { $or: [{ category: query }, { status: query === 'true' }] }
    : {};

  const sortOption = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

  const result = await getProductsService(filter, {
    limit,
    page,
    sort: sortOption,
    lean: true
  });

  res.render('products', {
    products: result.docs,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
    nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
    page: result.page,
    totalPages: result.totalPages,
    cid: req.session?.cartId || 'defaultCartId' // ajusta si usas sesiones
  });
};

export const renderProductDetail = async (req, res) => {
  const product = await getProductById(req.params.pid);
  res.render('productDetail', { product, cid: req.session?.cartId || 'defaultCartId' });
};
