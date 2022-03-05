import axiosHandler from "./axiosHandler";
export class GalleryService{
    async getAll(){
        return ((await axiosHandler.get('/gallery')).data)
    }

    async get(id){
        return ((await axiosHandler.get(`/gallery/${id}`)).data)
    }

    async create(obj){
        return ((await axiosHandler.post('/gallery',obj)).data)
    }

    async patch(id,obj){
        return ((await axiosHandler.patch(`/gallery/${id}`,obj)).data)
    }
}
