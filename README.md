# NodeCRM
Node后台管理系统


>这个系统其实是出于学习nodejs的目的而改写的系统。
原来的系统前端使用了extjs4.2.1,后端使用了PHP5.4和ZEND框架开发，后台数据库是用mongodb2.2.2。
我抽离出了原来系统中的账户管理，角色管理，菜单管理，权限管理这4个部分，
我想这4个部分，基本上所有的系统都会用到。具有一定的普遍性。所以将这4个部分用nodejs重新改写了。

>该系统目前使用模块有express,ejs,connect-mongo,mongodb,express-partials,connect-flash,fibers,wind等
其实wind模块这次系统中没有使用。可以将它排除出去。我是出于学习wind的目的，才加入这个模块的。
本来准备使用wind模块，是为了实现同步的目的，由于后来改用了fibers模块之后，就没有使用它。这里说明一下
不是fibers要比wind好，而是我暂时不能理解wind，或则是说对wind的研究不够吧。
众所周知nodejs是推崇异步模式。但是这个系统是从php过来的，而php的代码是同步模式的写法，所以为了在改写的过程中
希望 1是代码改动最少 2是同步写法更加适合思维习惯。而且代码可读性高的目的，用到了fibers。

>这个系统的源代码中有些js文件里保留了一些原来的PHP代码，这是出于代码对比的目的。
是让大家了解原来的php代码是怎么实现的，用nodejs之后是如何改写的。通过对比，大家会发现
其实通过使用fibers之后，几乎两者是一模一样的。

>还有源代码中还保留了一些被注释掉的函数，有些是用到了wind，有些是用到了fibers，有些是直接异步的写法。
这些内容都是在开发过程中我不断尝试后的产物。我花了1周的时间才实现了一个递归的调用，而且还是同步的方式。
到目前为止，我还不能理解在异步模式下实现递归调用函数。比如说源代码中有个函数getMenuTree，菜单下面可能有子菜单，
子菜单的下面可能还有菜单。所以是一个递归的过程。我现在是同步的写法实现了这个函数，如果有人能够提供异步写法实现的递归函数并
emai给我，我不胜荣幸。

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

>在使用本系统之前，必须要安装nodejs 0.10.10，mongodb2.2.2,python2.7.5至于安装的方法请googel解决。
将源代码下载之后，解压到某个目录下，比如说d:\nodejs目录。
进入到那个目录，

a）运行以下命令

>npm install

>尽管在源代码中已包含了这些模块，但是最好还是要重新运行一遍。
因为有些模块可能需要重新的编译。
比如说fibers模块，我在window下运行npm install fibers的时候编译了一个win32-ia32-v8-3.14
而在linux下重新编译了linux-ia32-v8-3.14。所以说根据操作系统的不同，可能会有一些不同。
以免造成想不到的错误。

b）打开settings.js，并且将你的mongodb的设置改写并保存。

c）运行node app.js或则node cluster.js
如果没有提示错误的话，那么就说明环境配置成功了。

d）通过以下的URL可以在mongodb中追加一些数据，不过只能运行一次。否则会重复追加数据。
浏览器上输入 http://localhost:3000/admin/index/install
做完之后，
浏览器上输入http://localhost:3000/
就通过用户名admin 密码adminadmin进行登录，并使用这个系统了。
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
以下是学习的资料，如果你有一些好的学习资料推荐也请联系我

>http://nodejs.org/
>http://blog.fens.me/nodejs-express3/
>https://github.com/joyent/node
>http://windjs.org/cn/
>http://xcoder.in/blog/2013/03/nodejs-mongodb-sync.xhtml
>https://github.com/XadillaX/SevenzJS/blob/a0a0476000c492dd8e70c062cfa432f559edbd16/sevenz/sMongoSync.js
>https://github.com/XadillaX/SevenzJS/blob/a0a0476000c492dd8e70c062cfa432f559edbd16/actions/index.js
>http://express.jsbin.cn/api.html
>http://nodejsapi.cloudfoundry.com/


>最近本人在学习开发NodeJs，使用到express框架，对于网上的学习资料甚少，因此本人会经常在开发中做一些总结。

>express获取参数有三种方法：官网介绍如下

>Checks route params (req.params), ex: /user/:id

>Checks query string params (req.query), ex: ?id=12

>Checks urlencoded body params (req.body), ex: id=


>1、例如：127.0.0.1:3000/index，这种情况下，我们为了得到index，我们可以通过使用req.params得到，通过这种方法我们就可以很好的处理Node中的路由处理问题，同时利用这点可以非常方便的实现MVC模式；

>2、例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；

>3、例如：127.0.0.1：300/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；


//使用npm 安装包的命令格式为：
//npm [install/i] [package_name] 

$ node --help

//安装supervisor
$ npm install -g supervisor 

