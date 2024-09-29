export const QUERY_KEY = {
  getUserPagination: (page: number = 1) => ["fetchUsers", page],
  getBlogPagination: (page: number = 1) => ["fetchBlogs", page],
};
