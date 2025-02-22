import { useDirectus } from "./useDirectus";
import {
  DirectusItemRequest,
  DirectusItemCreation,
  DirectusItemDeletion,
  DirectusItemUpdate,
} from "../types";

export const useDirectusItems = () => {
  const directus = useDirectus();

  const getItems = async <T>(data: DirectusItemRequest): Promise<T[]> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    const items = await directus<{data: T[]}>(`/items/${data.collection}`, {
      method: "GET",
      params: data.params,
    });
    return items.data;
  };
  
  const getSingletonItem = async <T>(data: DirectusItemRequest): Promise<T> => {
    if (data.params?.filter) {
      (data.params.filter as unknown) = JSON.stringify(data.params.filter);
    }
    const items = await directus<{data: T}>(`/items/${data.collection}`, {
      method: "GET",
      params: data.params,
    });
    return items.data;
  };
  
  const getItemById = async <T>(data: DirectusItemRequest): Promise<T[]> => {
    const items = await directus<{data: T[]}>(`/items/${data.collection}/${data.id}`, {
      method: "GET",
    });
    return items.data;
  };

  const createItems = async <T>(data: DirectusItemCreation): Promise<T[]> => {
    const items = await directus<{data: T[]}>(`/items/${data.collection}`, {
      method: "POST",
      body: data.items,
    });
    return items.data;
  };

  const deleteItems = async (data: DirectusItemDeletion): Promise<void> => {
    await directus<void>(`/items/${data.collection}`, {
      method: "DELETE",
      body: data.items,
    });
  };

  const updateItem = async <T>(data: DirectusItemUpdate): Promise<T> => {
    const item = await directus<{data: T}>(`/items/${data.collection}/${data.id}`, {
      method: "PATCH",
      body: data.item,
    });
    return item.data;
  };

  return { getItems, getSingletonItem, getItemById, createItems, deleteItems, updateItem };
};
