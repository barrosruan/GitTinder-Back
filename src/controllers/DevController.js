const axios = require ('axios');
const Dev = require('../models/Dev');

module.exports = {
   async store(req, res) {

        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if (userExists) {
            return res.json(userExists)
        }
        
        const response =  await axios.get(`https://api.github.com/users/${username}`);

        console.log(response.data);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name: name ?? username,
            user: username,
            bio,
            avatar: avatar,
        })


        return res.json(dev);
    }
};