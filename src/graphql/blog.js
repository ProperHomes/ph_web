export const FETCH_POSTS = `
  query fetchPosts {
    posts {
      nodes {
        id
        postId
        title
        status
        slug
        excerpt
        date
        uri
        featuredImage {
          node {
            mediaItemUrl
            mediaType
            altText
          }
        }
        categories {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export const FETCH_POST_BY_SLUG = `
  query fetchPostByPostId($slug: String!) {
    postBy(slug: $slug) {
      id
      postId
      authorId
      title
      content
      status
      uri
      slug
      date
      featuredImage {
        node {
          mediaItemUrl
          mediaType
          altText
        }
      }
      categories{
        nodes{
          name
        }
      }
    }
  }
`;

export const FETCH_ALL_POSTS_FOR_STATIC_PATHS = `
  query posts {
    posts {
      nodes {
        id
        postId
        slug
      }
    }
  }
`;

export const FETCH_POSTS_BY_CATEGORY = `
  query fetchPosts($category: String!) {
    posts(where: { categoryName: $category }) {
      nodes {
        id
        postId
        title
        status
        slug
        date
        excerpt
        uri
        featuredImage {
          node {
            mediaItemUrl
            mediaType
            altText
          }
        }
        categories {
          nodes {
            id
            name
          }
        }
      }
    }
  }
`;

export const FETCH_ALL_CATEGORIES_FOR_STATIC_PATHS = `
  query fetchCategories {
    categories {
      nodes {
        name
      }
    }
  }
`;
