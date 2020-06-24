import {
  addAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumList,
  addPhoto,
  updatePhoto,
  deletePhoto,
  deletePhotoByAlbum,
  getPhotoList,
} from '@/services/api';

export default {
  namespace: 'photoAlbum',
  state: {
    albumList: [],
    photoList: [],
    total: 0,
  },
  effects: {
    *getAlbumList({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getAlbumList, params);
      !!resolve && resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveAlbumList',
          payload: response.data,
        });
      }
    },
    *addAlbum({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addAlbum, params);
      !!resolve && resolve(response);
    },
    *updateAlbum({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(updateAlbum, params);
      !!resolve && resolve(response);
    },
    *deleteAlbum({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(deleteAlbum, params);
      !!resolve && resolve(response);
    },

    *getPhotoList({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getPhotoList, params);
      !!resolve && resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'savePhotoList',
          payload: response.data.list,
        });
        yield put({
          type: 'savePhotoTotal',
          payload: response.data.count,
        });
      }
    },
    *addPhoto({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addPhoto, params);
      !!resolve && resolve(response);
    },
    *updatePhoto({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(updatePhoto, params);
      !!resolve && resolve(response);
    },
    *deletePhoto({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(deletePhoto, params);
      !!resolve && resolve(response);
    },
    *deletePhotoByAlbum({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(deletePhotoByAlbum, params);
      !!resolve && resolve(response);
    },
  },
  reducers: {
    saveAlbumList(state, { payload }) {
      return {
        ...state,
        albumList: payload,
      };
    },
    savePhotoList(state, { payload }) {
      return {
        ...state,
        photoList: payload,
      };
    },
    savePhotoTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
  },
};
