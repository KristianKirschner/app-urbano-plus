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

('Acidente na Av. Getúlio Vargas',
 'Colisão entre veículos causando bloqueio parcial da via.',
 'TRAFFIC', -22.9740, -49.8710, 100.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '1 hour', NOW() - INTERVAL '30 minutes', NOW() + INTERVAL '23 hours', 2),

('Semáforo com defeito no centro',
 'Semáforo apagado gerando confusão no cruzamento.',
 'TRAFFIC', -22.9812, -49.8695, 50.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '6 hours', NOW() - INTERVAL '5 hours', NOW() + INTERVAL '19 hours', 4),

('Rua interditada por obras',
 'Obras sem sinalização adequada bloqueando o trânsito.',
 'TRAFFIC', -22.9780, -49.8715, 70.0,
 'PENDING', NULL,
 NOW() - INTERVAL '1 hour', NULL, NULL, 4),

('Buraco na Av. Dr. Jayme Quagliato',
 'Buraco grande oferecendo risco a motociclistas.',
 'INFRASTRUCTURE', -22.9755, -49.8720, 80.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '5 hours', NOW() - INTERVAL '4 hours', NOW() + INTERVAL '20 hours', 2),

('Calçada danificada na Rua Goiás',
 'Calçada destruída dificultando acessibilidade.',
 'INFRASTRUCTURE', -22.9815, -49.8665, 50.0,
 'PENDING', NULL,
 NOW() - INTERVAL '2 hours', NULL, NULL, 5),

('Iluminação pública apagada',
 'Rua sem iluminação causando insegurança.',
 'INFRASTRUCTURE', -22.9825, -49.8680, 200.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '10 hours', NOW() - INTERVAL '9 hours', NOW() + INTERVAL '14 hours', 3),

('Alagamento na Rua Barão do Rio Branco',
 'Rua alagada após forte chuva.',
 'SANITATION', -22.9801, -49.8670, 150.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours', NOW() + INTERVAL '22 hours', 3),

('Esgoto a céu aberto',
 'Vazamento de esgoto com risco sanitário.',
 'SANITATION', -22.9760, -49.8660, 90.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '12 hours', NOW() - INTERVAL '11 hours', NOW() + INTERVAL '12 hours', 5),

('Lixo acumulado na via pública',
 'Descarte irregular de lixo gerando mau cheiro.',
 'SANITATION', -22.9770, -49.8650, 60.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '8 hours', NOW() - INTERVAL '7 hours', NOW() + INTERVAL '16 hours', 5),

('Vandalismo no parque municipal',
 'Bancos e estruturas danificadas.',
 'SECURITY', -22.9835, -49.8700, 120.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '7 hours', NOW() - INTERVAL '6 hours', NOW() + INTERVAL '17 hours', 2),

('Pessoa suspeita no bairro Aeroporto',
 'Relatos de comportamento suspeito na região.',
 'SECURITY', -22.9850, -49.8720, 100.0,
 'PENDING', NULL,
 NOW() - INTERVAL '30 minutes', NULL, NULL, 2),

('Possível atividade criminosa',
 'Movimentação suspeita em área residencial.',
 'SECURITY', -22.9748, -49.8740, 200.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', NOW() + INTERVAL '23 hours', 3),

('Árvore caída após temporal',
 'Árvore bloqueando a calçada.',
 'ENVIRONMENT', -22.9790, -49.8730, 30.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '23 hours', 4),

('Incêndio em terreno baldio',
 'Fogo com grande emissão de fumaça.',
 'ENVIRONMENT', -22.9748, -49.8740, 200.0,
 'APPROVED', NULL,
 NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '15 minutes', NOW() + INTERVAL '23 hours', 3),

('Queimada irregular',
 'Fumaça e risco ambiental na região.',
 'ENVIRONMENT', -22.9795, -49.8655, 130.0,
 'EXPIRED', NULL,
 NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '1 hour', NOW() - INTERVAL '1 day', 5),

('Barulho excessivo no bairro',
 'Som alto durante a madrugada.',
 'OTHER', -22.9850, -49.8720, 100.0,
 'PENDING', NULL,
 NOW() - INTERVAL '30 minutes', NULL, NULL, 2),

('Ocorrência fora do escopo',
 'Solicitação não relacionada ao sistema.',
 'OTHER', -22.9765, -49.8685, 20.0,
 'REJECTED', 'Fora do escopo do sistema.',
 NOW() - INTERVAL '2 days', NULL, NULL, 3),

('Buraco corrigido pela prefeitura',
 'Problema resolvido em manutenção.',
 'INFRASTRUCTURE', -22.9820, -49.8705, 60.0,
 'EXPIRED', NULL,
 NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '2 hours', NOW() - INTERVAL '2 days', 2);

INSERT INTO comments (text, occurrence_id, user_id, created_at) VALUES
('Confirmo, quase bati aqui.', 1, 3, NOW() - INTERVAL '3 hours'),
('Situação perigosa mesmo.', 1, 4, NOW() - INTERVAL '2 hours'),
('Aqui perto está igual.', 2, 2, NOW() - INTERVAL '1 hour'),
('Problema recorrente nessa região.', 3, 5, NOW() - INTERVAL '4 hours'),
('Prefeitura precisa agir rápido.', 4, 3, NOW() - INTERVAL '6 hours'),
('Fumaça chegou até minha casa.', 12, 4, NOW() - INTERVAL '20 minutes');