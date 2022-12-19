const User = require('./user');
const Carte = require('./carte');
const Recipe = require('./recipe');
const Category = require('./category');
const Family = require('./family');

// Carte <> User - 1 to many
Carte.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

User.hasMany(Carte, {
    foreignKey: "user_id",
    as: "cartes"
});

// Carte <> Recipe - Many to many
Carte.belongsToMany(Recipe, {
    as: "recipes", 
    through: 'carte_has_recipe',
    foreignKey: 'carte_id',
    otherKey: 'recipe_id',
});

Recipe.belongsToMany(Carte, {
    as: "carteList",
    through: 'carte_has_recipe',
    otherKey: 'carte_id',
    foreignKey: 'recipe_id',
});

// Recipe <> Category - 1 to many
Recipe.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category"
});

Category.hasMany(Recipe, {
    foreignKey: "category_id",
    as: "recipes"
});

// Category <> Family - 1 to many
Category.belongsTo(Family, {
    foreignKey: "family_id",
    as: "family"
});

Family.hasMany(Category, {
    foreignKey: "family_id",
    as: "categories"
});

module.exports = { User, Carte, Recipe, Family, Category };
