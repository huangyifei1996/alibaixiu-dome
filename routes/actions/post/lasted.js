// 用户模块
const { Post } = require('../../../model/Post');

module.exports = async (req, res) => {
	// 查询用户信息
	const posts = await Post.find({state:1}).sort('-createAt').select().populate('author', '-password').populate('category').limit(5)
	// 响应
	// console.log(posts);
	res.send(posts);
}