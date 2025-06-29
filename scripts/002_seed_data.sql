-- Insert tour categories
INSERT INTO tour_categories (name, slug, description) VALUES
('Средиземноморье', 'mediterranean', 'Круизы по Средиземному морю'),
('Карибы', 'caribbean', 'Карибские круизы'),
('Северные моря', 'northern', 'Круизы по северным морям'),
('Балтика', 'baltic', 'Балтийские круизы')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample tours
INSERT INTO tours (title, description, price, duration_days, category_id, image_url) VALUES
(
  'Средиземноморский круиз',
  'Незабываемое путешествие по Средиземному морю с посещением Италии, Франции и Испании',
  45000.00,
  7,
  (SELECT id FROM tour_categories WHERE slug = 'mediterranean'),
  '/placeholder.jpg'
),
(
  'Карибский круиз',
  'Тропический рай с белоснежными пляжами и кристально чистой водой',
  78000.00,
  10,
  (SELECT id FROM tour_categories WHERE slug = 'caribbean'),
  '/placeholder.jpg'
),
(
  'Норвежские фьорды',
  'Величественные фьорды Норвегии и северное сияние',
  65000.00,
  8,
  (SELECT id FROM tour_categories WHERE slug = 'northern'),
  '/placeholder.jpg'
),
(
  'Балтийские столицы',
  'Посещение Стокгольма, Хельсинки и Таллина',
  52000.00,
  6,
  (SELECT id FROM tour_categories WHERE slug = 'baltic'),
  '/placeholder.jpg'
)
ON CONFLICT DO NOTHING;
