

import Req from '../request/req';
import {
  Test
} from '../request/pkg';
import {  } from '../util/util';

export function setTestData() {

  return dispatch => {
    return Req.req(Test, {}).then(res => {
      dispatch({
        type: 'success',
        data: '成功'
      });
      return res;
    }).catch(e => {
      dispatch({
        type: 'fail',
        data: '失败'
      });
      throw e;
    })

  }
}

