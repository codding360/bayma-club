-- Function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update tour participant count
CREATE OR REPLACE FUNCTION update_tour_participants()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Add participants when booking is confirmed
    IF NEW.status = 'confirmed' THEN
      UPDATE tours 
      SET current_participants = current_participants + NEW.participants
      WHERE id = NEW.tour_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle status changes
    IF OLD.status != NEW.status THEN
      IF OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
        -- Remove participants when booking is no longer confirmed
        UPDATE tours 
        SET current_participants = current_participants - OLD.participants
        WHERE id = OLD.tour_id;
      ELSIF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
        -- Add participants when booking becomes confirmed
        UPDATE tours 
        SET current_participants = current_participants + NEW.participants
        WHERE id = NEW.tour_id;
      END IF;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Remove participants when confirmed booking is deleted
    IF OLD.status = 'confirmed' THEN
      UPDATE tours 
      SET current_participants = current_participants - OLD.participants
      WHERE id = OLD.tour_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for tour participant updates
CREATE TRIGGER booking_participant_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_tour_participants();

-- Function to calculate booking total
CREATE OR REPLACE FUNCTION calculate_booking_total()
RETURNS TRIGGER AS $$
BEGIN
  SELECT price INTO NEW.total_amount
  FROM tours
  WHERE id = NEW.tour_id;
  
  NEW.total_amount = NEW.total_amount * NEW.participants;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate booking total
CREATE TRIGGER calculate_booking_total_trigger
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION calculate_booking_total();

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id UUID,
  p_title VARCHAR(255),
  p_message TEXT,
  p_type VARCHAR(50) DEFAULT 'info'
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO notifications (user_id, title, message, type)
  VALUES (p_user_id, p_title, p_message, p_type)
  RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
