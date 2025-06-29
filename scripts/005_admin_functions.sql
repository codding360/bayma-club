-- Function to get booking statistics (admin only)
CREATE OR REPLACE FUNCTION public.get_booking_stats(
  start_date DATE DEFAULT NULL,
  end_date DATE DEFAULT NULL
)
RETURNS TABLE (
  total_bookings BIGINT,
  confirmed_bookings BIGINT,
  pending_bookings BIGINT,
  cancelled_bookings BIGINT,
  total_revenue DECIMAL,
  average_booking_value DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_bookings,
    COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_bookings,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_bookings,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_bookings,
    COALESCE(SUM(total_amount) FILTER (WHERE status = 'confirmed'), 0) as total_revenue,
    COALESCE(AVG(total_amount) FILTER (WHERE status = 'confirmed'), 0) as average_booking_value
  FROM public.bookings
  WHERE 
    (start_date IS NULL OR booking_date >= start_date) AND
    (end_date IS NULL OR booking_date <= end_date);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get tour popularity statistics
CREATE OR REPLACE FUNCTION public.get_tour_popularity()
RETURNS TABLE (
  tour_id UUID,
  tour_title TEXT,
  total_bookings BIGINT,
  total_participants BIGINT,
  total_revenue DECIMAL,
  occupancy_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id as tour_id,
    t.title as tour_title,
    COUNT(b.id) as total_bookings,
    COALESCE(SUM(b.participants), 0) as total_participants,
    COALESCE(SUM(b.total_amount) FILTER (WHERE b.status = 'confirmed'), 0) as total_revenue,
    CASE 
      WHEN t.max_participants > 0 THEN 
        (COALESCE(SUM(b.participants), 0)::DECIMAL / t.max_participants) * 100
      ELSE 0 
    END as occupancy_rate
  FROM public.tours t
  LEFT JOIN public.bookings b ON t.id = b.tour_id
  GROUP BY t.id, t.title, t.max_participants
  ORDER BY total_bookings DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old data (admin maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_old_data(
  days_old INTEGER DEFAULT 365
)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Delete old cancelled bookings
  DELETE FROM public.bookings 
  WHERE status = 'cancelled' 
    AND created_at < NOW() - INTERVAL '1 day' * days_old;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Delete old failed payments
  DELETE FROM public.payments 
  WHERE status = 'failed' 
    AND created_at < NOW() - INTERVAL '1 day' * days_old;
  
  GET DIAGNOSTICS deleted_count = deleted_count + ROW_COUNT;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
