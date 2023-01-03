const User = require('./user');
const Carte = require('./carte');
const Recipe = require('./recipe');
const Category = require('./category');
const Section = require('./section');

// Carte <> User - 1 to many
Carte.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

User.hasMany(Carte, {
    foreignKey: "user_id",
    as: "cartes"
});

// Carte <> Category - Many to many
Carte.belongsToMany(Category, {
    as: "categories", 
    through: 'carte_has_category',
    foreignKey: 'carte_id',
    otherKey: 'category_id',
});

Category.belongsToMany(Carte, {
    as: "carteList",
    through: 'carte_has_category',
    otherKey: 'carte_id',
    foreignKey: 'category_id',
});

// Recipe <> Section - 1 to many
Recipe.belongsTo(Section, {
    foreignKey: "section_id",
    as: "section"
});

Section.hasMany(Recipe, {
    foreignKey: "section_id",
    as: "recipes"
});

// Section <> Category - 1 to many
Section.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category"
});

Category.hasMany(Section, {
    foreignKey: "category_id",
    as: "sections"
});

module.exports = { User, Carte, Recipe, Section, Category };
