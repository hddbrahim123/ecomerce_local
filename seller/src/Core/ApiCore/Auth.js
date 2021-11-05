import { API_URL } from "../../config";

export const SellerSignin = (user) => {
  return fetch(`${API_URL}Account/AuthenticateAdmin`, {
    method: "POST",
    headers: {
      'Accept':'application/json',
      'Content-Type':'application/json; charset=utf-8',
      'Server':'Kestrel',
      'Transfer-Encoding':'chunked'
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const IsConnect = (token) => {
  return fetch(`${API_URL}Account/IsConnecte`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: "{}",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

