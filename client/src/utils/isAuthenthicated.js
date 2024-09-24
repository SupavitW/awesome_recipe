// Desc: Check if user is authenticated
export function isAuthenticated() {
  // Get all cookies
  const cookies = document.cookie;

  // Define a regular expression to match the 'token' cookie
  const tokenRegex = /token=([^;]+)/;

  // Use the regular expression to check if the 'token' cookie exists
  const tokenExists = tokenRegex.test(cookies);
  console.log(tokenExists);
  return tokenExists;
}