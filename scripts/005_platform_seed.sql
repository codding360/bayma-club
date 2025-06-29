-- Insert tour categories
INSERT INTO tour_categories (name, description) VALUES
('Круизы по Средиземному морю', 'Роскошные круизы по красивейшим портам Средиземноморья'),
('Северные круизы', 'Путешествия к фьордам Норвегии и красотам Скандинавии'),
('Карибские круизы', 'Тропические острова и белоснежные пляжи Карибского моря'),
('Трансатлантические круизы', 'Классические океанские переходы между континентами'),
('Речные круизы', 'Уютные путешествия по рекам Европы и России')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tours
INSERT INTO tours (title, description, price, duration, category_id, max_participants, start_date, end_date, is_active) 
SELECT 
  'Средиземноморская одиссея',
  'Незабываемое путешествие по портам Италии, Франции и Испании с посещением исторических достопримечательностей',
  89999.00,
  7,
  (SELECT id FROM tour_categories WHERE name = 'Круизы по Средиземному морю'),
  200,
  '2024-06-15',
  '2024-06-22',
  true
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Средиземноморская одиссея');

INSERT INTO tours (title, description, price, duration, category_id, max_participants, start_date, end_date, is_active)
SELECT
  'Норвежские фьорды',
  'Величественные пейзажи норвежских фьордов и северное сияние',
  125999.00,
  10,
  (SELECT id FROM tour_categories WHERE name = 'Северные круизы'),
  150,
  '2024-07-01',
  '2024-07-11',
  true
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Норвежские фьорды');

INSERT INTO tours (title, description, price, duration, category_id, max_participants, start_date, end_date, is_active)
SELECT
  'Карибский рай',
  'Тропические острова, кристально чистая вода и белоснежные пляжи',
  95999.00,
  8,
  (SELECT id FROM tour_categories WHERE name = 'Карибские круизы'),
  180,
  '2024-08-10',
  '2024-08-18',
  true
WHERE NOT EXISTS (SELECT 1 FROM tours WHERE title = 'Карибский рай');
