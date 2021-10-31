export function checkResponse(response) {
  if(!response.ok) {
    return response.json().then(json => { 
      if (json && json.error) {
        throw new Error(json.error);
      } else if(response.status === 401) {
        throw new Error("Insufficient privileges. Login with an authorized user.");
      } else {
        throw new Error("The server is currently unavailable.");
      }
    });
  }

  return response.json(); 
}
