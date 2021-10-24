import isAuthSeller from "../helpers/isAuthSeller"
import { API_URL } from "../../config"

export const getProductsSeller = (filters) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/GetProductsViewPage`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(filters)

    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err))
}

export const getProductViewSeller = (slug) => {
    const { token } = isAuthSeller()
    console.log('getProductViewSeller')
    return fetch(`${API_URL}Admin/GetProductDetailView?slug=${slug}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err))
}

export const getProductViewEditSeller = (slug) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/GetProductEdit?slug=${slug}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err))
}

export const SaveProduct = (product) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/CreateProduct`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const UpdateProduct = (product) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/UpdateProduct`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product)
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const UploadImages = (slug, images) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/UploadImages?slug=${slug}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: images
    })
        .then()
        .catch(err => console.error(err))
}

export const UpdateImages = (slug, images) => {
    console.log(images)
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/UpdateImages?slug=${slug}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(images)
    })
        .then()
        .catch(err => console.error(err))
}

export const RemoveProduct = (slug) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/RemoveProduct?slug=${slug}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const RemoveImage = (imageGuid) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/RemoveImage?imageGuid=${imageGuid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const UpProduct = (slug) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/UpProduct?slug=${slug}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
export const DownProduct = (slug) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/DownProduct?slug=${slug}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const OrderProducts = (force) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Admin/OrderProducts?force=${force}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const InsertSlide = (slide) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/InsertSlide`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(slide)
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const UpdateSlide = (slide) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/UpdateSlide`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(slide)
    })
        .then(res => res.json())
        .catch(err => console.error(err))
}

export const UploadImageSlide = (id, images) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/UploadSlideImage?slideId=${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: images
    })
        .then()
        .catch(err => console.error(err))
}

export const RemoveSlide = (slideId) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/RemovetSlide?slideId=${slideId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
export const GetSlide = (slideId) => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/GetSlide?slideId=${slideId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}
export const GetLastSlideView = () => {
    const { token } = isAuthSeller()
    return fetch(`${API_URL}Home/GetLastSlideView`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .catch(err => console.error(err))
}