#### 基于webpack的React多入口环境搭


#### React热加载
webpack-dev-middleware +  webpack-hot-middleware 
配置了style-loader 但是样式的更改暂时无法热加载

#### html处理
html-loader 导出 HTML 为字符串，需要引用静态资源


#### css预处理
 
+ style-loader 将模块的导出作为样式添加到 DOM 中
+ css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
+ less-loader 加载和转译 LESS 文件
+ sass-loader 加载和转译 SASS/SCSS 文件
+ postcss-loader 使用 PostCSS 加载和转译 CSS/SSS 文件
+ stylus-loader 加载和转译 Stylus 文件



#### extract-text-webpack-plugin, 与webpack4.x不兼容，安装beta版本可用（@next）
```
ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: "css-loader"
  publicPath: ''
})
```
use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
fallback:编译后用什么loader来提取css文件
publicfile:用来覆盖项目路径,生成该css文件的文件路径

`css-loader options: {import: true, modules: true, localIdentName: true, cameCase: true}`

> 可以使用mini-css-extract-plugin代替，但是使用发现无法提取出css，生成的css代码存在于js中

#### 文件处理

url-loader 像 file loader 一样工作，但如果文件小于限制，可以返回 data URL， 常用于处理图片 (如果文件超出limit还是会生成文件，依赖file-loader)

file-loader 生成文件 file.png，输出到输出目录并返回 public URL（"/public/path/0dcbbaa7013869e351f.png"）。

#### ES201  .babelrc  @babel/preset-env 不再支持 stage-x 插件
```
{
	preset: [
		'@babel/preset-env', {
			targets: {
				"chrome": "58",
				"ie": "11"
			}
		}
	],

	// plugins配置参考[插件](https://babel.docschina.org/docs/en/plugins), 选用自己需要的plugins
	plugins: [
		'@babel/plugin-transform-async-to-generator', // 用于async await  (还需在入口文件引入@babel/polyfill)
		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-syntax-dynamic-import', // react组件代码分割 按需加载使用, antd
	]
}

```
>  @babel/preset-env behaves exactly the same as @babel/preset-es2015, @babel/preset-es2016 and @babel/preset-es2017 together (or the deprecated babel-preset-latest).

babel最新版本配置参考[官方网站](https://babel.docschina.org/docs/en/babel-preset-env)


#### 最新版webpack(4.x)移除了webpack.optimize.CommonsChunkPlugin，使用splitChunks替代，可以写在optimize配置中，也可以以插件的形式写在plugins中
```
optimization: { 
	splitChunks: {
		chunks: 'initial',  // 只对入口文件中引用的node_modules模块分割
		cacheGroups: {
			vendor: {
				name: 'vandor',
	            test: /[\\/]node_modules[\\/]/,
	            priority: -10
	        }, 
		}
	},

	runtimeChunk: true
}
```