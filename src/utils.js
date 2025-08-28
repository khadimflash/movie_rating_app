export const debouncing=(func,delay)=>{
     let timerId;
     return (...args)=>{
          clearTimeout(timerId);
          timerId=setTimeout(()=>{
               func.apply(this,args);
          },delay);
        }   
}