//安装node-inspector
$ npm install -g node-inspector

//然后在终端中通过node --debug-brk=5858 debug.js 命令连接你要除错的脚本的调试服务器，
//启动node-inspector：
$ node-inspector 
//在浏览器中打开http://127.0.0.1:8080/debug?port=5858，即可显示出优雅的Web 调试工具

//安装express
$ npm install -g express

$ cd /工程目录
//构建一个项目用模板ejs
$ express --ejs microblog 
//进入该目录，安装依赖文件
$ cd microblog && npm install
//启动服务器
$ node app.js
//也可以使用supervisor 实现监视代码修改和自动重启
$ supervisor app.js

//在浏览器中打开http://localhost:3000

ejs-locals
Express 3.x layout, partial and block template functions for the EJS template engine.

Previously also offered include but you should use EJS 0.8.x's own method for that now.

Installation

$ npm install ejs-locals --save
(--save automatically writes to your package.json file, tell your friends)

Usage

Run node app.js from examples and open localhost:3000 to see a working example.

Given a template, index.ejs:

<% layout('boilerplate') -%>
<% script('foo.js') -%>
<% stylesheet('foo.css') -%>
<h1>I am the <%=what%> template</h1>
<% block('header', "<p>I'm in the header.</p>") -%>
<% block('footer', "<p>I'm in the footer.</p>") -%>
And a layout, boilerplate.ejs:

<!DOCTYPE html>
<html>
  <head>
    <title>It's <%=who%></title>
    <%-scripts%>
    <%-stylesheets%>
  </head>
  <body>
    <header>
      <%-blocks.header%>
    </header>
    <section>
      <%-body -%>
    </section>
    <footer>
      <%-blocks.footer%>
    </footer>
  </body>
</html>
When rendered by an Express 3.0 app:

var express = require('express')
  , engine = require('ejs-locals')
  , app = express();

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

// render 'index' into 'boilerplate':
app.get('/',function(req,res,next){
  res.render('index', { what: 'best', who: 'me' });
});

app.listen(3000);
You get the following result:

<!DOCTYPE html>
<html>
  <head>
    <title>It's me</title>
    <script src="foo.js"></script>
    <link rel="stylesheet" href="foo.css" />
  </head>
  <body>
    <header>
      <p>I'm in the header.</p>
    </header>
    <section>
      <h1>I am the best template</h1>
    </section>
    <footer>
      <p>I'm in the footer.</p>
    </footer>
  </body>
</html>
Note, if you haven't seen it before, this example uses trailing dashes in the EJS includes to slurp trailing whitespace and generate cleaner HTML. It's not strictly necessary.

Features

layout(view)

When called anywhere inside a template, requests that the output of the current template be passed to the given view as the body local. Use this to specify layouts from within your template, which is recommended with Express 3.0, since the app-level layout functionality has been removed.

partial(name,optionsOrCollection)

When called anywhere inside a template, adds the given view to that template using the current given optionsOrCollection. The usual way to use this is to pass an Array as the collection argument. The given view is then executed for each item in the Array; the item is passed into the view as a local with a name generated from the view's filename.

For example, if you do <%-partial('thing',things)%> then each item in the things Array is passed to thing.ejs with the name thing. If you rename the template, the local name of each item will correspond to the template name.

block(name,html)

When called anywhere inside a template, adds the given html to the named block. In the layout you can then do `<%-block('foo')%> to render all the html for that block.

Since this relies on javascript strings, and bypasses EJS's default escaping, you should be very careful if you use this function with user-submitted data.

script(src,type)

A convenience function for block('scripts', '<script src="src.js"></script>') with optional type. When called anywhere inside a template, adds a script tag with the given src/type to the scripts block. In the layout you can then do `<%-scripts%> to output the scripts from all the child templates.

stylesheet(href,media)

A convenience function for block('stylesheets', '<link rel="stylesheet" href="href.css" />') with optional media type. When called anywhere inside a template, adds a link tag for the stylesheet with the given href/media to the stylesheets block. In the layout you can then do `<%-stylesheets%> to output the links from all the child templates.

Template Support

ejs (actually hard coded right now, but feel free to fork and help!)
TODO

More Tests!
More templates.
Better, safer (autoescaped) syntax for longer blocks
Running Tests

To run the test suite first invoke the following command within the repo, installing the development dependencies:

$ npm install -d
then run the tests:

$ npm test
Backwards Compatibility

Express 2.0 had similar functionality built in, using { layout: 'view' } as an argument to res.render but this has been removed in Express 3.0. If you want the old behavior you should do:

app.locals({
  _layoutFile: true
})
And/or pass _layoutFile: true in the options when you call res.render(...).

Whither Include?

Previous versions of this library had an include function. This is now supported directly by EJS, albeit with a different syntax. For ejs-locals 1.0+ simply do:

<% include path/view %>

=======