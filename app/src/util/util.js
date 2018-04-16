/**
 * Created by xss on 2017/8/12.
 */

import MD5 from './md5';
// import MD5 from './md_5'
import JSEncrypt from './jsencrypt.min';
import ReactDOM from "react-dom";
import { Toast } from 'antd-mobile'


export var calculateImageSize = (imageSize, showSize, mode) => {
  let newSize = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };
  if (mode === 'fill') {
    let h = (imageSize.height * showSize.width) / imageSize.width;
    if (h < showSize.height) {
      newSize.height = showSize.height;
      newSize.width = (showSize.height * imageSize.width) / imageSize.height;
    } else {
      newSize.width = showSize.width;
      newSize.height = (showSize.width * imageSize.height) / imageSize.width
    }
  } else {
    var imageRatio = imageSize.width / imageSize.height;
    var showRatio = showSize.width / showSize.height;
    if (imageRatio < showRatio) {
      newSize.height = showSize.height;
      newSize.width = (showSize.height * imageSize.width) / imageSize.height;
    } else {
      newSize.width = showSize.width;
      newSize.height = (showSize.width * imageSize.height) / imageSize.width
    }
  }
  newSize.x = (showSize.width - newSize.width) / 2;
  newSize.y = (showSize.height - newSize.height) / 2;
  return newSize
};



export function isAndroid(){
  let u = navigator.userAgent, app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  let isiOS = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
  if (isAndroid) return true;
  if (isiOS) return false;
  return false;
}

export function createParams(params) {


  // let en = RSAEncrypt('{"timeStamp":"20184517629","idfa":"h5","deviceCode":"设备号"}')
  // console.log(en);
  // let de = RSADecrypt('kmuaUTEEeRo30MUpXXFabeuPQnQ_gZN4mdYhwf9KdAngpx5gShSLa1J-tSUD5L9P1O7d6q9I72xPmFnrquZEfiMI4KFwgAuU8bpJHyp8dMa3s662pyvQVM_LEft_oRtiJNGZxq54qDDh1cbNTvmxklWwQ1r9D5cSnTuMgaky6Pg');
  // console.log('解密')
  // console.log(JSON.parse(de));
  //
  // return;

  // 20180405490 测试source
  // 20180408868 正式source
  let date = new Date();
  let p = {
    terminalId: 'H5',
    intefaceType: 'yxlm',
    source: '20180405490',
    timeStamp: String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds()),
    idfa: 'h5',
    deviceCode: 'd',
    version: '0.0.1',
  };
  if (window.locationParams.token) {
    p['token'] = window.locationParams.token
  }
  if (window.locationParams.accountId) {
    p['accountId'] = window.locationParams.accountId
  }
  let newP = Object.assign({}, p, params);
  newP['sign'] = objKeySort(newP).toUpperCase();

  let newPString = JSON.stringify(newP);
  let t = RSAEncrypt(newPString);
  JMLOG('请求加密密文：')
  JMLOG(newP);
  JMLOG(t)
  return t
}

// 对象排序返回签名
export function objKeySort(obj) {
  var newkey = Object.keys(obj).sort();
  var objArray = []; // key=value
  for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
    let objString = newkey[i] + "=" + obj[newkey[i]];
    objArray.push(objString);
  }
  objArray.push('key=' + 'e83fgehkJuHeXinYongContosedce9ff');
  JMLOG('md5:result:' + MD5.md5(objArray.join('&')))
  return MD5.md5(objArray.join('&'));//返回排好序的新对象
}



const public_key = "-----BEGIN PUBLIC KEY-----\n" +
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDw/AUCMdmWvi7SLql4bGiLjNYP\n" +
  "sr1PV/zWQY3UFC64o16uYDSBxcpuQ8fC7l4Uf86uZG/ruv5bmJeDMQxsybxE8NT+\n" +
  "SoaN5/ugURxfNa8/siABPSGJw4foPjDPGEHEyBRDcjGIkj4HbrvBOzHrUK6fvabD\n" +
  "9qsAqYFnaVGQAbPX4QIDAQAB\n" +
  "-----END PUBLIC KEY-----"

