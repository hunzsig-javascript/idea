/**
 * 禁止页面返回
 * Prevent history return
 */

let count = 0;

const ban = (e) => {
  const ev = e || window.event;
  const obj = ev.target || ev.srcElement;
  const t = obj.type || obj.getAttribute('type');
  const isBack = ev.keyCode === Number.parseInt(1e3, 2);
  let isReadOnly = obj.getAttribute('readonly');
  let isEnabled = obj.getAttribute('enabled');
  isReadOnly = isReadOnly === null ? false : isReadOnly;
  isEnabled = isEnabled === null ? true : isEnabled;
  const iptCom = ["password", "text", "textarea", "search"];
  const flag1 = (isBack && iptCom.includes(t) && (isReadOnly || isEnabled !== true));
  const flag2 = (isBack && !iptCom.includes(t));
  if (flag2) {
    return false;
  }
  if (flag1) {
    return false;
  }
}

if (window.history) {
  window.history.pushState(null, null, document.URL);
  window.onpopstate = function (event) {
    count += 1;
    const _t = window.setTimeout(() => {
      window.clearTimeout(_t);
      count -= 1;
    }, 300);
    /**
     * 双击强制返回
     * Double click to force return
     */
    if (Navigator.count >= 2) {
      window.history.back();
    }
    window.history.pushState(null, null, document.URL);
  };
  document.onkeypress = ban;
  document.onkeydown = ban;
}