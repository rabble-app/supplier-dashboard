/** @format */

'use server';
import { cookies } from 'next/headers';
import { API_ENDPOINT, setHeaders } from '../../../actions/config';
import { formatDate, formatRelativeTime, padWithZero } from '@/utils';
import { IOrderStatusText } from './interfaces';
import dayjs from 'dayjs';

export const handleGetSubscriptions = async (page: number, query: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const offset = (page - 1) * 7;
  const url = `${API_ENDPOINT}/team/subscriptions${
    !query ? `?offset=${offset}` : `/search/${query}`
  }`;
  console.log(url);
  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();

    if (res.ok) {
      const subscriptions = query ? data.data.slice() : data.data[1];
      data = {
        ...data,
        data: [
          ...(!query ? [data.data[0]] : [subscriptions.length]),
          subscriptions.map((item: any) => {
            const successfulDeliveries = item.orders?.filter(
              (order: any) => order?.status === 'SUCCESSFUL'
            );
            return {
              key: item.id,
              hostName: `${item.host.firstName} ${item.host.lastName}`,
              postcode: item?.postalCode,
              subscriptionValue: item.orders.length
                ? item.orders[item.orders.length - 1].accumulatedAmount
                : 0,
              frequency: formatRelativeTime(item.frequency),
              members: padWithZero(item._count.members),
              activeSince: formatDate(item?.createdAt),
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
    console.log(errorObject);
    return errorObject;
  }
};

export const handleGetOrders = async (
  page: number,
  tab: string,
  query: string
) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  const offset = (page - 1) * 7;
  let url = `${API_ENDPOINT}/team/orders${
    !query ? `?offset=${offset}` : `/search/${query}`
  }`;

  let status: IOrderStatusText = IOrderStatusText.DEFAULT;

  if (tab === 'subscriptions') status = IOrderStatusText.DEFAULT;
  else if (tab === 'pending-orders') status = IOrderStatusText.PENDING;
  else if (tab === 'pending-delivery')
    status = IOrderStatusText.PENDING_DELIVERY;
  else if (tab === 'successful') status = IOrderStatusText.SUCCESSFUL;
  else if (tab === 'failed') status = IOrderStatusText.FAILED;

  if (![IOrderStatusText.DEFAULT].includes(status)) {
    url += `${query ? '?' : '&'}status=${status}`;
  }

  console.log(url);
  try {
    let res = await fetch(url, {
      headers: setHeaders(token),
    });

    let data = await res.json();
    if (res.ok) {
      const orders = query ? data.data.slice() : data.data[1];
      data = {
        ...data,
        data: [
          ...(!query ? [data.data[0]] : [orders.length]),
          orders.map((item: any) => {
            const orderItem = item.team;
            const address = orderItem.host.shipping;
            const categories = orderItem.producer.categories;
            return {
              key: item.id,
              orderId: `ORD-${item.id.split('-')[0]}`,
              hostName: `${orderItem.host.firstName} ${orderItem.host.lastName}`,
              producerName: orderItem.producer.businessName,
              postcode: orderItem.postalCode,
              address: `${address.buildingNo} ${address.address} ${address.city}`,
              category: categories?.[0].category.name,
              orderValue: item?.accumulatedAmount,
              expectedDelivery: item.deliveryDate
                ? formatDate(item.deliveryDate)
                : null,
              orderStatus: item.status,
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
    console.log(errorObject);
    return errorObject;
  }
};

export const handleGetOrderInfo = async (id: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  try {
    let res = await fetch(`${API_ENDPOINT}/team/orders/${id}`, {
      headers: setHeaders(token),
    });

    let data = await res.json();

    if (res.ok) {
      const items = data.data;
      const host = items?.team.host;
      const hostName = `${host.firstName} ${host.lastName}`;
      const hostShipping = host.shipping;
      const hostPostalCode = host.postalCode;
      const hostAddress = hostShipping
        ? `${hostShipping.buildingNo} ${hostShipping.address}, ${hostShipping.city}, ${hostPostalCode}`
        : null;
      const producer = items?.team.producer;
      const producerShipping = producer.user.shipping;
      const producerPostalCode = producer.user.postalCode;
      const producerVat = producer.vat;
      const producerPaymentTerm = producer.paymentTerm;
      const producerPaymentDue = formatDate(
        dayjs(items.deadline.split('T')[0]).add(30, 'day').toString(),
        'DD/MM/YYYY'
      );
      const producerAddress = producerShipping
        ? `${producerShipping.buildingNo} ${producerShipping.address}, ${producerShipping.city}, ${producerPostalCode}`
        : null;
      data = {
        ...data,
        data: {
          key: items?.id.split('-')[0],
          createdAt: formatDate(items?.createdAt, 'DD/MM/YYYY'),
          status: items?.status,
          deadline: formatDate(items.deadline),
          deliveryDate:
            items.deliveryDate && formatDate(items.deliveryDate, 'DD/MM/YYYY'),
          producerName: items?.team.producer.businessName,
          producerAddress,
          producerVat,
          producerPaymentTerm,
          producerPaymentDue,
          hostName,
          hostAddress,
          totalPrice: items?.accumulatedAmount,
          basket: items?.basket.length
            ? items.basket.map((item: any) => {
                return {
                  key: item.product.id,
                  skuCode: item.product.id.split('-')[0],
                  productName: item.product.name,
                  measure: `${item.product.quantityOfSubUnitPerOrder} x ${
                    item.product.measuresPerSubUnit
                  }${item.product.unitsOfMeasurePerSubUnit.toUpperCase()}`,
                  unitCost: item.price,
                  quantity: item.quantity,
                  totalExVat: item.price * item.quantity,
                  totalIncVat:
                    item.price * item.quantity + item.product.vat || 0,
                  vat: item.product.vat || 0,
                };
              })
            : [],
        },
      };
    } else {
      throw new Error(JSON.stringify(data));
    }

    return data;
  } catch (error: any) {
    const errorObject = JSON.parse(error.message);
    console.log(errorObject);
    return errorObject;
  }
};
