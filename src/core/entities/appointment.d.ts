export type IAppointment = {
  storeId: string;
  name: string;
  email: string;
  comment: string;
  phone: string;
  appointmentDate: Date;
  formId?: string;
  employeeId: string;
  serviceId: string;
  employee: {
    name: string;
    nickname: string;
    email: string;
    pin: string;
    cloverId?: string;
  };
  service: {
    name: string;
    description: string;
    price: number;
    cloverId?: string;
  };
};
