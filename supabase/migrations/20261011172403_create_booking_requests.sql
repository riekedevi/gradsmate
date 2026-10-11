/*
# Create booking requests table

1. New Tables
- `booking_requests`
- `id` (uuid, primary key): Unique identifier for each booking request.
- `graduate_name` (text, not null): Name of the graduating customer.
- `booking_date` (date, not null): Requested graduation or assistance date.
- `start_time` (time, not null): Requested start time.
- `end_time` (time, not null): Requested end time.
- `needs` (text, not null): Description of the requested graduation companion support.
- `created_at` (timestamptz): Time the request was submitted.

2. Security
- Enable row level security on `booking_requests`.
- Allow anonymous visitors to submit booking requests.
- Do not expose submitted personal details to anonymous visitors through read, update, or delete policies.
- Authenticated access is also denied by default; administrative access can use the service role outside the public client.

3. Important Notes
- This landing page does not include sign-in, so booking submissions are accepted from the anonymous browser role.
- The public form only creates new requests and does not read back submitted booking details.
*/

CREATE TABLE IF NOT EXISTS public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  graduate_name text NOT NULL CHECK (char_length(trim(graduate_name)) BETWEEN 2 AND 120),
  booking_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  needs text NOT NULL CHECK (char_length(trim(needs)) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT booking_requests_valid_time_range CHECK (end_time > start_time)
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can submit booking requests" ON public.booking_requests;
CREATE POLICY "Public can submit booking requests"
ON public.booking_requests FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(graduate_name)) BETWEEN 2 AND 120
  AND char_length(trim(needs)) BETWEEN 10 AND 2000
  AND end_time > start_time
);

DROP POLICY IF EXISTS "Booking requests are not publicly readable" ON public.booking_requests;
CREATE POLICY "Booking requests are not publicly readable"
ON public.booking_requests FOR SELECT
TO anon, authenticated
USING (false);

DROP POLICY IF EXISTS "Booking requests cannot be publicly updated" ON public.booking_requests;
CREATE POLICY "Booking requests cannot be publicly updated"
ON public.booking_requests FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Booking requests cannot be publicly deleted" ON public.booking_requests;
CREATE POLICY "Booking requests cannot be publicly deleted"
ON public.booking_requests FOR DELETE
TO anon, authenticated
USING (false);
