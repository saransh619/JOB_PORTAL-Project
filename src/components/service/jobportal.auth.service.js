import axios from 'axios';
import instance from './connection';
import { authHeader, authHeaderMultiPart } from './jobportal.auth.header';

// const jobPostData = JSON.parse(localStorage.getItem('JobPostData'));
// const post=jobPostData.map((item, index) => {
//     return item.postId
// });
// console.log("postid",post);


class AuthService {

    login(authData) {
        // console.log("authData", authData);
        return axios.post(instance() + 'authenticate', authData)
            .then(res => {
                // console.log(res);
                if (res.data.jwtToken) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    return res.data;
                }
            })
    }

    register(authData) {
        // console.log("authData", authData);
        return axios.post(instance() + 'registerNewUser', authData)
            .then(res => {
                // console.log(res);
                if (res.data.jwtToken) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    return res.data;
                }
            })
    }

    getAllRegisteredUsers() {
        return axios.get(instance() + 'getAllRegisterUsers');
    }

    addJob(data) {
        // console.log("data", data);
        return axios({
            method: 'post',
            url: instance() + 'jobpost/createpost',
            data: data,
            headers: authHeader()
        })
    }

    createRecruiters(data) {
        // console.log("data", data);
        return axios({
            method: 'post',
            url: instance() + 'createRecruiters',
            data: data,
            headers: authHeader()
        })
    }

    getAllRecruiters() {
        return axios({
            method: 'get',
            url: instance() + 'getAllRecruiters',
            headers: authHeader()
        })
    }

    addJobApply(data, type) {
        // console.log("sasasasa",data);
        return axios({
            method: 'post',
            url: instance() + 'postApplyJob',
            data: data,
            responseType: 'blob',
            "Content-Type": "application/octet-stream",
            // headers: authHeaderMultiPart()
            headers: authHeader()
        })
    }
    getAllPosts() {
        return axios({
            method: 'get',
            url: instance() + 'jobpost/getAllPosts',
            headers: authHeader()
        })
    }
    getAllApplyJobList() {
        return axios.get(instance() + 'getAllApplyJobList')
    }

    acceptRecruiterPost(postId) {
        return axios({
            method: 'get',
            url: instance() + `jobpost/approvePost/${postId}`,
            headers: authHeader()
        })
    }

    rejectRecruiterPost(postId) {
        return axios({
            method: 'get',
            url: instance() + `jobpost/rejectPost/${postId}`,
            headers: authHeader()
        })
    }

    deleteRecruiterPost(postId) {
        return axios({
            method: 'delete',
            url: instance() + `jobpost/deletePost/${postId}`,
            headers: authHeader()
        })
    }

    userNameExist() {
        return axios({
            method: 'get',
            url: instance() + `usernameAlreadyExists`,
            headers: authHeader()
        })
    }

    ForgetPassword(data){
        console.log("axiosdata",data);
        return axios({
            method:"post",
            url:instance() + `forget_password`,
            data:data,
            headers: authHeader()
        })
    }

    ResetPostPassword(data,token){
        console.log("axiosdata",data);
        console.log("axiosdata",token);
        return axios({
            method:"post",
            url:instance() + `reset_password/`+`?token=${token}`,
            data:data,
            headers: authHeader()
        })
    }

    // SearchByJobLists(keyword){
    //     console.log("keyword is",keyword);
    //     return axios({
    //         method:"get",
    //         url:instance() + `jobpost/searchByJobsList/`+`?keyword=${keyword}`,
    //         headers: authHeader()
    //     })
    // }

}
export default new AuthService();