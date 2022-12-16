BEGIN;

INSERT INTO "role" (name) VALUES
('admin'),
('editor');

INSERT INTO "user" (name, email, password, role_id, created_at, updated_at) VALUES
('admin', 'admin@mail.com', '$2b$10$6ibZbDSJZXrd7vQkTuMRqePvD3vfgeh8iFtvog8Cr6V8rGej5cfDi', 1, now(), now());

INSERT INTO "family" (name) VALUES
('Entrées'),
('Plats'),
('Desserts'),
('Boissons'),
('Vins'),
('Digestifs'),
('Menus');

INSERT INTO "category" (name, description, family_id) VALUES
('Pour vous mettre en appétit', null, 1),
('Nos salades repas', null, 2),
('Nos choucroutes', 'Notre charcuterie provient de la maison « Kirn »', 2);

INSERT INTO "recipe" (name, description, price, category_id) VALUES
('Salade Périgourdine', null, 22, 2),
('Poêlée d\’encornets persillés', null, 16.50, 1);

INSERT INTO "carte" (name, user_id) VALUES
('Carte test', 1);

INSERT INTO "carte_has_recipe" (carte_id, recipe_id) VALUES
(1, 1),
(1,2);

COMMIT;