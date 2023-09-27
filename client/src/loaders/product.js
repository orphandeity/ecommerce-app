async function loader({ params }) {
  const response = await fetch(`/api/products/${params.id}`);
  const data = await response.json();
  return data;
}

export default loader;
