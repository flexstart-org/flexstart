export default {
  index: {
    type: "page",
    title: "Home",
    theme: {
      layout: "full",
    },
  },
  pricing: {
    type: "page",
    title: "Pricing",
    theme: {
      layout: "full",
    },
  },
  company: {
    title: "Company",
    type: "menu",
    items: {
      about: {
        title: "About",
        href: "/about",
      },
      contact: {
        title: "Contact Us",
        href: "/contact",
      },
    },
  },
  blog: {
    type: "page",
    title: "Blog",
    display: "hidden",
  },
  courses: {
    type: "page",
    title: "Courses",
    display: "hidden",
  },
  about: {
    type: "page",
    title: "About Us",
    display: "hidden",
    theme: {
      typesetting: "article",
    },
  },
  contact: {
    type: "page",
    title: "Contact Us",
    display: "hidden",
    theme: {
      typesetting: "article",
    },
  },
  privacy: {
    type: "page",
    title: "Privacy",
    display: "hidden",
    theme: {
      typesetting: "article",
    },
  },
  terms: {
    type: "page",
    title: "Terms",
    display: "hidden",
    theme: {
      typesetting: "article",
    },
  },
};
