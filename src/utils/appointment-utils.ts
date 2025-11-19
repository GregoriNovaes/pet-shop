import { Appointment as AppointmentPrisma } from '@/generated/prisma';
import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointment';

export const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
};

export function groupAppointmentByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments.map((apt) => ({
    ...apt,
    time: formatDateTime(apt.scheduleAt),
    service: apt.description,
    period: getPeriod(parseInt(formatDateTime(apt.scheduleAt))),
  }));

  const morningAppointment = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppointment = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppointment = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointment,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointment,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointment,
    },
  ];
}

export function formatDateTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  });
}
