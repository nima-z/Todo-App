async function useFetch(props) {
  fetch(url, {
    method: method,
    headers: { "Type-Content": "application/json" },
    body: JSON.stringify({}),
  });
}

export default useFetch;
