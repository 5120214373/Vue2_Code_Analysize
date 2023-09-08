function observe(obj){
    //拿到需要响应式的对象的key
    Object.keys(obj).forEach(key=>{
        let val = obj[key]
        let deps=new Set() //依赖，每一个属性，都有一个依赖，依赖中存储的是利用了该属性的watcher
        Object.defineProperty(obj,key,{
            //存储用到过该属性的watcher
            get(){
               if(window.watcher){
                deps.add(window.watcher)
               }
               return val
            },
            //遇到修改该属性值，通知更新依赖里的所有watcher
            set(newVal){
              val = newVal
              for(let dep of deps){
                dep()
              }
            }
        })
    }) 
}
//用到某个属性值的函数
function funs(fn){
    window.watcher=fn
    fn()
    window.watcher=null
}



