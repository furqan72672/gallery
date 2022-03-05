import axiosHandler from "./axiosHandler";
export class DeviceService{
    async getAll(id){
        return ((await axiosHandler.get(`/device/user/${id}`)).data)
    }

    async getByQR(qr){
        return ((await axiosHandler.get(`/device/by-qr/${qr}`)).data)
    }
}
