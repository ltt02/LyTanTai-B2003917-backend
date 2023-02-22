const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
    }

    extractUserData(payload) {
        const user = {
            username: payload.username,
            password: bcrypt.hashSync(payload.password, 8)
        }
        return user;
    }

    async getUser(_username) {
        return await this.User.findOne({
            username: _username,
        });
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.insertOne(user);
        return result;
    }

    async updateRefreshToken(_username, _refreshToken) {
        try {
            const user = this.getUser(_username);
            await this.User.findOneAndUpdate(
                user,
                { $set: { refreshToken: _refreshToken } },
                { returnDocument: "after", upsert: true}
            );
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = UserService;