export function setCookie(name:string, value:string) {
    // 过期时间
    const expiredays = 7;
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exdate.toUTCString() + ";path=/"
}

// 获取cookie
export function getCookie(name:string) {
    let cookieStart = document.cookie.indexOf(name + '=');
    let cookieValue = null;
    if(cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if(cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + name.length + 1, cookieEnd))
    }
    return cookieValue;
  }
  
  // 删除cookie
  export function removeCookie(name:string) {
  //   let date = new Date();
  // 　date.setTime(date.getTime()-10000);
    let val = getCookie(name);
    document.cookie = name + "=" + val + ";expires=" + new Date(0) + ";path=/"
  }