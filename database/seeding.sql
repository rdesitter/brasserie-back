BEGIN;

INSERT INTO "user" (name, email, password, admin, active, created_at, updated_at) VALUES
('Super admin', 'admin@mail.com', '$2b$10$6ibZbDSJZXrd7vQkTuMRqePvD3vfgeh8iFtvog8Cr6V8rGej5cfDi', true, true, now(), now());

INSERT INTO "category" (name) VALUES
('Entrées'),
('Plats'),
('Desserts'),
('Boissons'),
('Vins'),
('Digestifs'),
('Menus');

INSERT INTO "section" (name, description, category_id) VALUES
('Pour vous mettre en appétit', null, 1),
('Nos salades repas', null, 2),
('Nos choucroutes', 'Notre charcuterie provient de la maison « Kirn »', 2);

INSERT INTO "recipe" (name, description, price, section_id) VALUES
('Salade Périgourdine', null, 22, 2),
('Salade César au poulet croustillant', null, 17, 2),
('Poêlée d’encornets persillés', null, 16.50, 1),
('Choucroute de Poissons', 'Choucroute, dés de saumon fumé, assortiment de poissons selon arrivage, pommes vapeur, beurre blanc', 28, 3),
('Choucroute Alsacienne', 'Choucroute, francfort, strasbourg,cervelas, poitrine fumée, saucisse fumée, pommes vapeur', 27, 3);

INSERT INTO "carte" (name, user_id, active) VALUES
('Carte test', 1, true);

INSERT INTO "carte_has_category" (carte_id, category_id) VALUES
(1, 1),
(1,2);

COMMIT;