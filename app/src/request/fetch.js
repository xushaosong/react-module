/**
 * Created by xss on 2017/4/12.
 */




import { APPSetting } from '../../root/app_config';

export var fetch_req = ((url, opt, params) => {

  return new Promise((resolve, reject) => {
    $.ajax({
      url: APPSetting.fetchRoot + url,
      type: opt ? opt.method : 'GET',
      headers: opt ? opt.headers : null,
      data: params,
      dataType: 'text',
      success: function (res) {

        resolve(result);
      },
      error: function(xhr, errorType, error) {
        reject({
          error: error,
          xhr: xhr
        });
      }
    });
  });

});



const COMMON_OPT = {

};

const COMMON_HEADER = {
  'Content-Type': 'text/plain',
};
const FORM_POST_HEADER = {
};

export const POST_OPT = Object.assign({}, COMMON_OPT, {
  method: 'POST',
  headers: Object.assign({}, COMMON_HEADER, FORM_POST_HEADER)
});

export const GET_OPT = Object.assign({}, COMMON_OPT, {
  method: 'GET',
  headers: COMMON_HEADER
});

export const DEL_OPT = Object.assign({}, COMMON_OPT, {
  method: 'DELETE',
  headers: COMMON_HEADER
});

export const PUT_OPT = Object.assign({}, COMMON_OPT, {
  method: 'PUT',
  headers: Object.assign({}, COMMON_HEADER, FORM_POST_HEADER)
});

