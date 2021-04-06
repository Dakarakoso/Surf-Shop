const faker = require('faker');
const Post = require('./models/post');

async function seedPost() {
    await Post.deleteMany({});
    for (const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                '_id': '6068b8ec290be7423f4986eb',
                'username' : 'will'
            }
        }
        await Post.create(Post);
    }
    console.log('40 new posts created');
}

module.exports = seedPost;