export default function about() {
  return <div>About</div>;
}

export const generateMetadata = () => {
  // to gnenerate metada for SEO
  return {
    title: "This is about page",
    description: "all about About page",
  };
};
