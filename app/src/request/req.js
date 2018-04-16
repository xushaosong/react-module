/**
 * Created by xss on 2017/4/25.
 */

import {
  refreshToken,
  loginSDK
} from './pkg';

export default class Req {

  static req(model, params) {
    return model.call(null, params).then(res => {

      if (!res) {
        let err = new Error('服务器累了，需要休息一下');

        throw err;
      } else {
        if (res.code === '9999') {
          return res;
        } else {
          let err = new Error(res.message);
          err.code = res.code;
          throw err;
        }
      }
    }).catch(e => {
      let err = new Error(e.message ? e.message : '服务器累了，需要休息一下');
      throw err;
    });
  }
}