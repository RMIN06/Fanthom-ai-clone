const CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

export async function fetchUpcomingEvents(accessToken) {
  if (!accessToken) throw new Error('Calendar authorization is missing.');

  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 14);
  const params = new URLSearchParams({
    timeMin: now.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '12',
  });

  const response = await fetch(`${CALENDAR_API}?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Google Calendar returned ${response.status}.`);
  }

  const payload = await response.json();
  return (payload.items || []).filter((event) => event.status !== 'cancelled').map((event) => ({
    id: event.id,
    title: event.summary || 'Untitled event',
    start: event.start?.dateTime || event.start?.date || null,
    end: event.end?.dateTime || event.end?.date || null,
    location: event.location || '',
    meetingUrl: event.hangoutLink || findMeetingUrl(event),
    attendees: (event.attendees || []).map((attendee) => attendee.email).filter(Boolean),
    organizer: event.organizer?.email || '',
  }));
}

function findMeetingUrl(event) {
  const text = `${event.description || ''} ${event.location || ''}`;
  return text.match(/https?:\/\/[^\s<>]+/)?.[0] || '';
}

export function formatCalendarDate(value) {
  if (!value) return 'Time not set';
  return new Date(value).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function calendarProviderStatus(session, calendarConnected) {
  if (calendarConnected && session?.provider_token) return 'connected';
  if (calendarConnected) return 'needs_reauth';
  return 'not_connected';
}
