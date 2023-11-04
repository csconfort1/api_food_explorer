const {hash, compare} = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const sqliteConnection = require("../database/sqlite");

class UsersController{
    async create(request, response){
        const {name, email, password} = request.body;

        const database = await sqliteConnection();
        
        const checkUserExists = await knex.select('email').where({email}).from('users');

        if(checkUserExists.length>0){
            throw new AppError ("Este email já está sendo utilizado!");    
        };

        const hashedPassword = await hash(password, 8);

        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
            admin: false
          });

        return response.status(201).json();
    }

    async update(request, response){
        const{name, email, password, old_password} = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await knex.get('id').where({id}).from('users');
        
        if(!user){
            throw new AppError("Usuário não encontrado!");
        }

        const userWithUpdatedEmail = await knex.select('email').where({email}).from('users');

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está sendo utilizado!");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Favor informar a senha antiga para definir uma nova senha");
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now'),
            WHERE id = ?`,
            [user.name, user.email, user.password, use_id]
            );

            return response.json();
    }
}

module.exports = UsersController;