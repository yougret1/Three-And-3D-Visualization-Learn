/**
 *@Description: 节流
 *@fn 方法
 *@delay 延迟时间
 *@Date: 2023-07-10 14:28:12
*/
export const throttle = (func, delay)=> {
  let timer;
  return function (...args) {
     if (!timer) {
          timer = setTimeout(() => {
              func.apply(this, args);
              timer = null;
          }, delay);
      }
  };
}
