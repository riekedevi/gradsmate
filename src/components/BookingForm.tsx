import { FormEvent, useMemo, useState } from 'react';
import { CalendarDays, Check, Clock3, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type BookingFormValues = {
  graduateName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  needs: string;
};

const initialValues: BookingFormValues = {
  graduateName: '',
  bookingDate: '',
  startTime: '',
  endTime: '',
  needs: '',
};

function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${today.getFullYear()}-${month}-${day}`;
}

export function BookingForm() {
  const [values, setValues] = useState<BookingFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dayLabel = useMemo(() => {
    if (!values.bookingDate) return '';
    return new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${values.bookingDate}T00:00:00`));
  }, [values.bookingDate]);

  const updateValue = (field: keyof BookingFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (values.endTime <= values.startTime) {
      setErrorMessage('Jam selesai harus lebih akhir dari jam mulai.');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('booking_requests').insert({
      graduate_name: values.graduateName.trim(),
      booking_date: values.bookingDate,
      start_time: values.startTime,
      end_time: values.endTime,
      needs: values.needs.trim(),
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage('Pengajuan belum terkirim. Silakan coba lagi.');
      return;
    }

    setValues(initialValues);
    setSubmitted(true);
  };

  return (
    <section className="booking-section section-padding" id="booking">
      <div className="content-width booking-grid">
        <div className="booking-intro reveal-fade">
          <p className="section-kicker">Mulai dari sini</p>
          <h2>Siap punya teman<br /><span>di hari istimewa?</span></h2>
          <p>Ceritakan detail wisudamu. Kami akan menghubungi kamu untuk memastikan kebutuhan pendampingan yang paling sesuai.</p>
          <div className="booking-points">
            <span><Check size={16} /> Tidak ada biaya konsultasi</span>
            <span><Check size={16} /> Jadwal disesuaikan kebutuhanmu</span>
            <span><Check size={16} /> Data pengajuan tetap aman</span>
          </div>
        </div>

        <form className="booking-form reveal-fade" onSubmit={handleSubmit}>
          <div className="form-heading"><span className="form-icon"><CalendarDays size={21} /></span><div><p className="section-kicker">Form booking</p><h3>Rencanakan pendampinganmu</h3></div></div>
          <label className="form-field"><span>Nama wisudawan</span><input type="text" value={values.graduateName} onChange={(event) => updateValue('graduateName', event.target.value)} placeholder="Tulis nama lengkap" minLength={2} maxLength={120} required /></label>
          <div className="form-field"><span>Tanggal wisuda</span><div className="date-field"><CalendarDays size={18} /><input type="date" value={values.bookingDate} min={getToday()} onChange={(event) => updateValue('bookingDate', event.target.value)} required /></div>{dayLabel && <small className="day-preview">{dayLabel}</small>}</div>
          <div className="form-row"><label className="form-field"><span>Mulai jam berapa</span><div className="time-field"><Clock3 size={17} /><input type="time" value={values.startTime} onChange={(event) => updateValue('startTime', event.target.value)} required /></div></label><label className="form-field"><span>Berakhir jam berapa</span><div className="time-field"><Clock3 size={17} /><input type="time" value={values.endTime} onChange={(event) => updateValue('endTime', event.target.value)} required /></div></label></div>
          <label className="form-field"><span>Kebutuhan teman wisuda</span><textarea value={values.needs} onChange={(event) => updateValue('needs', event.target.value)} placeholder="Contoh: bantu ambil foto dengan HP saya, bawakan buket, dan temani sampai sesi foto keluarga..." minLength={10} maxLength={2000} rows={4} required /></label>
          {errorMessage && <p className="form-message form-error" role="alert">{errorMessage}</p>}
          {submitted && <p className="form-message form-success" role="status">Pengajuan booking berhasil dikirim. Kami akan segera menghubungimu.</p>}
          <button className="button button-primary form-submit" type="submit" disabled={submitting}>{submitting ? 'Mengirim pengajuan...' : 'Kirim pengajuan'}<Send size={17} /></button>
        </form>
      </div>
    </section>
  );
}
