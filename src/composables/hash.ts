const useHash = (key: string): string => {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i);
  }

  return (Math.abs(hash) % 1000).toString();
}

export default useHash;