const private_key = "-----BEGIN PRIVATE KEY-----\n" +
  "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAMg5ChdxHrOKn343\n" +
  "Z5LIxbTu3mLMIpxDcS8KHwGRTcz4BDzHgKCFcD+ztr4oH64xyRHFu+Vq7VS1O4Lk\n" +
  "XyGbzIjDa9ndV62VNgteEVVPhAmzcRS99E0QRjc6yIEDdoE7s6WOajMwmobMvJ4A\n" +
  "HWUskmLMCtPdrYotzdYP6jf8HYZdAgMBAAECgYEAtLHNarR6+ZtsLxM/VNf+nThJ\n" +
  "2K3TumSfG82th9OjfAyEfnmpmrRyRfshO+GoHaPuiyyBUx05zI22hH0nYYRig534\n" +
  "5p7b5NB/379Qa4j9jIQqGCNwpw5rUbqfY/3Hxvlg9Q4nRODyfZ6y00NKRebjR92c\n" +
  "KXIs+z2mEVwRRdgEqt0CQQDkWzVxQZ1cgFTJG9fNvTwxX9kcs4VWpwHIOh/19ffX\n" +
  "jyodfMGNVEuIKzObtIANOEoJgtZ2TqTCfFTs1wu8YzkvAkEA4HX4ebNwaJzrXGQd\n" +
  "YZqGoxF8q2zxyIbwaR6u+ac/AyCUme/raRhvZuYGuRDHGJYAiNw3AzptlPf9aXFB\n" +
  "EAx+MwJBAK9faMSpCowOto6Yhnyn9wFIRfon2KA6tECsev0vQH7YoRRySkca1MMn\n" +
  "woOy9KCyeRGi3MeREDGYwLP/VzD/1tsCQQDbJTKYF4IrEPGVfcVV0tmages3LyGM\n" +
  "h3pXF3b8FbampfuPo7cyH4I8c16i9ud7cJBLDr3DMBtm8wv+E23Tbm8TAkBe3Vme\n" +
  "eFxYX7f+OvnGxolm6h9M5dRUGqJoZFcEzvowTmXL+ZI83AruMfT0dSAqNUNkzOdJ\n" +
  "KFj+2viqyj58nsmH\n" +
  "-----END PRIVATE KEY-----"


export function RSAEncrypt(text) {
  let crypt = new JSEncrypt();
  crypt.setPublicKey(public_key);
  // let encrypted = crypt.encrypt(text);
  let encryptPwd = crypt.encryptLong(text);
  encryptPwd = encryptPwd.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  // console.log(encryptPwd);
  return encryptPwd;
}



export function RSADecrypt(text) {
  let crypt = new JSEncrypt();
  crypt.setPrivateKey(private_key);
  let decrypted = crypt.decryptLong(text.replace(/-/g, '+').replace(/_/g, '/'));
  return decrypted
}


export function smartScroll(container, selectorScrollable, isShow = true) {
  if (isShow) {
    document.getElementsByTagName("html")[0].style.overflow = 'hidden'
  } else {
    document.getElementsByTagName("html")[0].style.overflow = 'auto'
    return;
  }
  // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
  if (!selectorScrollable || container.data('isBindScroll')) {
    return;
  }
  // 是否是搓浏览器
  // 自己在这里添加判断和筛选
  var isSBBrowser;

  var data = {
    posY: 0,
    maxscroll: 0
  };

  // 事件处理
  container.on({
    touchstart: function (event) {
      var events = event.touches[0] || event;

      // 先求得是不是滚动元素或者滚动元素的子元素
      var elTarget = $(event.target);

      if (!elTarget.length) {
        return;
      }

      var elScroll;

      // 获取标记的滚动元素，自身或子元素皆可
      if (elTarget.is(selectorScrollable)) {
        elScroll = elTarget;
      } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
        elScroll = null;
      }
      if (!elScroll) {
        return;
      }

      // 当前滚动元素标记
      data.elScroll = elScroll;

      // 垂直位置标记
      data.posY = events.pageY;
      data.scrollY = elScroll.scrollTop();
      // 是否可以滚动
      data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
    },
    touchmove: function () {
      // 如果不足于滚动，则禁止触发整个窗体元素的滚动
      if (data.maxscroll <= 0 || isSBBrowser) {
        // 禁止滚动
        event.preventDefault();
      }
      // 滚动元素
      var elScroll = data.elScroll;
      // 当前的滚动高度
      var scrollTop = elScroll.scrollTop();

      // 现在移动的垂直位置，用来判断是往上移动还是往下
      var events = event.touches[0] || event;
      // 移动距离
      var distanceY = events.pageY - data.posY;

      if (isSBBrowser) {
        elScroll.scrollTop(data.scrollY - distanceY);
        elScroll.trigger('scroll');
        return;
      }

      // 上下边缘检测
      if (distanceY > 0 && scrollTop == 0) {
        // 往上滑，并且到头
        // 禁止滚动的默认行为
        event.preventDefault();
        return;
      }

      // 下边缘检测
      if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
        // 往下滑，并且到头
        // 禁止滚动的默认行为
        event.preventDefault();
        return;
      }
    },
    touchend: function () {
      data.maxscroll = 0;
    }
  });

  // 防止多次重复绑定
  container.data('isBindScroll', true);
};

export function scrollWindow(callback) {

  let scrollAction = () => {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
      scrollTop = document.documentElement.scrollTop;
      // console.log('document.documentElement.scrollTop:' + scrollTop)
    } else if (document.body) {
      scrollTop = document.body.scrollTop;
      // console.log('document.body.scrollTop:' + scrollTop)
    }
    callback && callback(scrollTop);
  }
  $(window).on('scroll', scrollAction);
  scrollAction();
}
export function unScrollWindow() {

  $(window).off('scroll');
}

export function onWindowResize(callback) {

  var resizeAction = () => {
    let windowWidth = document.getElementsByTagName("html")[0].clientWidth;
    let clientWidth = document.getElementById("body").clientWidth;
    callback && callback(clientWidth, windowWidth);
  }
  $(document).on('resizeEvtAction', resizeAction);
  resizeAction();
}
export function offWindowResize() {
  $(document).off('resizeEvtAction');
}


