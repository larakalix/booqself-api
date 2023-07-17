import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TenantService } from 'src/modules/tenant/service/tenant.service';
import { EmployeeService } from 'src/modules/employee/service/employee.service';
import { InventoryService } from 'src/modules/inventory/service/inventory.service';
import { AppointmentService } from 'src/modules/appointment/service/appointment.service';
import { OrderService } from 'src/modules/order/service/order.service';
import { LineItemService } from 'src/modules/lineItem/service/line-item.service';
import { handleError } from 'src/core/helper/endpoint.helper';
import type { IEndpointProps } from 'src/core/dtos/endpoint';
import type { IDatable } from 'src/core/entities/generic';
import type { IBook } from 'src/core/entities/book';
import type { IFormAppointment } from 'src/core/entities/appointment';

@Injectable()
export class BookService {
  constructor(
    private readonly tenantService: TenantService,
    private readonly inventoryService: InventoryService,
    private readonly employeeService: EmployeeService,
    private readonly appointmentService: AppointmentService,
    private readonly orderService: OrderService,
    private readonly lineItemService: LineItemService,
  ) {}

  async getBookBoilerplate(
    { mId, key }: IEndpointProps,
    justTenant?: boolean,
    appointmentId?: string,
  ): Promise<IBook> {
    const tenant = await this.tenantService.getById({ mId, key }, justTenant);
    const services = await this.inventoryService.getAll({ mId, key });
    const employees = await this.employeeService.getAll({ mId, key });
    const appointment = await this.appointmentService.getById({
      appointmentId,
    });

    return {
      tenant,
      employees,
      services,
      appointment,
    };
  }

  async bookAppointment(
    { mId, key }: IEndpointProps,
    { appointment }: { appointment: IFormAppointment },
  ): Promise<IDatable<IFormAppointment>> {
    const url = `${process.env.STRAPI_URL}/custom-appointment/create`;

    try {
      const { data } = await axios.post<IDatable<IFormAppointment>>(url, {
        ...appointment,
      });

      // Create Clover Order
      const order = await this.orderService.create({ mId, key }, appointment);
      if (order.id) {
        const lineItem = await this.lineItemService.create(
          { mId, key, id: order.id },
          appointment,
        );

        console.log('lineItem', lineItem);
      }

      return data as IDatable<IFormAppointment>;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  async updateAppointment(
    { mId, key }: IEndpointProps,
    { appointment }: { appointment: IFormAppointment },
    id: string,
  ): Promise<IDatable<IFormAppointment>> {
    const url = `${process.env.STRAPI_URL}/custom-appointment/update/${id}`;

    try {
      const { data } = await axios.put<IDatable<IFormAppointment>>(url, {
        ...appointment,
        id,
      });

      return data as IDatable<IFormAppointment>;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
