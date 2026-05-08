INSERT INTO users (name, email, password, role) VALUES
    ('Admin UrbanoPlus',  'admin@urbanoplus.com',  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'ADMIN'),
    ('João Silva',        'joao@email.com',        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
    ('Maria Souza',       'maria@email.com',       '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
    ('Carlos Oliveira',   'carlos@email.com',      '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER'),
    ('Ana Paula',         'ana@email.com',         '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXhOoAVS2', 'USER');

INSERT INTO occurrences (
    title, description, category, latitude, longitude, radius,
    status, rejection_reason, created_at, approved_at, expires_at, user_id
) VALUES
(
    'Buraco na Av. Dr. Jayme Quagliato',
    'Buraco grande no meio da pista, risco de acidente para motociclistas.',
    'POTHOLE', -22.9755, -49.8720, 80.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours', NOW() + INTERVAL '20 hours', 2
),
(
    'Alagamento na Rua Barão do Rio Branco',
    'Rua completamente alagada após chuva forte, carros presos.',
    'FLOOD', -22.9801, -49.8670, 150.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 3
),
(
    'Semáforo quebrado na Av. Mato Grosso',
    'Semáforo apagado no cruzamento, causando confusão no trânsito.',
    'BROKEN_TRAFFIC_LIGHT', -22.9812, -49.8695, 50.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours', NOW() + INTERVAL '19 hours', 4
),
(
    'Lixo acumulado na Rua Santos Dumont',
    'Descarte irregular de lixo na esquina, mau cheiro e risco sanitário.',
    'GARBAGE_DUMPING', -22.9770, -49.8650, 60.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '8 hours', NOW() - INTERVAL '7 hours', NOW() + INTERVAL '16 hours', 5
),
(
    'Acidente de trânsito na Av. Getúlio Vargas',
    'Colisão entre dois carros, uma faixa bloqueada.',
    'ACCIDENT', -22.9740, -49.8710, 100.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '23 hours', 2
),
(
    'Iluminação pública apagada na Rua XV de Novembro',
    'Trecho de 200m sem luz à noite, inseguro para pedestres.',
    'BROKEN_STREET_LIGHT', -22.9825, -49.8680, 200.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '10 hours', NOW() - INTERVAL '9 hours', NOW() + INTERVAL '14 hours', 3
),
(
    'Árvore caída na Rua Floriano Peixoto',
    'Árvore caiu sobre a calçada após temporal, bloqueando passagem.',
    'FALLEN_TREE', -22.9790, -49.8730, 30.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 4
),
(
    'Esgoto a céu aberto na Vila Rezende',
    'Vazamento de esgoto na rua, cheiro forte e risco de contaminação.',
    'SEWAGE_LEAK', -22.9760, -49.8660, 90.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '12 hours', NOW() - INTERVAL '11 hours', NOW() + INTERVAL '12 hours', 5
),
(
    'Vandalismo no Parque Municipal',
    'Bancos e lixeiras depredados, pichações nas paredes.',
    'VANDALISM', -22.9835, -49.8700, 120.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '7 hours', NOW() - INTERVAL '6 hours', NOW() + INTERVAL '17 hours', 2
),
(
    'Incêndio em terreno baldio na Rua Paraná',
    'Fogo em terreno com mato alto, fumaça intensa.',
    'FIRE', -22.9748, -49.8740, 200.0,
    'APPROVED', NULL,
    NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', NOW() + INTERVAL '23 hours', 3
),
(
    'Via interditada na Rua Minas Gerais',
    'Obras sem sinalização adequada bloqueando a via.',
    'ROAD_CLOSED', -22.9780, -49.8715, 70.0,
    'PENDING', NULL,
    NOW() - INTERVAL '1 hour', NULL, NULL, 4
),
(
    'Calçada destruída na Rua Goiás',
    'Calçada completamente quebrada, difícil acesso para cadeirantes.',
    'BROKEN_SIDEWALK', -22.9815, -49.8665, 50.0,
    'PENDING', NULL,
    NOW() - INTERVAL '2 hours', NULL, NULL, 5
),
(
    'Barulho excessivo no bairro Aeroporto',
    'Festa com som alto após meia-noite há 3 dias consecutivos.',
    'NOISE_COMPLAINT', -22.9850, -49.8720, 100.0,
    'PENDING', NULL,
    NOW() - INTERVAL '30 minutes', NULL, NULL, 2
),
(
    'Carro mal estacionado na Rua Souza',
    'Carro na calçada.',
    'OTHER', -22.9765, -49.8685, 20.0,
    'REJECTED', 'Ocorrência fora do escopo do sistema. Contate a EMDURB.',
    NOW() - INTERVAL '2 days', NULL, NULL, 3
),
(
    'Fotos duplicadas de acidente',
    'Mesmo acidente já reportado por outro usuário.',
    'ACCIDENT', -22.9740, -49.8710, 100.0,
    'REJECTED', 'Ocorrência duplicada. Já existe um registro ativo para este local.',
    NOW() - INTERVAL '1 day', NULL, NULL, 4
),
(
    'Alagamento resolvido na Rua Bahia',
    'Alagamento após chuva de ontem.',
    'FLOOD', -22.9795, -49.8655, 130.0,
    'EXPIRED', NULL,
    NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '1 hour', NOW() - INTERVAL '1 day', 5
),
(
    'Buraco tapado na Av. Brasil',
    'Buraco que foi corrigido pela prefeitura.',
    'POTHOLE', -22.9820, -49.8705, 60.0,
    'EXPIRED', NULL,
    NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '2 hours', NOW() - INTERVAL '2 days', 2
);

INSERT INTO comments (text, occurrence_id, user_id, created_at) VALUES
    ('Confirmo! Quase bati minha moto nesse buraco hoje cedo.', 1, 3, NOW() - INTERVAL '3 hours'),
    ('A prefeitura já foi avisada?', 1, 4, NOW() - INTERVAL '2 hours'),
    ('Minha rua está igual, situação crítica.', 2, 2, NOW() - INTERVAL '1 hour'),
    ('O semáforo estava assim desde ontem também.', 3, 5, NOW() - INTERVAL '4 hours'),
    ('Já liguei pro 156, disseram que vão verificar.', 4, 3, NOW() - INTERVAL '6 hours'),
    ('Tomara que apaguem logo, fumaça chegou até minha casa.', 10, 4, NOW() - INTERVAL '20 minutes');