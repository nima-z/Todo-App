async function useFetch(url, method, content) {
  const response = await fetch(url, {
    method: method,
    headers: { "Type-Content": "application/json" },
    body: JSON.stringify(content),
  });
}

export default useFetch;
