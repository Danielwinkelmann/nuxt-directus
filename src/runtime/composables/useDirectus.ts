import type { FetchError, FetchOptions } from "ohmyfetch";
import { useNuxtApp } from "#app";
import { useDirectusUrl } from "./useDirectusUrl";
import { useDirectusToken } from "./useDirectusToken";

export const useDirectus = () => {
  const nuxt = useNuxtApp();
  const baseURL = useDirectusUrl();
  const { token } = useDirectusToken();

  return async <T>(
    url: string,
    fetchOptions: FetchOptions = {}
  ): Promise<T> => {
    const headers: HeadersInit = {};
    const accessToken = await token()
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    try {
      return await $fetch<T>(url, {
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers,
        },
      });
    } catch (err: any) {
      //   nuxt.hooks.callHook("directus:error" as any, e);
      throw err;
    }
  };
};
