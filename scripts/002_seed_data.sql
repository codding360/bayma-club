-- Insert tour categories
INSERT INTO public.tour_categories (name, description) VALUES
  ('Городские туры', 'Экскурсии по историческим центрам городов'),
  ('Природные маршруты', 'Походы и экскурсии на природе'),
  ('Культурные туры', 'Посещение музеев, театров и культурных объектов'),
  ('Приключенческие туры', 'Активный отдых и экстремальные виды спорта'),
  ('Гастрономические туры', 'Дегустации и кулинарные мастер-классы')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tours
INSERT INTO public.tours (title, description, price, duration_days, max_participants, category_id, location) VALUES
  (
    'Обзорная экскурсия по Москве',
    'Знакомство с основными достопримечательностями столицы',
    2500.00,
    1,
    20,
    (SELECT id FROM public.tour_categories WHERE name = 'Городские туры'),
    'Москва'
  ),
  (
    'Поход в Карелию',
    'Трехдневный поход по живописным местам Карелии',
    15000.00,
    3,
    12,
    (SELECT id FROM public.tour_categories WHERE name = 'Природные маршруты'),
    'Карелия'
  ),
  (
    'Тур по Эрмитажу',
    'Подробная экскурсия по залам Эрмитажа с гидом',
    3500.00,
    1,
    15,
    (SELECT id FROM public.tour_categories WHERE name = 'Культурные туры'),
    'Санкт-Петербург'
  ),
  (
    'Рафтинг по Алтаю',
    'Сплав по горной реке с инструктором',
    25000.00,
    5,
    8,
    (SELECT id FROM public.tour_categories WHERE name = 'Приключенческие туры'),
    'Алтай'
  ),
  (
    'Дегустация вин в Краснодарском крае',
    'Посещение виноделен с дегустацией местных вин',
    8000.00,
    2,
    10,
    (SELECT id FROM public.tour_categories WHERE name = 'Гастрономические туры'),
    'Краснодарский край'
  );
