-- Insert default tour categories
INSERT INTO public.tour_categories (name, description) VALUES
  ('Средиземноморье', 'Круизы по Средиземному морю'),
  ('Карибы', 'Тропические круизы по Карибским островам'),
  ('Северная Европа', 'Круизы по фьордам и северным морям'),
  ('Балтийское море', 'Круизы по Балтийскому морю'),
  ('Азия', 'Круизы по азиатским направлениям'),
  ('Трансатлантические', 'Длительные океанские переходы')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tours (you can modify these as needed)
INSERT INTO public.tours (
  title, 
  description, 
  price, 
  duration, 
  category_id, 
  destination, 
  start_date, 
  end_date, 
  max_participants
) VALUES
  (
    'Средиземноморский круиз',
    'Откройте для себя красоты Средиземного моря. Посетите Барселону, Рим, Неаполь и Марсель.',
    45000,
    7,
    (SELECT id FROM public.tour_categories WHERE name = 'Средиземноморье' LIMIT 1),
    'Барселона, Рим, Неаполь, Марсель',
    '2024-06-15',
    '2024-06-22',
    2000
  ),
  (
    'Карибский круиз',
    'Тропический рай ждет вас. Насладитесь солнцем и морем на Карибских островах.',
    78000,
    10,
    (SELECT id FROM public.tour_categories WHERE name = 'Карибы' LIMIT 1),
    'Майами, Ямайка, Багамы, Мексика',
    '2024-07-01',
    '2024-07-11',
    3000
  ),
  (
    'Норвежские фьорды',
    'Величественная природа Норвегии. Незабываемые пейзажи и северное сияние.',
    89000,
    12,
    (SELECT id FROM public.tour_categories WHERE name = 'Северная Европа' LIMIT 1),
    'Берген, Гейрангер, Флом, Ставангер',
    '2024-08-15',
    '2024-08-27',
    1500
  ),
  (
    'Балтийские столицы',
    'Познакомьтесь с культурой и историей северных столиц.',
    65000,
    9,
    (SELECT id FROM public.tour_categories WHERE name = 'Балтийское море' LIMIT 1),
    'Стокгольм, Хельсинки, Таллин, Рига',
    '2024-09-01',
    '2024-09-10',
    2500
  )
ON CONFLICT DO NOTHING;