const imgFile = {};
export function uploadImage(event, code) {
  handleInputChange(event, (formData) => {
    uploadImg()
  });
}
export function handleInputChange (event, callback) {
  // 获取当前选中的文件
  const file = event.target.files[0];
  const imgMasSize = 1024 * 1024 * 10; // 10MB

  // 检查文件类型
  if(['jpeg', 'png', 'jpg'].indexOf(file.type.split("/")[1]) < 0){
    // 自定义报错方式
    // Toast.error("文件类型仅支持 jpeg/png/gif！", 2000, undefined, false);
    Toast.info("请选择正确的图片", 3, null, true)
    return;
  }

  // 文件大小限制
  if(file.size > imgMasSize ) {
    // 文件大小自定义限制
    // Toast.error("文件大小不能超过10MB！", 2000, undefined, false);
    Toast.info("文件大小不能超过10MB", 3, null, true)
    return;
  }

  // 判断是否是ios
  if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    // iOS
    let formData = transformFileToFormData(file);

    callback && callback(formData);
  } else {
    // 图片压缩之旅
    transformFileToDataUrl(file, (formData) => {
      callback && callback(formData);
    });
  }
}
// 将File append进 FormData
function transformFileToFormData (file) {
  const formData = new FormData();
  // 自定义formData中的内容
  // type
  formData.append('type', file.type);
  // size
  formData.append('size', file.size || "image/jpeg");
  // name
  formData.append('name', file.name);
  // lastModifiedDate
  formData.append('lastModifiedDate', file.lastModifiedDate);
  // append 文件
  formData.append('file', file);
  // 上传图片
  return formData;
}
// 将file转成dataUrl
function transformFileToDataUrl (file, callback) {
  const imgCompassMaxSize = 200 * 1024; // 超过 200k 就压缩

  // 存储文件相关信息
  imgFile.type = file.type || 'image/jpeg'; // 部分安卓出现获取不到type的情况
  imgFile.size = file.size;
  imgFile.name = file.name;
  imgFile.lastModifiedDate = file.lastModifiedDate;

  // 封装好的函数
  const reader = new FileReader();

  // file转dataUrl是个异步函数，要将代码写在回调里
  reader.onload = function(e) {
    const result = e.target.result;

    if(result.length < imgCompassMaxSize) {
      compress(result, (dataUrl) => {
        let formData = processData(dataUrl);
        // formData && uploadImg(formData, code)
        callback && callback(formData);
      }, false );    // 图片不压缩
    } else {
      compress(result, (dataUrl) => {
        let formData = processData(dataUrl);
        // formData && uploadImg(formData, code);
        callback && callback(formData);
      });            // 图片压缩
    }
  };

  reader.readAsDataURL(file);
}
// 使用canvas绘制图片并压缩
function compress(dataURL, callback, shouldCompress = true) {
  const img = new window.Image();
  img.src = dataURL;

  img.onload = function () {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let compressedDataUrl;

    if(shouldCompress){
      compressedDataUrl = canvas.toDataURL(imgFile.type, 0.2);
    } else {
      compressedDataUrl = canvas.toDataURL(imgFile.type, 1);
    }

    callback && callback(compressedDataUrl);
  }
}
function processData (dataURL) {
  // 这里使用二进制方式处理dataUrl
  const binaryString = window.atob(dataURL.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const intArray = new Uint8Array(arrayBuffer);
  const imgFile = imgFile;

  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i);
  }

  const data = [intArray];

  let blob;

  try {
    blob = new Blob(data, { type: imgFile.type });
  } catch (error) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (error.name === 'TypeError' && window.BlobBuilder){
      const builder = new BlobBuilder();
      builder.append(arrayBuffer);
      blob = builder.getBlob(imgFile.type);
    } else {
      Toast.info("版本过低，不支持上传图片", 3, null, true)
      return null;
      // throw new Error('版本过低，不支持上传图片');
    }
  }

  // blob 转file
  const fileOfBlob = new File([blob], imgFile.name);
  const formData = new FormData();

  // type
  formData.append('type', imgFile.type);
  // size
  formData.append('size', fileOfBlob.size);
  // name
  formData.append('name', imgFile.name);
  // lastModifiedDate
  formData.append('lastModifiedDate', imgFile.lastModifiedDate);
  // append 文件
  formData.append('file', fileOfBlob);

  return formData
}
// 上传图片
function uploadImg (formData, code) {
  JMLOG(formData);
  JMLOG(code)
}


export function getImagePrevice(e, callback) {
  let file = e.target.files[0]; //获取file对象
  //判断file的类型是不是图片类型。
  if (!/image\/\w+/.test(file.type)) {
    alert("请上传一张图片~");
    return null;
  }

  let reader = new FileReader(); //声明一个FileReader实例
  reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
  //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
  reader.onload = function(e) {
    // 创建一个新增的图片和文字input
    callback && callback(e.currentTarget.result);
  }
}