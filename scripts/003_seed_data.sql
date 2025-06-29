-- Insert tour categories
INSERT INTO tour_categories (name, description) VALUES
('Средиземноморье', 'Круизы по Средиземному морю'),
('Карибы', 'Карибские круизы'),
('Северная Европа', 'Круизы по Северной Европе'),
('Азия', 'Азиатские круизы')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tours
INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants, image_url) 
SELECT 
    'Круиз по Средиземному морю',
    'Незабываемое путешествие по самым красивым портам Средиземноморья',
    4500000, -- 45000 rubles in cents
    7,
    (SELECT id FROM tour_categories WHERE name = 'Средиземноморье'),
    'Барселона - Рим - Неаполь',
    NOW() + INTERVAL '30 days',
    NOW() + INTERVAL '37 days',
    200,
    '/placeholder.jpg'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Круиз по Средиземному морю');

INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants, image_url)
SELECT 
    'Карибский круиз',
    'Тропический рай ждет вас в Карибском море',
    7800000, -- 78000 rubles in cents
    10,
    (SELECT id FROM tour_categories WHERE name = 'Карибы'),
    'Майами - Багамы - Ямайка',
    NOW() + INTERVAL '45 days',
    NOW() + INTERVAL '55 days',
    300,
    '/placeholder.jpg'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Карибский круиз');

INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants, image_url)
SELECT 
    'Северные фьорды',
    'Величественные фьорды Норвегии',
    5600000, -- 56000 rubles in cents
    8,
    (SELECT id FROM tour_categories WHERE name = 'Северная Европа'),
    'Берген - Гейрангер - Тромсё',
    NOW() + INTERVAL '60 days',
    NOW() + INTERVAL '68 days',
    150,
    '/placeholder.jpg'
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Северные фьорды');
