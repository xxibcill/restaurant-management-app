import axios from 'axios'

export const getIngredientTypeList = async () => {
    const response = await axios({
        method: 'get',
        url: 'http://localhost:8080/getIngredientType',
    })
    console.log(response.data.ingredientType);
    return response.data.ingredientType;
}

// This is a simple, *insecure* hash that's short, fast, and has no dependencies.
// For algorithmic use, where security isn't needed, it's way simpler than sha1 (and all its deps)
// or similar, and with a short, clean (base 36 alphanumeric) result.
// Loosely based on the Java version; see
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
export const simpleHash = (str:string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash &= hash; // Convert to 32bit integer
    }
    return new Uint32Array([hash])[0].toString(36);
  };