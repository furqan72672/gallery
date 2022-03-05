import axiosHandler from "./axiosHandler";

export class ImageService{
    async getAll() {
        return ((await axiosHandler.get("/images/by-user-id/620b48172e81c7e598577483")).data)
    }

    async caption(id,obj) {
        return ((await axiosHandler.patch(`/images/${id}`,obj)).data)
    }
}
