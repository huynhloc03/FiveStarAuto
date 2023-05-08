import jwtDecode from "jwt-decode";

function getCookie(name) {
  console.log('document.cookie:', document.cookie); // Add this line for debugging

  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  console.log('parts:', parts); // Add this line for debugging

  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    console.log('cookieValue:', cookieValue); // Add this line for debugging
    return cookieValue;
  }
}


export default function isAgent() {
  console.log("isAgent called");
  console.log(getCookie("access_token"));

  // Get the token using the getCookie function
  const tokenValue = getCookie("access_token");

  if (!tokenValue) {
    // No token found, user is not authenticated
    return false;
  }

  try {
    // Decode the token to get the user's ID and role
    const decoded = jwtDecode(tokenValue);
    console.log(decoded);
    const role = decoded.role;

    // Return true if the user's role is "agent"
    return role === "agent";
  } catch (error) {
    // Invalid token, user is not authenticated
    return false;
  }
}
