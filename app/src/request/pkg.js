/**
 * Created by xss on 2017/4/12.
 */

import { fetch_req, GET_OPT, POST_OPT } from './fetch';




export var Test = (param) => {
  return fetch_req('XXXXXXX', POST_OPT, param);
}