import React from "react";

const Blog = ({ params: { slug } }) => {
  return <main>{slug}</main>;
};

export default Blog;
