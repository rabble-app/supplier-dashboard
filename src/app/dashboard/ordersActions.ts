/** @format */

'use server';
import { cookies } from 'next/headers';
import { API_ENDPOINT, setHeaders } from '../../actions/config';
import { formatDate, formatRelativeTime, padWithZero } from '@/utils';

const cookieStore = cookies();
const token = cookieStore.get('token')?.value;

export const handleGetSubscriptions = async (page: number) => {
  const offset = (page - 1) * 7;
  try {
    let res = await fetch(
      `${API_ENDPOINT}/team/subscriptions?offset=${offset}`,
      {
        headers: setHeaders(token),
      }
    );

    let data = await res.json();

    if (res.ok) {
      data = {
        ...data,
        data: [
          data.data[0],
          data.data[1].map((item: any) => {
            const successfulDeliveries = item.orders?.filter(
              (order: any) => order.status === 'SUCCESSFUL'
            );
            return {
              key: item.id,
              hostName: `${item.host.firstName} ${item.host.lastName}`,
              postcode: item.postalCode,
              subscriptionValue:
                item.orders[item.orders.length - 1].accumulatedAmount,
              frequency: formatRelativeTime(item.frequency),
              members: padWithZero(item._count.members),
              activeSince: formatDate(item.createdAt),
              successfulDeliveries: padWithZero(successfulDeliveries?.length),
              nextDelivery:
                item.nextDeliveryDate && formatDate(item.nextDeliveryDate),
            };
          }),
        ],
      };
    } else {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    return errorObject;
  }
};
