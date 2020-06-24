import { stringify } from 'qs';
import request from '@/utils/request';
import { func } from 'prop-types';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

// 分类
export async function queryCategory(params) {
  return request(`/api/getCategoryList?${stringify(params)}`);
}

export async function addCategory(params) {
  return request('/api/addCategory', {
    method: 'POST',
    body: params,
  });
}
export async function updateCategory(params) {
  return request('/api/updateCategory', {
    method: 'POST',
    body: params,
  });
}

export async function delCategory(params) {
  return request('/api/delCategory', {
    method: 'POST',
    body: params,
  });
}

// 其他用户
export async function queryUser(params) {
  return request(`/api/getUserList?${stringify(params)}`);
}

export async function addUser(params) {
  return request('/api/addUser', {
    method: 'POST',
    body: params,
  });
}
export async function updateUser(params) {
  return request('/api/updateUser', {
    method: 'POST',
    body: params,
  });
}

export async function delUser(params) {
  return request('/api/delUser', {
    method: 'POST',
    body: params,
  });
}

// 链接
export async function queryLink(params) {
  return request(`/api/getLinkList?${stringify(params)}`);
}

export async function addLink(params) {
  return request('/api/addLink', {
    method: 'POST',
    body: params,
  });
}
export async function updateLink(params) {
  return request('/api/updateLink', {
    method: 'POST',
    body: params,
  });
}

export async function delLink(params) {
  return request('/api/delLink', {
    method: 'POST',
    body: params,
  });
}

// 留言
export async function queryMessage(params) {
  return request(`/api/getMessageBoardListAdmin?${stringify(params)}`);
}

export async function delMessage(params) {
  return request('/api/delMessage', {
    method: 'POST',
    body: params,
  });
}
export async function getMessageDetail(params) {
  return request(`/api/getMessageBoardDetail?${stringify(params)}`);
}

export async function addReplyMessage(params) {
  return request('/api/addReplyMessage', {
    method: 'POST',
    body: params,
  });
}
export async function updateMessageBoard(params) {
  return request('/api/updateMessageBoard', {
    method: 'POST',
    body: params,
  });
}

// 文章
export async function addAbout(params) {
  return request('/api/addAbout', {
    method: 'POST',
    body: params,
  });
}

export async function updateAbout(params) {
  return request('/api/updateAbout', {
    method: 'POST',
    body: params,
  });
}

export async function deleteAbout(params) {
  return request('/api/deleteAbout', {
    method: 'POST',
    body: params,
  });
}

export async function getAboutList(params) {
  return request(`/api/getAboutList?${stringify(params)}`);
}

export async function getAboutDetail(params) {
  return request(`/api/getAboutDetail?${stringify(params)}`);
}

export async function queryArticle(params) {
  return request(`/api/getArticleListAdmin?${stringify(params)}`);
}

export async function uploadImg(params) {
  return request('/api/uploadImg', {
    method: 'POST',
    body: params,
  });
}
export async function addArticle(params) {
  return request('/api/addArticle', {
    method: 'POST',
    body: params,
  });
}
export async function delArticle(params) {
  return request('/api/delArticle', {
    method: 'POST',
    body: params,
  });
}

export async function updateArticle(params) {
  return request('/api/updateArticle', {
    method: 'POST',
    body: params,
  });
}

export async function getArticleDetail(params) {
  return request('/api/getArticleDetail', {
    method: 'POST',
    body: params,
  });
}

// 管理一级评论
export async function changeComment(params) {
  return request('/api/changeComment', {
    method: 'POST',
    body: params,
  });
}

// 管理第三者评论
export async function changeThirdComment(params) {
  return request('/api/changeThirdComment', {
    method: 'POST',
    body: params,
  });
}

// 时间轴
export async function queryTimeAxis(params) {
  return request(`/api/getTimeAxisList?${stringify(params)}`);
}

export async function addTimeAxis(params) {
  return request('/api/addTimeAxis', {
    method: 'POST',
    body: params,
  });
}
export async function delTimeAxis(params) {
  return request('/api/delTimeAxis', {
    method: 'POST',
    body: params,
  });
}

export async function updateTimeAxis(params) {
  return request('/api/updateTimeAxis', {
    method: 'POST',
    body: params,
  });
}

export async function getTimeAxisDetail(params) {
  return request('/api/getTimeAxisDetail', {
    method: 'POST',
    body: params,
  });
}

// 项目
export async function queryProject(params) {
  return request(`/api/getProjectList?${stringify(params)}`);
}

export async function addProject(params) {
  return request('/api/addProject', {
    method: 'POST',
    body: params,
  });
}
export async function delProject(params) {
  return request('/api/delProject', {
    method: 'POST',
    body: params,
  });
}

export async function updateProject(params) {
  return request('/api/updateProject', {
    method: 'POST',
    body: params,
  });
}

export async function getProjectDetail(params) {
  return request('/api/getProjectDetail', {
    method: 'POST',
    body: params,
  });
}

// 标签
export async function queryTag(params) {
  return request(`/api/getTagList?${stringify(params)}`);
}

export async function addTag(params) {
  return request('/api/addTag', {
    method: 'POST',
    body: params,
  });
}

export async function delTag(params) {
  return request('/api/delTag', {
    method: 'POST',
    body: params,
  });
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function loginAdmin(params) {
  return request('/api/loginAdmin', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

// 相册相关
export async function addAlbum(params) {
  return request('/api/addAlbum', {
    method: 'POST',
    body: params,
  });
}

export async function updateAlbum(params) {
  return request('/api/updateAlbum', {
    method: 'POST',
    body: params,
  });
}

export async function deleteAlbum(params) {
  return request('/api/deleteAlbum', {
    method: 'POST',
    body: params,
  });
}

export async function getAlbumList(params) {
  return request(`/api/getAlbumList?${stringify(params)}`);
}

export async function addPhoto(params) {
  return request('/api/addPhoto', {
    method: 'POST',
    body: params,
  });
}

export async function updatePhoto(params) {
  return request('/api/updatePhoto', {
    method: 'POST',
    body: params,
  });
}

export async function deletePhoto(params) {
  return request('/api/deletePhoto', {
    method: 'POST',
    body: params,
  });
}

export async function deletePhotoByAlbum(params) {
  return request('/api/deletePhotoByAlbum', {
    method: 'POST',
    body: params,
  });
}

export async function getPhotoList(params) {
  return request(`/api/getPhotoList?${stringify(params)}`);
}
