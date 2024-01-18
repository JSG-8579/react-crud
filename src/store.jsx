import { create } from "zustand";
import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_baseURL,
    timeout: 1000
});

export const useStore = create((set) => {

    return {
        data: [],
        
        status: false,
        //데이터 불러오기
        getData: () => {
            set({ status: false });
            request.get('/')
                .then(res => {
                    set({ data: res.data, status: true }) //작업 끝나면 true 변경
                })
                //오류시 에러메세지
                .catch((err) => {
                    console.log(err)
                })
        },
        postData: (value) => {
            // console.log(value)
            request.post('/', { id: Date.now(), name: value })
                .then(res => {
                    set({ data: res.data, status: true }) //작업 끝나면 true 변경
                })
        },
        putData: (id, value2) => {
            console.log(id)
            console.log(value2)
            request.put('/',{id:id, name: value2} )
                .then(res => {
                    set({ data: res.data, status: true }) //작업 끝나면 true 변경
                })
        },
        deleteData: (id2) => {
            // console.log(id)
            request.delete(`/${id2}`)
                .then(res => {
                    set({ data: res.data, status: true }) //작업 끝나면 true 변경
                })
        }
    }
});