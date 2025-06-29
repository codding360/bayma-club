-- Insert tour categories
INSERT INTO tour_categories (name, description) VALUES
('Средиземноморье', 'Круизы по Средиземному морю'),
('Карибы', 'Круизы по Карибским островам'),
('Северная Европа', 'Круизы по Северной Европе и фьордам'),
('Балтика', 'Круизы по Балтийскому морю')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tours
INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants)
SELECT 
  'Средиземноморский круиз',
  'Незабываемое путешествие по Средиземному морю с посещением Италии, Франции и Испании',
  4500000, -- 45000 rubles in kopecks
  7,
  (SELECT id FROM tour_categories WHERE name = 'Средиземноморье'),
  'Средиземное море',
  NOW() + INTERVAL '30 days',
  NOW() + INTERVAL '37 days',
  200
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Средиземноморский круиз');

INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants)
SELECT 
  'Карибский круиз',
  'Тропическое приключение по Карибским островам',
  7800000, -- 78000 rubles in kopecks
  10,
  (SELECT id FROM tour_categories WHERE name = 'Карибы'),
  'Карибские острова',
  NOW() + INTERVAL '45 days',
  NOW() + INTERVAL '55 days',
  150
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Карибский круиз');

INSERT INTO tours (title, description, price, duration, category_id, destination, start_date, end_date, max_participants)
SELECT 
  'Норвежские фьорды',
  'Величественные пейзажи Норвегии и северной природы',
  5200000, -- 52000 rubles in kopecks
  8,
  (SELECT id FROM tour_categories WHERE name = 'Северная Европа'),
  'Норвежские фьорды',
  NOW() + INTERVAL '60 days',
  NOW() + INTERVAL '68 days',
  180
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Норвежские фьорды');
