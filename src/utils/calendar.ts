interface CalendarEvent {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export const generateCalendarEvent = (eventType: 'ceremony' | 'reception'): CalendarEvent => {
  const baseDate = '2026-02-06'; // Friday 6th February 2026

  if (eventType === 'ceremony') {
    return {
      title: 'Joel & Stephanie Wedding Ceremony',
      startDate: `${baseDate}T12:30:00`,
      endDate: `${baseDate}T13:30:00`,
      location: "Saint Brigid's Catholic Church, 392 Marrickville Rd, Marrickville NSW 2204",
      description: 'Join us for our wedding ceremony at Saint Brigid\'s Catholic Church. Please arrive at least 30 minutes early.'
    };
  } else {
    return {
      title: 'Joel & Stephanie Wedding Reception',
      startDate: `${baseDate}T18:00:00`,
      endDate: `${baseDate}T23:30:00`,
      location: 'The Sky Ballroom, Level 3/462 Chapel Rd, Bankstown NSW 2200',
      description: '6:00pm - 11:30pm. Celebrate with us! Dinner, dancing, and drinks at The Sky Ballroom.'
    };
  }
};

export const createGoogleCalendarUrl = (event: CalendarEvent): string => {
  const formatDateForGoogle = (dateStr: string) => {
    return dateStr.replace(/[-:]/g, '');
  };

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDateForGoogle(event.startDate)}/${formatDateForGoogle(event.endDate)}`,
    location: event.location,
    details: event.description,
    ctz: 'Australia/Sydney' // Set timezone to Sydney
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const createOutlookCalendarUrl = (event: CalendarEvent): string => {
  const params = new URLSearchParams({
    subject: event.title,
    startdt: event.startDate,
    enddt: event.endDate,
    location: event.location,
    body: event.description
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
};

export const createAppleCalendarUrl = (event: CalendarEvent): string => {
  // Apple Calendar uses webcal protocol with ics format
  // For simplicity, we'll use Google Calendar which is widely supported
  return createGoogleCalendarUrl(event);
};

export const createICSFile = (event: CalendarEvent): string => {
  const formatDateForICS = (dateStr: string) => {
    // Convert to UTC for ICS format - Sydney is UTC+11 in February
    const date = new Date(dateStr + '+11:00'); // Add Sydney timezone
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Joel & Stephanie Wedding//Wedding Calendar//EN',
    'BEGIN:VEVENT',
    `DTSTART:${formatDateForICS(event.startDate)}`,
    `DTEND:${formatDateForICS(event.endDate)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    `UID:${Date.now()}@joelstephwedding.com`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
};

export const addToCalendar = (eventType: 'ceremony' | 'reception') => {
  console.log('addToCalendar called with:', eventType); // Debug log
  const event = generateCalendarEvent(eventType);

  // Detect user agent to provide best experience
  const userAgent = navigator.userAgent.toLowerCase();
  console.log('User agent:', userAgent); // Debug log

  if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('mac')) {
    // iOS/Mac users - try ICS file first, fallback to Google
    const icsUrl = createICSFile(event);
    const link = document.createElement('a');
    link.href = icsUrl;
    link.download = `joel-stephanie-wedding-${eventType}.ics`;
    link.click();
  } else if (userAgent.includes('android')) {
    // Android users - Google Calendar
    window.open(createGoogleCalendarUrl(event), '_blank');
  } else {
    // Desktop - offer choice via Google Calendar (most universal)
    window.open(createGoogleCalendarUrl(event), '_blank');
  }
};