##配置server.js 文件

* 引入path
    > var path=require("path");
*   引入express 依赖模块，用来启动静态服务器
> var express=require("express");
* 实例化操作express
>var app=express();

>var proxy=require("http-proxy-middleware");
* 拼接物理地址，用来指定虚拟路径的访问
>var viewsPath=path.join(_dirname,'views');
* 指定访问页面的路径
>app.use('/',express.static(viewsPath));
* 拼接物理地址，用来指定虚拟路径的访问（静态资源文件）
>var publicPath=path.join(_dirname,'public');
* 指定访问静态资源文件路径
>app.use('/public',express.static(publicPath));

>app.get('/login',function(req,res){
res.send("测试")})
* 监听端口 77520，用来启动服务
>app.listen(77520,function(){
console.log("server run at port 77520")});
* 模块导出
>module.exports=app;
